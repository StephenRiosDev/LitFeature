import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { provide, configure } from '../root/decorators/index.js';
import { MessageBox } from './message-box.js';
import { DismissFeature } from '../features/dismiss-feature.js';

/**
 * AlertBox (Level 3)
 * 
 * Extends MessageBox with dismissal functionality.
 * Adds a close button and dismiss callbacks.
 * 
 * HIERARCHY: MessageBase → MessageBox → AlertBox
 * INHERITS: StatusFeature (from MessageBase), VisibilityFeature (from MessageBox)
 * PROVIDES: DismissFeature
 * CONFIGURES: StatusFeature, VisibilityFeature
 * 
 * @element alert-box
 * @attr {boolean} dismissible - Whether the alert can be dismissed
 * @attr {boolean} dismissed - Whether the alert has been dismissed
 * @fires dismissed - When the alert is dismissed
 */
@provide('Dismiss', {
  class: DismissFeature,
  config: {
    dismissible: true,
    dismissLabel: 'Close'
  }
})
@configure('Status', {
  config: {
    defaultStatus: 'warning' // Alerts are often warnings
  }
})
@configure('Visibility', {
  config: {
    transitionDuration: 200 // Slightly faster for alerts
  }
})
export class AlertBox extends MessageBox {
  // Feature instance
  declare Dismiss: DismissFeature;
  
  // Properties from DismissFeature
  declare dismissible: boolean;
  declare dismissed: boolean;

  static override styles: CSSResultGroup = [
    MessageBox.styles as CSSResultGroup,
    css`
      .alert-box {
        position: relative;
        padding-right: 40px; /* Make room for close button */
      }

      .dismiss-button {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        background: none;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        opacity: 0.6;
        transition: opacity 0.2s;
        color: inherit;
      }

      .dismiss-button:hover {
        opacity: 1;
      }

      .dismiss-button:focus {
        outline: 2px solid currentColor;
        outline-offset: 2px;
        opacity: 1;
      }

      /* Dismissed state */
      :host([dismissed]) .alert-box {
        display: none;
      }
    `
  ];

  /**
   * Handle dismiss button click
   */
  private _handleDismiss(): void {
    this.Dismiss?.dismiss();
  }

  render(): TemplateResult {
    if (this.dismissed) {
      return html``;
    }

    if (!this.visible && !this.transitioning) {
      return html``;
    }

    const statusClass = `status-${this.status || 'info'}`;
    const transitionStyle = this.Visibility?.visible ? this.Visibility.getTransitionStyles() || '' : '';
    
    return html`
      <div 
        class="message message-box alert-box ${statusClass} ${this.transitioning ? 'transitioning' : ''}"
        style="${transitionStyle}"
        role="alert"
      >
        ${this.showIcon ? html`
          <span class="message-icon">${this.Status?.getStatusIcon()}</span>
        ` : null}
        <div class="message-content">
          ${this.renderContent()}
        </div>
        ${this.dismissible ? html`
          <button 
            class="dismiss-button"
            @click=${() => this._handleDismiss()}
            aria-label="${this.Dismiss?.getDismissLabel()}"
            type="button"
          >×</button>
        ` : null}
      </div>
    `;
  }
}

// Register the component
AlertBox.register('alert-box');
