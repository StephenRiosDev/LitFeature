import merge from 'lodash.merge';
import type { PropertyDeclaration } from 'lit';
import type {
  FeatureConfigEntry,
  FeatureSnapshot,
  FeaturesRegistry,
  ProvidesRegistry,
  LitCoreConstructor
} from './types/feature-types.js';
import { FEATURE_META, type FeatureMetaEntry } from './decorators/feature-meta.js';
import { getFeaturePropertyMetadata } from './decorators/feature-property.js';

const RESOLVED_SNAPSHOT = Symbol('litFeatureResolvedSnapshot');

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

function getInheritanceChain(ctor: LitCoreConstructor): LitCoreConstructor[] {
  const chain: LitCoreConstructor[] = [];
  let current: LitCoreConstructor | null = ctor;

  while (current && current.name !== 'LitElement') {
    chain.unshift(current);
    current = Object.getPrototypeOf(current) as LitCoreConstructor | null;
  }

  return chain;
}

export function resolveFeatureSnapshot(ctor: LitCoreConstructor): FeatureSnapshot {
  if (Object.prototype.hasOwnProperty.call(ctor, RESOLVED_SNAPSHOT)) {
    return (ctor as unknown as Record<symbol, FeatureSnapshot>)[RESOLVED_SNAPSHOT];
  }

  const provides = new Map<string, ProvidesRegistry[string]>();
  const configs = new Map<string, FeaturesRegistry[string]>();

  const chain = getInheritanceChain(ctor);

  chain.forEach(current => {
    const staticProvides = current.provide || current.provides || {};
    Object.entries(staticProvides).forEach(([name, definition]) => {
      provides.set(name, definition);
    });

    const staticConfigs = current.configure || current.features || {};
    Object.entries(staticConfigs).forEach(([name, config]) => {
      const nextConfig = config as FeatureConfigEntry | 'disable';
      const merged = mergeConfigEntries(configs.get(name) as FeatureConfigEntry | 'disable' | undefined, nextConfig);
      configs.set(name, merged);
    });

    const metaEntries = (current as unknown as Record<symbol, FeatureMetaEntry[]>)[FEATURE_META] || [];
    metaEntries.forEach(entry => {
      if (entry.kind === 'provide') {
        provides.set(entry.name, entry.definition);
        return;
      }

      const merged = mergeConfigEntries(
        configs.get(entry.name) as FeatureConfigEntry | 'disable' | undefined,
        entry.options
      );
      configs.set(entry.name, merged);
    });
  });

  const resolvedProperties: Record<string, PropertyDeclaration> = {};

  provides.forEach((definition, name) => {
    const featureConfig = configs.get(name);
    if (featureConfig === 'disable') {
      return;
    }

    if (definition.enabled === false) {
      return;
    }

    let mergedProperties: Record<string, PropertyDeclaration> = {
      ...(definition.class.properties || {})
    };

    const decoratorMeta = getFeaturePropertyMetadata(definition.class);
    console.log(`[FeatureResolver] Decorator metadata for feature "${name}" on ${ctor.name}:`, decoratorMeta);
    Object.assign(mergedProperties, decoratorMeta || {});

    if (featureConfig && typeof featureConfig === 'object' && featureConfig.properties) {
      Object.entries(featureConfig.properties).forEach(([propName, propValue]) => {
        if (propValue === 'disable') {
          delete mergedProperties[propName];
        } else {
          mergedProperties[propName] = propValue;
        }
      });
    }

    console.log(`[FeatureResolver] Merged properties for feature "${name}" on ${ctor.name}:`, mergedProperties);

    Object.assign(resolvedProperties, mergedProperties);
  });

  const providesObject: ProvidesRegistry = {};
  provides.forEach((definition, name) => {
    providesObject[name] = definition;
  });

  const configsObject: FeaturesRegistry = {};
  configs.forEach((config, name) => {
    configsObject[name] = config;
  });

  const snapshot: FeatureSnapshot = {
    properties: Object.freeze(resolvedProperties),
    provides: Object.freeze(providesObject),
    configs: Object.freeze(configsObject)
  };

  Object.freeze(snapshot);

  (ctor as unknown as Record<symbol, FeatureSnapshot>)[RESOLVED_SNAPSHOT] = snapshot;
  ctor._featureSnapshot = snapshot;

  return snapshot;
}
