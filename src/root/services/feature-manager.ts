import merge from 'lodash.merge';
import type { LitFeature } from '../lit-feature.js';
import type { LitCore } from '../lit-core.js';
import { resolveFeatureSnapshot } from '../feature-resolver.js';
import type { FeatureConfig } from '../types/feature-types.js';

// Re-export types from feature-types for backward compatibility
export type {
  FeatureClass,
  FeatureDefinition,
  FeatureConfigEntry,
  ProvidesRegistry,
  FeaturesRegistry,
  LitCoreConstructor
} from '../types/feature-types.js';

// Import types for local use
import type { FeatureConfigEntry, ProvidesRegistry, FeaturesRegistry, LitCoreConstructor } from '../types/feature-types.js';

/**
 * Compositional service responsible for managing features and their lifecycle hooks
 * and connecting them to the host component.
 */
export class FeatureManager {
  host: LitCore;
  hostConstructor: LitCoreConstructor;
  private _featureInstances: Map<string, LitFeature>;

  constructor(host: LitCore, constructor: LitCoreConstructor) {
    this.host = host;
    this.hostConstructor = constructor;
    this._featureInstances = new Map();
    this._initializeFeatures();
  }

  /**
   * Collects features (`static get provide`) from the entire inheritance chain.
   * Includes both static provide() definitions and @provide decorated fields.
   */
  static getInheritedProvides(constructor: LitCoreConstructor): ProvidesRegistry {
    return resolveFeatureSnapshot(constructor).provides;
  }

  /**
   * Collects feature configurations (`static get configure`) from the inheritance chain.
   * Includes both static configure() definitions and @configure decorated configurations.
   */
  static getInheritedConfigs(constructor: LitCoreConstructor): FeaturesRegistry {
    return resolveFeatureSnapshot(constructor).configs;
  }

  /**
   * Initialize features and collect their properties.
   * This needs to be called before the element is registered.
   */
  static prepareFeatures(constructor: LitCoreConstructor): void {
    resolveFeatureSnapshot(constructor);
  }



  /**
   * Initialize all features that this component has opted into
   */
  private _initializeFeatures(): void {
    const snapshot = this.hostConstructor._featureSnapshot || resolveFeatureSnapshot(this.hostConstructor);
    if (!snapshot) {
      return;
    }

    const { provides, configs } = snapshot;

    Object.entries(provides).forEach(([featureName, featureDef]) => {
      const featureConfig = configs[featureName];
      if (featureConfig === 'disable') return;

      const { class: FeatureClass, config: defaultConfig = {}, enabled = true } = featureDef;
      if (!enabled) return;

      const finalConfig = featureConfig
        ? merge({}, defaultConfig, (featureConfig as FeatureConfigEntry).config || {})
        : defaultConfig;

      const featureInstance = new FeatureClass(this.host, finalConfig as FeatureConfig);

      this._featureInstances.set(featureName, featureInstance);

      const hostRecord = this.host as unknown as Record<string, unknown>;
      if (hostRecord.hasOwnProperty(featureName)) {
        console.warn(`[Lit Feature] Host already has a property named "${featureName}". This may cause conflicts with the feature instance.
Features should not declare properties with names matching those in the host component. Please rename the feature or host property to avoid this conflict.
Feature will be assigned to _${featureName} to avoid overwriting the host property. It is not recommended to leave this conflict unresolved, as it may lead to unexpected behavior.`);
        hostRecord[`_${featureName}`] = featureInstance;
      } else {
        hostRecord[featureName] = featureInstance;
      }
    });
  }


  /**
   * Process lifecycle method for all registered features
   */
  processLifecycle(methodName: string, ...args: unknown[]): void {
    this._featureInstances.forEach(feature => {
      const method = (feature as unknown as Record<string, ((...args: unknown[]) => void) | undefined>)[methodName];
      if (typeof method === 'function') {
        method.call(feature, ...args);
      }
    });
  }
}
