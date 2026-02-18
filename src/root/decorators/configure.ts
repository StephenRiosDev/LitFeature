import type { FeatureConfig, FeatureConfigEntry } from '../types/feature-types.js';
import type { PropertyDeclaration } from 'lit';
import { FEATURE_META, type FeatureMetaEntry } from './feature-meta.js';

/**
 * Configuration options for the @configure decorator
 */
export interface ConfigureOptions<TConfig extends FeatureConfig = FeatureConfig> {
  /** Configuration to merge with the feature's default config */
  config?: TConfig;
  /** Property overrides or disables */
  properties?: Record<string, PropertyDeclaration | 'disable'>;
}

/**
 * Class decorator that configures inherited or provided features.
 * 
 * @param featureName - The name of the feature to configure (must match a provided feature)
 * @param options - Configuration options, or 'disable' to disable the feature entirely
 * 
 * @example
 * ```typescript
 * // Configure a feature with custom config and property overrides
 * @configure('Layout', { 
 *   config: { layout: 'emphasized', size: 'lg' },
 *   properties: { onDark: 'disable' }
 * })
 * 
 * // Configure with just config
 * @configure('Counter', { config: { start: 10 } })
 * 
 * // Disable a feature entirely
 * @configure('Focus', 'disable')
 * 
 * export class MyComponent extends LitCore {}
 * ```
 */
export function configure<TConfig extends FeatureConfig = FeatureConfig>(
  featureName: string,
  options: ConfigureOptions<TConfig> | 'disable'
) {
  return function <T extends { new (...args: unknown[]): object }>(constructor: T): T {
    const decorated = constructor as unknown as Record<symbol, FeatureMetaEntry[]>;

    if (!Object.prototype.hasOwnProperty.call(constructor, FEATURE_META)) {
      decorated[FEATURE_META] = [];
    }

    decorated[FEATURE_META].push({
      kind: 'configure',
      name: featureName,
      options: options === 'disable' ? 'disable' : (options as FeatureConfigEntry)
    });

    return constructor;
  };
}
