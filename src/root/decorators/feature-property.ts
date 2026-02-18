import type { PropertyDeclaration } from 'lit';

export const FEATURE_PROPERTIES_META = Symbol('featurePropertiesMeta');

export interface FeaturePropertyMeta {
  [propertyName: string]: PropertyDeclaration;
}

/**
 * Decorator for defining reactive properties on feature classes.
 * Works like Lit's @property but stores metadata for later resolution.
 * 
 * @example
 * ```typescript
 * export class MyFeature extends LitFeature {
 *   @featureProperty({ type: String, reflect: true })
 *   myProp = 'default';
 * }
 * ```
 */
export function property(options: PropertyDeclaration = {}) {
  return function (target: any, propertyKey: string) {
    // For field decorators, target is the prototype
    const ctor = target.constructor;

    // 1. Store metadata for the resolver (used when merging into host properties)
    if (!Object.prototype.hasOwnProperty.call(ctor, FEATURE_PROPERTIES_META)) {
      Object.defineProperty(ctor, FEATURE_PROPERTIES_META, {
        value: {},
        writable: true,
        configurable: true,
        enumerable: false
      });
    }
    (ctor as any)[FEATURE_PROPERTIES_META][propertyKey] = options;
    
    // 2. ALSO add to the feature class's own static properties
    //    This is needed for _litFeatureInit() to create the property proxy
    if (!Object.prototype.hasOwnProperty.call(ctor, 'properties')) {
      Object.defineProperty(ctor, 'properties', {
        value: {},
        writable: true,
        configurable: true,
        enumerable: false
      });
    }
    
    ctor.properties[propertyKey] = options;
    
    console.log(`[featureProperty] Registered "${propertyKey}" on ${ctor.name}:`, options, '\nCtor:', ctor);
  };
}

/**
 * Extract @featureProperty metadata from a feature class
 */
export function getFeaturePropertyMetadata(ctor: any): FeaturePropertyMeta {
  return (ctor as any)[FEATURE_PROPERTIES_META] || {};
}