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
  /** Pulse animation duration in ms */
  pulseDurationMs?: number;
  /** Pulse scale factor */
  pulseScale?: number;
  /** Pulse mid opacity */
  pulseOpacity?: number;
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

  @property({ type: Number, attribute: 'pulse-duration' })
  pulseDurationMs = 2000;

  /**
   * Styles provided by this feature.
   * Automatically merged into host component styles.
   */
  static styles = css`
    /* Pulse effect - applied when host has [pulsing] attribute */
    :host([pulsing]) {
      animation: pulse var(--pulse-duration, 2000ms) ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(var(--pulse-scale, 1.05));
        opacity: var(--pulse-opacity, 0.8);
      }
    }
  `;

  constructor(host: LitCore, config: PulseConfig) {
    super(host, config);
    this.pulsing = config.initiallyPulsing ?? false;
    this.pulseDurationMs = config.pulseDurationMs ?? 2000;
    this._applyPulseOptions(config);
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('pulseDurationMs')) {
      this._applyPulseOptions(this.config);
    }
  }

  /**
   * Toggle pulsing state
   */
  togglePulse(): void {
    this.pulsing = !this.pulsing;
  }

  startPulse(): void {
    this.pulsing = true;
  }

  stopPulse(): void {
    this.pulsing = false;
  }

  setPulseOptions(options: PulseConfig): void {
    this._applyPulseOptions(options);
  }

  private _applyPulseOptions(options: PulseConfig): void {
    const style = (this.host as HTMLElement).style;
    style.setProperty('--pulse-duration', `${this.pulseDurationMs}ms`);

    if (options.pulseScale) {
      style.setProperty('--pulse-scale', `${options.pulseScale}`);
    }

    if (options.pulseOpacity) {
      style.setProperty('--pulse-opacity', `${options.pulseOpacity}`);
    }
  }
}
