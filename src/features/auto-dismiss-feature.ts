import { css } from 'lit';
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

  static styles = css`
    :host {
      animation: dismissFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes dismissFadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host([dismissed]) {
      animation: dismissSlideOut 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes dismissSlideOut {
      to {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
      }
    }

    .timer-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 0 0 12px 12px;
      overflow: hidden;
    }

    .timer-bar {
      height: 100%;
      background: white;
      animation: dismissTimer var(--dismiss-timer-duration, 4s) linear forwards;
    }

    @keyframes dismissTimer {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;

  constructor(host: LitCore, config: AutoDismissConfig) {
    super(host, config);
    this.autoDismiss = config.autoDismiss ?? false;
    this.autoDismissTimeout = config.autoDismissTimeout || 5000;
    this._applyTimerDuration();
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('autoDismissTimeout')) {
      this._applyTimerDuration();
    }

    if (changedProperties.has('autoDismiss')) {
      if (this.autoDismiss) {
        this._startTimer();
      } else {
        this._clearTimer();
      }
    }
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

  getTimerDurationMs(): number {
    return this.autoDismissTimeout;
  }

  setAutoDismissEnabled(enabled: boolean): void {
    this.autoDismiss = enabled;
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

  private _applyTimerDuration(): void {
    (this.host as HTMLElement).style.setProperty(
      '--dismiss-timer-duration',
      `${this.autoDismissTimeout}ms`
    );
  }

  private _clearTimer(): void {
    if (this._timeoutId !== undefined) {
      clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
  }
}
