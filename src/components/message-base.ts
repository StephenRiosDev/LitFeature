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
      line-height: 1.5;
    }

    .message {
      padding: 12px 16px;
      border-radius: 6px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .message-icon {
      flex-shrink: 0;
      font-size: 16px;
      line-height: 1.5;
    }

    .message-content {
      flex: 1;
    }

    /* Status color variants */
    .status-info {
      background-color: #e3f2fd;
      border: 1px solid #2196f3;
      color: #1565c0;
    }

    .status-success {
      background-color: #e8f5e9;
      border: 1px solid #4caf50;
      color: #2e7d32;
    }

    .status-warning {
      background-color: #fff3e0;
      border: 1px solid #ff9800;
      color: #e65100;
    }

    .status-error {
      background-color: #ffebee;
      border: 1px solid #f44336;
      color: #c62828;
    }
  `;

  firstUpdated(_changedProperties?: Map<PropertyKey, unknown>): void {
    super.firstUpdated(_changedProperties);
    console.log('[MessageBase] firstUpdated with status:', this.status, 'showIcon:', this.showIcon);
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    console.log('[MessageBase] updated with status:', this.status, 'showIcon:', this.showIcon);
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.log(`[MessageBase] Connected with status: ${this.status}, showIcon: ${this.showIcon}`);
  }

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
