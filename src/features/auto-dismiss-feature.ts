import { BaseDismissFeature, BaseDismissConfig } from './base-dismiss-feature.js';
import type { LitCore } from '../root/lit-core.js';
import { property } from '../root/decorators/feature-property.js';

/**
 * Configuration for AutoDismissFeature
 */
export interface AutoDismissConfig extends BaseDismissConfig {
  /** Auto-dismiss timeout in milliseconds */
  autoDismissTimeout?: number;
  /** Whether to enable auto-dismiss */
  autoDismiss?: boolean;
}

/**
 * AutoDismissFeature - Tier 3 Example (Extended)
 * 
 * Extends BaseDismissFeature with automatic dismissal after a timeout.
 * Demonstrates feature inheritance and override.
 */
export class AutoDismissFeature extends BaseDismissFeature {
  @property({ type: Boolean, attribute: 'auto-dismiss' })
  autoDismiss: boolean;

  @property({ type: Number, attribute: 'auto-dismiss-timeout' })
  autoDismissTimeout: number;

  private _timeoutId?: number;

  constructor(host: LitCore, config: AutoDismissConfig) {
    super(host, config);
    this.autoDismiss = config.autoDismiss ?? false;
    this.autoDismissTimeout = config.autoDismissTimeout || 5000;
  }

  /**
   * Start auto-dismiss timer
   */
  connectedCallback(): void {
    if (this.autoDismiss) {
      this._startTimer();
    }
  }

  /**
   * Clear timer on disconnect
   */
  disconnectedCallback(): void {
    this._clearTimer();
  }

  /**
   * Override dismiss to clear timer
   */
  override dismiss(): void {
    this._clearTimer();
    super.dismiss();
  }

  /**
   * Start the auto-dismiss timer
   */
  startTimer(): void {
    if (!this.autoDismiss) return;
    this._startTimer();
  }

  /**
   * Stop the auto-dismiss timer
   */
  stopTimer(): void {
    this._clearTimer();
  }

  /**
   * Override the dispatch to include timer info
   */
  protected override _dispatchDismissed(): void {
    this.host.dispatchEvent(
      new CustomEvent('dismissed', {
        bubbles: true,
        composed: true,
        detail: {
          source: this._timeoutId !== undefined ? 'auto' : 'manual',
          timeout: this.autoDismissTimeout
        }
      })
    );
  }

  private _startTimer(): void {
    this._clearTimer();
    this._timeoutId = window.setTimeout(() => {
      super.dismiss();
    }, this.autoDismissTimeout);
  }

  private _clearTimer(): void {
    if (this._timeoutId !== undefined) {
      clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
  }
}
