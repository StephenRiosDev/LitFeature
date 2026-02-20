import { css } from 'lit';
import { LitFeature, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';
import { property } from '../root/decorators/feature-property.js';

/**
 * Configuration for PulseFeature
 */
export interface PulseConfig extends FeatureConfig {
  /** Initial pulsing state */
  initiallyPulsing?: boolean;
}

/**
 * PulseFeature - Tier 1 Example
 * 
 * Adds a pulsing animation effect.
 * Ultra-minimal feature with CSS animation control.
 */
export class PulseFeature extends LitFeature<PulseConfig> {
  @property({ type: Boolean, reflect: true })
  pulsing: boolean;

  /**
   * Styles provided by this feature.
   * Automatically merged into host component styles.
   */
  static styles = css`
    /* Pulse effect - applied when host has [pulsing] attribute */
    :host([pulsing]) {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.8;
      }
    }
  `;

  constructor(host: LitCore, config: PulseConfig) {
    super(host, config);
    this.pulsing = config.initiallyPulsing ?? false;
  }

  /**
   * Toggle pulsing state
   */
  togglePulse(): void {
    this.pulsing = !this.pulsing;
  }
}
