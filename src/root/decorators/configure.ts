import type { FeatureConfig, FeatureConfigEntry, FeaturesRegistry } from '../types/feature-types.js';
import type { PropertyDeclaration } from 'lit';

/**
 * Symbol used to store decorator-configured features on a class
 */
export const CONFIGURE_REGISTRY = Symbol('configureRegistry');

/**
 * Interface for classes decorated with @configure
 */
export interface ConfigureDecorated {
  [CONFIGURE_REGISTRY]?: FeaturesRegistry;
}

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
    const decorated = constructor as unknown as ConfigureDecorated;
    
    // Ensure we have our own registry (not inherited)
    if (!Object.prototype.hasOwnProperty.call(constructor, CONFIGURE_REGISTRY)) {
      // Copy parent registry if it exists
      const parent = Object.getPrototypeOf(constructor) as ConfigureDecorated;
      decorated[CONFIGURE_REGISTRY] = parent[CONFIGURE_REGISTRY] 
        ? { ...parent[CONFIGURE_REGISTRY] } 
        : {};
    }
    
    if (options === 'disable') {
      decorated[CONFIGURE_REGISTRY]![featureName] = 'disable';
    } else {
      decorated[CONFIGURE_REGISTRY]![featureName] = options as FeatureConfigEntry;
    }
    
    return constructor;
  };
}

/**
 * Gets the decorator-configured features registry from a class
 */
export function getDecoratorConfigurations(constructor: Function): FeaturesRegistry {
  const decorated = constructor as ConfigureDecorated;
  return decorated[CONFIGURE_REGISTRY] || {};
}

/**
 * Collects decorator-configured features from the entire inheritance chain
 */
export function getInheritedDecoratorConfigurations(constructor: Function): FeaturesRegistry {
  const configs: FeaturesRegistry = {};
  
  let current: Function | null = constructor;
  while (current && current.name !== 'LitElement' && current.name !== 'LitCore') {
    const features = getDecoratorConfigurations(current);
    
    // Child class configurations take precedence (don't override if already set)
    Object.entries(features).forEach(([name, config]) => {
      if (!configs[name]) {
        configs[name] = config;
      }
    });
    
    current = Object.getPrototypeOf(current) as Function | null;
  }
  
  return configs;
}
