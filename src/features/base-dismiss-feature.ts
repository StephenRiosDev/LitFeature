import { css, PropertyDeclarations } from 'lit';
import { LitFeature } from 'lit-feature';
import type { LitCore } from 'lit-feature';
import { property } from 'lit-feature/decorators';

/**
 * Configuration for BaseDismissFeature
 */
export interface BaseDismissConfig {
  /** Whether the element can be dismissed */
  dismissible?: boolean;
  /** Accessibility label for dismiss button */
  dismissLabel?: string;
}

/**
 * BaseDismissFeature - Tier 3 Example (Foundation)
 * 
 * Base feature for manual dismissal functionality.
 * Can be extended by other dismiss features.
 */
export class BaseDismissFeature extends LitFeature<BaseDismissConfig> {
  @property({ type: Boolean, reflect: true })
  dismissible: boolean;

  @property({ type: Boolean, reflect: true })
  dismissed = false;

  static properties: PropertyDeclarations = {
    dismissLabel: {
      type: String,
      attribute: 'dismiss-label'
    }
  };

  declare dismissLabel: string;

  static styles: any = css`
    :host([dismissed]) {
      animation: dismissFadeOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes dismissFadeOut {
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    .dismiss-btn {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .dismiss-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }
  `;

  constructor(host: LitCore, config: BaseDismissConfig) {
    super(host, config);
    this.dismissible = config.dismissible ?? true;
    this.dismissLabel = config.dismissLabel || 'Dismiss';
  }

  /**
   * Manually dismiss the element
   */
  dismiss(): void {
    if (!this.dismissible || this.dismissed) return;
    
    this.dismissed = true;
    this._dispatchDismissed();
  }

  /**
   * Reset dismissed state
   */
  reset(): void {
    this.dismissed = false;
  }

  getDismissLabel(): string {
    return this.dismissLabel;
  }

  handleDismissClick = () => {
    this.dismiss();
  };

  /**
   * Dispatch dismissed event
   */
  protected _dispatchDismissed(): void {
    this.host.dispatchEvent(
      new CustomEvent('dismissed', {
        bubbles: true,
        composed: true,
        detail: { source: 'manual' }
      })
    );
  }
}
