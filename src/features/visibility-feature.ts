import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

/**
 * Configuration for the VisibilityFeature
 */
export interface VisibilityConfig extends FeatureConfig {
  /** Start visible or hidden */
  initiallyVisible?: boolean;
  /** Transition duration in milliseconds */
  transitionDuration?: number;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * VisibilityFeature
 * 
 * Manages show/hide state with optional transition effects.
 * Demonstrates methods that mutate state and trigger re-renders.
 * 
 * Features demonstrated:
 * - Boolean reactive property with reflection
 * - Public API methods (show, hide, toggle)
 * - Config callbacks
 * - Lifecycle hooks (afterFirstUpdated)
 */
export class VisibilityFeature extends LitFeature<VisibilityConfig> {
  declare visible: boolean;
  declare transitioning: boolean;

  private _transitionDuration: number;
  private _onVisibilityChange?: (visible: boolean) => void;

  static properties: FeatureProperties = {
    visible: {
      type: Boolean,
      attribute: 'visible',
      reflect: true
    },
    transitioning: {
      type: Boolean,
      attribute: false
    }
  };

  constructor(host: LitCore, config: VisibilityConfig) {
    super(host, config);
    this.visible = config.initiallyVisible ?? true;
    this.transitioning = false;
    this._transitionDuration = config.transitionDuration ?? 300;
    this._onVisibilityChange = config.onVisibilityChange;
  }

  /**
   * Show the component with optional animation
   */
  show(): void {
    if (this.visible) return;
    
    this.transitioning = true;
    this.visible = true;
    this._notifyVisibilityChange();
    
    setTimeout(() => {
      this.transitioning = false;
    }, this._transitionDuration);
  }

  /**
   * Hide the component with optional animation
   */
  hide(): void {
    if (!this.visible) return;
    
    this.transitioning = true;
    
    setTimeout(() => {
      this.visible = false;
      this.transitioning = false;
      this._notifyVisibilityChange();
    }, this._transitionDuration);
  }

  /**
   * Toggle visibility state
   */
  toggle(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Get inline styles for transition effects
   */
  getTransitionStyles(): string {
    return `
      transition: opacity ${this._transitionDuration}ms ease-in-out;
      opacity: ${this.visible && !this.transitioning ? '1' : '0'};
    `;
  }

  private _notifyVisibilityChange(): void {
    this._onVisibilityChange?.(this.visible);
    this.host.dispatchEvent(
      new CustomEvent('visibility-changed', {
        detail: { visible: this.visible },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Lifecycle: Log initial visibility state after first render
   */
  afterFirstUpdated(): void {
    console.log(`[VisibilityFeature] Initial state: ${this.visible ? 'visible' : 'hidden'}`);
  }

  /**
   * Lifecycle: Cleanup on disconnect
   */
  disconnectedCallback(): void {
    console.log('[VisibilityFeature] Disconnected, cleaning up transitions');
    this.transitioning = false;
  }
}
