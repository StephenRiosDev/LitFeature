import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from 'lit-feature';
import { provide } from 'lit-feature/decorators';
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
          @click=${this.Dismiss.handleDismissClick}
          aria-label=${this.Dismiss.getDismissLabel()}
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
