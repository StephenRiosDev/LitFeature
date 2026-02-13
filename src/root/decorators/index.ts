/**
 * Decorators for the LitFeature system
 */
export { provide, getDecoratorProvides, getInheritedDecoratorProvides, PROVIDES_REGISTRY } from './provide.js';
export type { ProvideDefinition, ProvidesDecorated } from './provide.js';

export { feature, getDecoratorFeatures, getInheritedDecoratorFeatures, FEATURES_REGISTRY } from './feature.js';
export type { FeatureOptions, FeaturesDecorated } from './feature.js';
