import merge from 'lodash.merge';
import type { LitFeature, FeatureProperties } from '../lit-feature.js';
import type { LitCore } from '../lit-core.js';
import type { PropertyDeclaration } from 'lit';
import { getInheritedDecoratorProvides, type ProvidesDecorated } from '../decorators/provide.js';
import { getInheritedDecoratorConfigurations, type ConfigureDecorated } from '../decorators/configure.js';
import type { FeatureConfig, FeatureSnapshot } from '../types/feature-types.js';

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
import type {
  FeatureClass,
  FeatureDefinition,
  FeatureConfigEntry,
  ProvidesRegistry,
  FeaturesRegistry,
  LitCoreConstructor
} from '../types/feature-types.js';

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
    const features: ProvidesRegistry = {};
    
    // First, collect decorator-provided features
    const decoratorProvides = getInheritedDecoratorProvides(constructor as unknown as Function & ProvidesDecorated);
    Object.entries(decoratorProvides).forEach(([name, definition]) => {
      features[name] = definition;
    });
    
    // Then collect static provide/provides (these take precedence over decorator provides)
    let current: LitCoreConstructor | null = constructor;
    while (current && current.name !== 'LitElement') {
      const provides = current.provide || current.provides || {};
      
      Object.entries(provides).forEach(([name, definition]) => {
        if (!features[name]) {
          features[name] = definition;
        }
      });
      
      current = Object.getPrototypeOf(current) as LitCoreConstructor | null;
    }

    console.log(features);
    
    return features;
  }

  /**
   * Collects feature configurations (`static get configure`) from the inheritance chain.
   * Includes both static configure() definitions and @configure decorated configurations.
   */
  static getInheritedConfigs(constructor: LitCoreConstructor): FeaturesRegistry {
    const configs: FeaturesRegistry = {};

    // First, collect decorator-configured features
    const decoratorConfigurations = getInheritedDecoratorConfigurations(constructor as unknown as Function & ConfigureDecorated);
    Object.entries(decoratorConfigurations).forEach(([name, config]) => {
      configs[name] = config;
    });

    // Then collect static configure/features (merge with decorator configs)
    let current: LitCoreConstructor | null = constructor;
    while (current && current.name !== 'LitElement') {
      const features = current.configure || current.features || {};

      Object.entries(features).forEach(([name, config]) => {
        if (!configs[name]) {
          configs[name] = config;
        } else if (config === 'disable') {
          configs[name] = 'disable';
        } else if (configs[name] !== 'disable') {
          const existingConfig = configs[name] as FeatureConfigEntry;
          const prevConfig = existingConfig.config || {};
          const nextConfig = (config as FeatureConfigEntry).config || {};
          const prevProps = existingConfig.properties || {};
          const nextProps = (config as FeatureConfigEntry).properties || {};

          // Merge properties, with 'disable' support
          const mergedProps: Record<string, PropertyDeclaration | 'disable'> = { ...prevProps };
          Object.entries(nextProps).forEach(([propName, propValue]) => {
            if (propValue === 'disable') {
              delete mergedProps[propName];
            } else {
              mergedProps[propName] = propValue;
            }
          });

          configs[name] = {
            ...existingConfig,
            config: merge({}, prevConfig, nextConfig),
            properties: mergedProps
          };
        }
      });

      current = Object.getPrototypeOf(current) as LitCoreConstructor | null;
    }

    return configs;
  }

  /**
   * Initialize features and collect their properties.
   * This needs to be called before the element is registered.
   */
  static prepareFeatures(constructor: LitCoreConstructor): void {
    if (constructor._featureSnapshot) {
      return; // already computed for this class
    }

    // Remove the recursive call - finalize() will handle the chain
    const parent = Object.getPrototypeOf(constructor) as LitCoreConstructor | null;

    const parentSnapshot: FeatureSnapshot = parent?._featureSnapshot
      ? {
          properties: { ...parent._featureSnapshot.properties },
          provides: { ...parent._featureSnapshot.provides },
          configs: { ...parent._featureSnapshot.configs }
        }
      : {
          properties: {},
          provides: {},
          configs: {}
        };

    const localProvides = this.getInheritedProvides(constructor);
    const localConfigs = this.getInheritedConfigs(constructor);

    const resolvedProperties = { ...parentSnapshot.properties };

    Object.entries(localProvides).forEach(([featureName, featureDef]) => {
      const featureConfig = localConfigs[featureName];

      if (featureConfig === 'disable') {
        return;
      }

      const { class: FeatureClass, config: defaultConfig = {}, enabled = true } = featureDef;
      if (!enabled) {
        return;
      }

      const finalConfig = !featureConfig
        ? defaultConfig
        : merge({}, defaultConfig, (featureConfig as FeatureConfigEntry).config || {});

      let mergedProperties: Record<string, PropertyDeclaration> = {
        ...(FeatureClass.properties || {})
      };

      if (featureConfig && typeof featureConfig === 'object' && featureConfig.properties) {
        Object.entries(featureConfig.properties).forEach(([propName, propValue]) => {
          if (propValue === 'disable') {
            delete mergedProperties[propName];
          } else {
            mergedProperties[propName] = propValue;
          }
        });
      }

      Object.entries(mergedProperties).forEach(([propName, propConfig]) => {
        resolvedProperties[propName] = propConfig;
      });
    });

    const snapshot: FeatureSnapshot = {
      properties: Object.freeze(resolvedProperties),
      provides: Object.freeze(localProvides),
      configs: Object.freeze(localConfigs)
    };

    Object.freeze(snapshot);

    constructor._featureSnapshot = snapshot;
  }



  /**
   * Initialize all features that this component has opted into
   */
  private _initializeFeatures(): void {
    const snapshot = this.hostConstructor._featureSnapshot;
    if (!snapshot) return;

    const { provides, configs } = snapshot;

    Object.entries(provides).forEach(([featureName, featureDef]) => {
      const featureConfig = configs[featureName];
      if (featureConfig === 'disable') return;

      const { class: FeatureClass, config: defaultConfig = {}, enabled = true } = featureDef;
      if (!enabled) return;

      const finalConfig = !featureConfig
        ? defaultConfig
        : merge({}, defaultConfig, (featureConfig as FeatureConfigEntry).config || {});

      const featureInstance = new FeatureClass(this.host, finalConfig as FeatureConfig);

      this._featureInstances.set(featureName, featureInstance);

      const hostRecord = this.host as Record<string, unknown>;
      hostRecord[featureName] = featureInstance;
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
