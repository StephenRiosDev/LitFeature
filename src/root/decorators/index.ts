/**
 * Decorators for the LitFeature system
 */
export { provide, getDecoratorProvides, getInheritedDecoratorProvides, PROVIDES_REGISTRY } from './provide.js';
export type { ProvideDefinition, ProvidesDecorated } from './provide.js';

export { configure, getDecoratorConfigurations, getInheritedDecoratorConfigurations, CONFIGURE_REGISTRY } from './configure.js';
export type { ConfigureOptions, ConfigureDecorated } from './configure.js';
