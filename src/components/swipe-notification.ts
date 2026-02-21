import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from 'lit-feature';
import { provide } from 'lit-feature/decorators';
import { SwipeDismissFeature } from '../features/swipe-dismiss-feature.js';

/**
 * SwipeNotification - Tier 3 Demo Component
 * 
 * Uses SwipeDismissFeature - extends AutoDismissFeature with swipe gestures.
 * Demonstrates 3-level feature inheritance!
 * 
 * @element swipe-notification
 */
@provide('Dismiss', {
  class: SwipeDismissFeature,
  config: {
    dismissible: true,
    autoDismiss: true,
    autoDismissTimeout: 6000,
    swipeToDismiss: true,
    swipeThreshold: 100
  }
})
export class SwipeNotification extends LitCore {
  declare Dismiss: SwipeDismissFeature;
  declare dismissed: boolean;
  declare swipeToDismiss: boolean;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
    }

    .notification {
      position: relative;
      padding: 16px 48px 16px 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
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

    .notification-hint {
      font-size: 11px;
      opacity: 0.8;
      margin-top: 4px;
    }

  `;

  override render(): TemplateResult {
    return html`
      <div class="notification">
        <span class="notification-icon">⇋</span>
        <div class="notification-content">
          <slot>
            <div>All three dismiss methods available!</div>
            <div class="notification-hint">
              Swipe left/right • Click × • Wait 6 sec
            </div>
          </slot>
        </div>
        <button
          class="dismiss-btn"
          @click=${this.Dismiss.handleDismissClick}
          aria-label=${this.Dismiss.getDismissLabel()}
        >
          ×
        </button>
        <div class="timer-indicator">
          <div class="timer-bar"></div>
        </div>
      </div>
    `;
  }
}
