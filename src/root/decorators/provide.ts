import type { FeatureConfig, FeatureDefinition } from '../types/feature-types.js';
import { FEATURE_META, type FeatureMetaEntry } from './feature-meta.js';

/**
 * Type for the feature definition value passed to @provide decorator
 */
export type ProvideDefinition<TConfig extends FeatureConfig = FeatureConfig> = FeatureDefinition<TConfig>;

/**
 * Class decorator that registers a feature in the provides registry.
 * 
 * @param featureName - The name the feature will be attached as on the component instance
 * @param definition - The feature class and optional configuration
 * 
 * @example
 * ```typescript
 * @provide('Layout', { class: LayoutFeature, config: { layout: 'condensed' } })
 * @provide('Counter', { class: CounterFeature })
 * class MyComponent extends LitCore {
 *   // this.Layout and this.Counter will be available at runtime
 * }
 * ```
 */
export function provide<TConfig extends FeatureConfig = FeatureConfig>(
  featureName: string,
  definition: FeatureDefinition<TConfig>
) {
  return function <T extends { new (...args: unknown[]): object }>(constructor: T): T {
    const decorated = constructor as unknown as Record<symbol, FeatureMetaEntry[]>;

    if (!Object.prototype.hasOwnProperty.call(constructor, FEATURE_META)) {
      decorated[FEATURE_META] = [];
    }

    decorated[FEATURE_META].push({
      kind: 'provide',
      name: featureName,
      definition: definition as unknown as FeatureDefinition
    });

    // console.log(`[@provide] Registered feature "${featureName}" on ${constructor.name}:`, definition);

    return constructor;
  };
}
