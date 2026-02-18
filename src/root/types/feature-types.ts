import type { LitCore } from '../lit-core.js';
import type { LitFeature, FeatureConfig, FeatureProperties } from '../lit-feature.js';
import type { PropertyDeclaration } from 'lit';

/**
 * Type for a feature class constructor
 */
export interface FeatureClass<TConfig extends FeatureConfig = FeatureConfig> {
  new (host: LitCore, config: TConfig): LitFeature<TConfig>;
  properties?: FeatureProperties;
}

/**
 * Feature definition as provided in `static get provide()`
 */
export interface FeatureDefinition<TConfig extends FeatureConfig = FeatureConfig> {
  class: FeatureClass<TConfig>;
  config?: TConfig;
  enabled?: boolean;
}

/**
 * Feature configuration as provided in `static get configure()`
 */
export interface FeatureConfigEntry {
  config?: FeatureConfig;
  properties?: Record<string, PropertyDeclaration | 'disable'>;
}

/**
 * Registry of provided features
 */
export interface ProvidesRegistry {
  [featureName: string]: FeatureDefinition;
}

/**
 * Registry of feature configurations
 */
export interface FeaturesRegistry {
  [featureName: string]: FeatureConfigEntry | 'disable';
}

/**
 * Resolved feature instance with final configuration
 */
export interface ResolvedFeature {
  name: string;
  definition: FeatureDefinition;
  config: FeatureConfig;
  properties: Record<string, PropertyDeclaration>;
}

/**
 * Immutable feature snapshot for a specific class
 */
export interface FeatureSnapshot {
  properties: Record<string, PropertyDeclaration>;
  provides: ProvidesRegistry;
  configs: FeaturesRegistry;
}

/**
 * Interface for LitCore constructor with static feature methods
 */
export interface LitCoreConstructor {
  new (): LitCore;
  name: string;
  provide?: ProvidesRegistry;
  configure?: FeaturesRegistry;
  /** @deprecated Use `provide` instead */
  provides?: ProvidesRegistry;
  /** @deprecated Use `configure` instead */
  features?: FeaturesRegistry;
  properties?: Record<string, PropertyDeclaration>;
  _featureSnapshot?: FeatureSnapshot;
  _resolvedProperties?: Record<string, PropertyDeclaration>;
}

// Re-export FeatureConfig for convenience
export type { FeatureConfig } from '../lit-feature.js';
