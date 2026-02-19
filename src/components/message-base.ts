import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { StatusFeature, StatusType, StatusStyles } from '../features/status-feature.js';

/**
 * MessageBase (Level 1)
 * 
 * Base component for all message/notification types.
 * Provides the StatusFeature which controls visual styling based on severity.
 * 
 * HIERARCHY: This is the ROOT component
 * PROVIDES: StatusFeature
 * 
 * @element message-base
 * @attr {string} status - Message severity: 'info', 'success', 'warning', 'error'
 * @attr {boolean} show-icon - Whether to display status icon
 */
@provide('Status', {
  class: StatusFeature,
  config: {
    defaultStatus: 'info',
    showIcon: true
  }
})
export class MessageBase extends LitCore {
  // Feature instance (injected by FeatureManager)
  declare Status: StatusFeature;
  
  // Properties from StatusFeature (automatically added to host)
  declare status: StatusType;
  declare showIcon: boolean;
  declare statusStyles: StatusStyles;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.6;
    }

    .message {
      padding: 14px 18px;
      border-radius: 8px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .message-icon {
      flex-shrink: 0;
      font-size: 18px;
      line-height: 1.4;
    }

    .message-content {
      flex: 1;
      font-weight: 500;
    }

    /* Status color variants */
    .status-info {
      background: rgba(77, 100, 255, 0.08);
      border: 2px solid #4d64ff;
      color: #90ffff;
    }

    .status-success {
      background: rgba(144, 255, 255, 0.08);
      border: 2px solid #90ffff;
      color: #90ffff;
    }

    .status-warning {
      background: rgba(255, 193, 7, 0.08);
      border: 2px solid #ffc107;
      color: #ffeb3b;
    }

    .status-error {
      background: rgba(244, 67, 54, 0.08);
      border: 2px solid #f44336;
      color: #ff6b6b;
    }
  `;

  /**
   * Render the message content (to be overridden by subclasses)
   */
  protected renderContent(): TemplateResult {
    return html`<slot></slot>`;
  }

  override render(): TemplateResult {
    const statusClass = `status-${this.status || 'info'}`;
    
    return html`
      <div class="message ${statusClass}">
        ${this.showIcon ? html`
          <span class="message-icon">${this.Status?.getStatusIcon()}</span>
        ` : null}
        <div class="message-content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }
}

// Register the component
MessageBase.register('message-base');
