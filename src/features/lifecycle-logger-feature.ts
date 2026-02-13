import { LitFeature, FeatureConfig } from '../root/lit-feature.js';

/**
 * LifecycleLoggerFeature
 * Logs lifecycle events for demonstration/documentation.
 */
export class LifecycleLoggerFeature extends LitFeature<FeatureConfig> {
  override connectedCallback(): void {
    console.log(`[LifecycleLoggerFeature] connectedCallback on`, this.host);
  }

  override disconnectedCallback(): void {
    console.log(`[LifecycleLoggerFeature] disconnectedCallback on`, this.host);
  }

  override firstUpdated(): void {
    console.log(`[LifecycleLoggerFeature] firstUpdated on`, this.host);
  }

  override updated(): void {
    console.log(`[LifecycleLoggerFeature] updated on`, this.host);
  }
}
