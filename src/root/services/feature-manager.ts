import merge from 'lodash.merge';
import type { LitFeature } from '../lit-feature.js';
import type { LitCore } from '../lit-core.js';
import { resolveFeatures } from '../feature-resolver.js';
import type { FeatureConfig, LitCoreConstructor, ResolvedFeatures } from '../types/feature-types.js';

// Re-export types for backward compatibility (deprecated)
/** @deprecated Import from types/feature-types.js instead */
export type {
  FeatureClass,
  FeatureDefinition,
  FeatureConfigEntry,
  LitCoreConstructor
} from '../types/feature-types.js';

/**
 * Compositional service responsible for managing feature instances and lifecycle.
 * 
 * FeatureManager is an instance-only concern. It:
 * 1. Resolves features using resolveFeatures()
 * 2. Instantiates feature instances
 * 3. Attaches them to the host
 * 4. Dispatches lifecycle methods
 * 
 * All class-level concerns (inheritance, metadata merging) live in the resolver.
 */
export class FeatureManager {
  host: LitCore;
  hostConstructor: LitCoreConstructor;
  private _featureInstances: Map<string, LitFeature>;

  constructor(host: LitCore, constructor: LitCoreConstructor) {
    this.host = host;
    this.hostConstructor = constructor;
    this._featureInstances = new Map();
    
    // Resolve and initialize features
    const resolved = resolveFeatures(constructor);
    this._initializeFeatures(resolved);
  }

  /**
   * Initialize all features from resolved state
   */
  private _initializeFeatures(resolved: ResolvedFeatures): void {
    resolved.features.forEach((feature, featureName) => {
      const featureInstance = new (feature.class as any)(this.host, feature.config);

      this._featureInstances.set(featureName, featureInstance);

      // Attach to host
      const hostRecord = this.host as unknown as Record<string, unknown>;
      if (hostRecord.hasOwnProperty(featureName)) {
        console.warn(
          `[Lit Feature] Host already has a property named "${featureName}". This may cause conflicts with the feature instance.
Features should not declare properties with names matching those in the host component. Please rename the feature or host property to avoid this conflict.
Feature will be assigned to _${featureName} to avoid overwriting the host property. It is not recommended to leave this conflict unresolved, as it may lead to unexpected behavior.`
        );
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
