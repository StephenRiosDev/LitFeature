import merge from 'lodash.merge';
import type { PropertyDeclaration } from 'lit';
import type {
  FeatureConfigEntry,
  FeatureDefinition,
  FeatureMeta,
  ResolvedFeatures,
  LitCoreConstructor,
  FeatureConfig
} from './types/feature-types.js';
import type { LitFeature } from './lit-feature.js';
import { LIT_CORE_MARKER } from './lit-core.js';
import { FEATURE_META } from './decorators/feature-meta.js';
import { getFeaturePropertyMetadata } from './decorators/feature-property.js';

// ============================================================================
// Pure Function Module: Feature Resolution
// ============================================================================
// This module contains a single exported function that takes a constructor
// and returns the fully resolved feature state. All inheritance logic lives here.
// ============================================================================

const RESOLVED_CACHE = Symbol('litFeatureResolvedCache');

// ----------------------------------------------------------------------------
// Private Helpers
// ----------------------------------------------------------------------------

/**
 * Get the full inheritance chain from LitCore up to the given constructor.
 * Stops when it encounters a class without the LIT_CORE_MARKER.
 */
function getInheritanceChain(ctor: LitCoreConstructor): LitCoreConstructor[] {
  const chain: LitCoreConstructor[] = [];
  let current: LitCoreConstructor | null = ctor;

  // Walk up the prototype chain until we find a class without the marker
  while (current && (current as any)[LIT_CORE_MARKER]) {
    chain.unshift(current);
    current = Object.getPrototypeOf(current) as LitCoreConstructor | null;
  }

  return chain;
}

/**
 * Merge configuration entries with override semantics
 */
function mergeConfigEntries(
  existing: FeatureConfigEntry | 'disable' | undefined,
  next: FeatureConfigEntry | 'disable'
): FeatureConfigEntry | 'disable' {
  if (next === 'disable') {
    return 'disable';
  }

  if (!existing || existing === 'disable') {
    return { ...next };
  }

  const mergedConfig = merge({}, existing.config || {}, next.config || {});
  const mergedProps: Record<string, PropertyDeclaration | 'disable'> = {
    ...(existing.properties || {})
  };

  Object.entries(next.properties || {}).forEach(([propName, propValue]) => {
    if (propValue === 'disable') {
      delete mergedProps[propName];
    } else {
      mergedProps[propName] = propValue;
    }
  });

  return {
    config: mergedConfig,
    properties: mergedProps
  };
}

// ----------------------------------------------------------------------------
// Main Export: Pure Resolution Function
// ----------------------------------------------------------------------------

/**
 * Resolve all features for a component constructor.
 * 
 * This function:
 * 1. Walks the inheritance chain
 * 2. Collects provides and configs from static getters and decorators
 * 3. Merges configurations with proper override semantics
 * 4. Returns final resolved state ready for instantiation
 * 
 * @param ctor - The component constructor
 * @returns Resolved features with properties and feature definitions
 */
export function resolveFeatures(ctor: LitCoreConstructor): ResolvedFeatures {
  // Check cache first
  if (Object.prototype.hasOwnProperty.call(ctor, RESOLVED_CACHE)) {
    return (ctor as unknown as Record<symbol, ResolvedFeatures>)[RESOLVED_CACHE];
  }

  // Collect provides and configs from inheritance chain
  const provides = new Map<string, FeatureDefinition>();
  const configs = new Map<string, FeatureConfigEntry | 'disable'>();

  const chain = getInheritanceChain(ctor);

  chain.forEach(current => {
    // Collect from static getters (provide)
    const staticProvides = current.provide || {};
    Object.entries(staticProvides).forEach(([name, definition]) => {
      provides.set(name, definition);
    });

    // Collect from static getters (configure)
    const staticConfigs = current.configure || {};
    Object.entries(staticConfigs).forEach(([name, config]) => {
      const nextConfig = config as FeatureConfigEntry | 'disable';
      const merged = mergeConfigEntries(configs.get(name), nextConfig);
      configs.set(name, merged);
    });

    // Collect from decorators using unified FEATURE_META
    const meta = (current as unknown as Record<symbol, FeatureMeta>)[FEATURE_META];
    if (meta) {
      // Process provides from decorator metadata
      if (meta.provide) {
        meta.provide.forEach((definition, name) => {
          provides.set(name, definition);
        });
      }

      // Process configs from decorator metadata
      if (meta.configure) {
        meta.configure.forEach((config, name) => {
          const merged = mergeConfigEntries(configs.get(name), config);
          configs.set(name, merged);
        });
      }
    }
  });

  // Build final resolved state
  const resolvedProperties: Record<string, PropertyDeclaration> = {};
  const resolvedFeatures = new Map<string, { class: typeof LitFeature; config: FeatureConfig }>();

  provides.forEach((definition, name) => {
    const featureConfig = configs.get(name);

    // Skip if disabled
    if (featureConfig === 'disable' || definition.enabled === false) {
      return;
    }

    // Merge feature properties
    let mergedProperties: Record<string, PropertyDeclaration> = {
      ...(definition.class.properties || {})
    };

    // Include decorator properties
    const decoratorMeta = getFeaturePropertyMetadata(definition.class);
    console.log(`[resolveFeatures] Decorator metadata for feature "${name}" on ${ctor.name}:`, decoratorMeta);
    Object.assign(mergedProperties, decoratorMeta || {});

    // Apply property overrides from config
    if (featureConfig && typeof featureConfig === 'object' && featureConfig.properties) {
      Object.entries(featureConfig.properties).forEach(([propName, propValue]) => {
        if (propValue === 'disable') {
          delete mergedProperties[propName];
        } else {
          mergedProperties[propName] = propValue;
        }
      });
    }

    console.log(`[resolveFeatures] Merged properties for feature "${name}" on ${ctor.name}:`, mergedProperties);

    // Add to resolved properties
    Object.assign(resolvedProperties, mergedProperties);

    // Compute final config
    const finalConfig = featureConfig && typeof featureConfig === 'object'
      ? merge({}, definition.config || {}, featureConfig.config || {})
      : (definition.config || {});

    // Add to resolved features
    resolvedFeatures.set(name, {
      class: definition.class as typeof LitFeature,
      config: finalConfig
    });
  });

  const resolved: ResolvedFeatures = {
    properties: Object.freeze(resolvedProperties),
    features: resolvedFeatures
  };

  Object.freeze(resolved);

  // Cache and return
  (ctor as unknown as Record<symbol, ResolvedFeatures>)[RESOLVED_CACHE] = resolved;

  return resolved;
}
