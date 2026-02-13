import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

export interface CounterConfig extends FeatureConfig {
  start?: number;
}

/**
 * CounterFeature
 * Demonstrates a feature with state, methods, and events.
 */
export class CounterFeature extends LitFeature<CounterConfig> {
  declare count: number;

  static override properties: FeatureProperties = {
    count: { type: Number, attribute: 'count', reflect: true }
  };

  constructor(host: LitCore, config: CounterConfig) {
    super(host, config);
    this.count = config.start ?? 0;
  }

  increment(): void {
    this.count++;
    this.host.dispatchEvent(
      new CustomEvent('counter-incremented', { 
        detail: { count: this.count } 
      })
    );
  }

  decrement(): void {
    this.count--;
    this.host.dispatchEvent(
      new CustomEvent('counter-decremented', { 
        detail: { count: this.count } 
      })
    );
  }
}
