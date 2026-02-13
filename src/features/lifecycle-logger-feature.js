import { LitFeature } from "../root/lit-feature.js";

/**
 * LifecycleLoggerFeature
 * Logs lifecycle events for demonstration/documentation.
 */
export class LifecycleLoggerFeature extends LitFeature {
  connectedCallback() {
    console.log(`[LifecycleLoggerFeature] connectedCallback on`, this.host);
  }
  disconnectedCallback() {
    console.log(`[LifecycleLoggerFeature] disconnectedCallback on`, this.host);
  }
  firstUpdated() {
    console.log(`[LifecycleLoggerFeature] firstUpdated on`, this.host);
  }
  updated() {
    console.log(`[LifecycleLoggerFeature] updated on`, this.host);
  }
}