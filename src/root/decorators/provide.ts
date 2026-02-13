import type { FeatureConfig, FeatureDefinition, ProvidesRegistry } from '../types/feature-types.js';

/**
 * Symbol used to store decorator-provided features on a class
 */
export const PROVIDES_REGISTRY = Symbol('providesRegistry');

/**
 * Interface for classes decorated with @provide
 */
export interface ProvidesDecorated {
  [PROVIDES_REGISTRY]?: ProvidesRegistry;
}

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
    const decorated = constructor as unknown as ProvidesDecorated;
    
    // Ensure we have our own registry (not inherited)
    if (!Object.prototype.hasOwnProperty.call(constructor, PROVIDES_REGISTRY)) {
      // Copy parent registry if it exists
      const parent = Object.getPrototypeOf(constructor) as ProvidesDecorated;
      decorated[PROVIDES_REGISTRY] = parent[PROVIDES_REGISTRY] 
        ? { ...parent[PROVIDES_REGISTRY] } 
        : {};
    }
    
    decorated[PROVIDES_REGISTRY]![featureName] = definition as unknown as FeatureDefinition;
    
    return constructor;
  };
}

/**
 * Gets the decorator-provided features registry from a class
 */
export function getDecoratorProvides(constructor: Function): ProvidesRegistry {
  const decorated = constructor as ProvidesDecorated;
  return decorated[PROVIDES_REGISTRY] || {};
}

/**
 * Collects decorator-provided features from the entire inheritance chain
 */
export function getInheritedDecoratorProvides(constructor: Function): ProvidesRegistry {
  const features: ProvidesRegistry = {};
  
  let current: Function | null = constructor;
  while (current && current.name !== 'LitElement' && current.name !== 'LitCore') {
    const provides = getDecoratorProvides(current);
    
    // Child class features take precedence (don't override if already set)
    Object.entries(provides).forEach(([name, definition]) => {
      if (!features[name]) {
        features[name] = definition;
      }
    });
    
    current = Object.getPrototypeOf(current) as Function | null;
  }
  
  return features;
}
