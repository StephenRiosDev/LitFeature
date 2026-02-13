import { LitFeature } from "../root/lit-feature.js";

/**
 * CounterFeature
 * Demonstrates a feature with state, methods, and events.
 */
export class CounterFeature extends LitFeature {
  static get properties() {
    return {
      count: { type: Number, attribute: "count", reflect: true }
    }
  }

  constructor(host, config) {
    super(host, config);
    this.count = config.start || 0;
  }

  increment() {
    this.count++;
    this.host.dispatchEvent(new CustomEvent("counter-incremented", { detail: { count: this.count } }));
  }

  decrement() {
    this.count--;
    this.host.dispatchEvent(new CustomEvent("counter-decremented", { detail: { count: this.count } }));
  }
}