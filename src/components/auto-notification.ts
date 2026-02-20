import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { AutoDismissFeature } from '../features/auto-dismiss-feature.js';

/**
 * AutoNotification - Tier 3 Demo Component
 * 
 * Uses AutoDismissFeature - extends BaseDismissFeature with timer.
 * 
 * @element auto-notification
 */
@provide('Dismiss', {
  class: AutoDismissFeature,
  config: {
    dismissible: true,
    autoDismiss: true,
    autoDismissTimeout: 4000
  }
})
export class AutoNotification extends LitCore {
  declare Dismiss: AutoDismissFeature;
  declare dismissed: boolean;
  declare autoDismiss: boolean;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes fadeIn {
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
      animation: slideOut 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes slideOut {
      to {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
      }
    }

    .notification {
      position: relative;
      padding: 16px 48px 16px 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
      transition: transform 0.2s;
    }

    .notification-icon {
      font-size: 24px;
    }

    .notification-content {
      flex: 1;
      font-size: 14px;
      line-height: 1.5;
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

    .timer-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 0 0 12px 12px;
    }

    .timer-bar {
      height: 100%;
      background: white;
      animation: timer 4s linear forwards;
    }

    @keyframes timer {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="notification">
        <span class="notification-icon">◷</span>
        <div class="notification-content">
          <slot>Auto-dismisses after 4 seconds (or click ×)</slot>
        </div>
        <button
          class="dismiss-btn"
          @click=${() => this.Dismiss.dismiss()}
          aria-label="Dismiss"
        >
          ×
        </button>
        ${this.autoDismiss ? html`
          <div class="timer-indicator">
            <div class="timer-bar"></div>
          </div>
        ` : null}
      </div>
    `;
  }
}
