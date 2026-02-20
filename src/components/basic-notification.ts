import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { BaseDismissFeature } from '../features/base-dismiss-feature.js';

/**
 * BasicNotification - Tier 3 Demo Component
 * 
 * Uses BaseDismissFeature for manual dismissal only.
 * 
 * @element basic-notification
 */
@provide('Dismiss', {
  class: BaseDismissFeature,
  config: { dismissible: true }
})
export class BasicNotification extends LitCore {
  declare Dismiss: BaseDismissFeature;
  declare dismissed: boolean;
  declare dismissible: boolean;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
    }

    :host([dismissed]) {
      animation: fadeOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    .notification {
      position: relative;
      padding: 16px 48px 16px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
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
  `;

  override render(): TemplateResult {
    return html`
      <div class="notification">
        <span class="notification-icon">ⓘ</span>
        <div class="notification-content">
          <slot>Manual dismiss only - click the × button</slot>
        </div>
        ${this.dismissible ? html`
          <button
            class="dismiss-btn"
            @click=${() => this.Dismiss.dismiss()}
            aria-label="Dismiss"
          >
            ×
          </button>
        ` : null}
      </div>
    `;
  }
}
