import type { FeatureConfigEntry, FeatureDefinition } from '../types/feature-types.js';

export const FEATURE_META = Symbol('litFeatureMeta');

export type FeatureMetaEntry =
  | {
      kind: 'provide';
      name: string;
      definition: FeatureDefinition;
    }
  | {
      kind: 'configure';
      name: string;
      options: FeatureConfigEntry | 'disable';
    };
