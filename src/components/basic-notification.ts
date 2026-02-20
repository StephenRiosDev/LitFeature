import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { BaseDismissFeature } from '../features/base-dismiss-feature.js';

/**
 * BasicNotification - Tier 3 Demo Component
 * Uses BaseDismissFeature for manual dismissal only.
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
            @click=${this.Dismiss.handleDismissClick}
            aria-label=${this.Dismiss.getDismissLabel()}
          >
            ×
          </button>
        ` : null}
      </div>
    `;
  }
}
