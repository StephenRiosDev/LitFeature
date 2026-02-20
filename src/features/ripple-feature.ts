import { css } from 'lit';
import { LitFeature, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';
import { property } from '../root/decorators/feature-property.js';

/**
 * Configuration for RippleFeature
 */
export interface RippleConfig extends FeatureConfig {
  /** Color of the ripple effect */
  rippleColor?: string;
  /** Duration of the ripple animation in ms */
  rippleDurationMs?: number;
}

/**
 * RippleFeature - Tier 1 Example
 * 
 * Adds a material-design ripple effect on click.
 * Ultra-minimal feature demonstrating "write once, use everywhere."
 */
export class RippleFeature extends LitFeature<RippleConfig> {
  @property({ type: Boolean, reflect: true })
  rippling = false;

  @property({ type: Number, attribute: 'ripple-duration' })
  rippleDurationMs = 600;

  /**
   * Styles provided by this feature.
   * Automatically merged into host component styles.
   */
  static styles = css`
    /* Ripple effect - applied when host has [rippling] attribute */
    :host([rippling])::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, var(--ripple-color, rgba(255, 255, 255, 0.6)) 0%, transparent 70%);
      animation: ripple var(--ripple-duration, 600ms) ease-out;
      pointer-events: none;
    }

    @keyframes ripple {
      from {
        opacity: 1;
        transform: scale(0);
      }
      to {
        opacity: 0;
        transform: scale(2);
      }
    }
  `;

  constructor(host: LitCore, config: RippleConfig) {
    super(host, config);
    this.rippleDurationMs = config.rippleDurationMs ?? 600;
    this._applyRippleOptions();
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('rippleDurationMs')) {
      this._applyRippleOptions();
    }
  }

  connectedCallback(): void {
    this.host.addEventListener('click', this._handleClick);
  }

  disconnectedCallback(): void {
    this.host.removeEventListener('click', this._handleClick);
  }

  triggerRipple(): void {
    this.rippling = true;
    setTimeout(() => {
      this.rippling = false;
    }, this.rippleDurationMs);
  }

  setRippleColor(color: string): void {
    (this.host as HTMLElement).style.setProperty('--ripple-color', color);
  }

  private _handleClick = () => {
    this.triggerRipple();
  };

  private _applyRippleOptions(): void {
    (this.host as HTMLElement).style.setProperty(
      '--ripple-duration',
      `${this.rippleDurationMs}ms`
    );

    if (this.config.rippleColor) {
      this.setRippleColor(this.config.rippleColor);
    }
  }
}
