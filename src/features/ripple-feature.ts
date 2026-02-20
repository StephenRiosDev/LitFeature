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
      background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
      animation: ripple 0.6s ease-out;
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

  connectedCallback(): void {
    this.host.addEventListener('click', this._handleClick);
  }

  disconnectedCallback(): void {
    this.host.removeEventListener('click', this._handleClick);
  }

  private _handleClick = () => {
    this.rippling = true;
    setTimeout(() => {
      this.rippling = false;
    }, 600);
  };
}
