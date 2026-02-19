import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { LitCore } from '../root/lit-core.js';

// Import all notification components
import './message-base.js';
import './message-box.js';
import './alert-box.js';
import './toast-notification.js';

// Import types for declarations
import type { StatusType } from '../features/status-feature.js';

/**
 * NotificationDemo
 * 
 * Demonstrates the LitFeature notification system with all 4 levels:
 * 1. message-base: Basic message with status styling
 * 2. message-box: Message with show/hide transitions
 * 3. alert-box: Dismissible alert with close button
 * 4. toast-notification: Auto-dismissing toast with timer
 * 
 * This demo showcases:
 * - Feature inheritance across 4 levels
 * - Feature configuration and overrides
 * - Reactive properties from features
 * - Lifecycle hooks in action
 * - Feature-to-feature communication
 */
export class NotificationDemo extends LitElement {
  private _toastCount: number = 0;
  
  @state()
  private _toasts: Array<{ id: number; status: StatusType; message: string }> = [];

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 8px;
      color: #1a1a1a;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 32px 0 16px;
      color: #333;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 8px;
    }

    .subtitle {
      color: #666;
      margin: 0 0 32px;
    }

    .section {
      margin-bottom: 32px;
    }

    .demo-grid {
      display: grid;
      gap: 16px;
    }

    .demo-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }

    .level-badge {
      display: inline-block;
      background: #333;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-right: 8px;
    }

    .code {
      font-family: 'SF Mono', Monaco, monospace;
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }

    button {
      background: #333;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    button:hover {
      background: #555;
    }

    button.secondary {
      background: #e0e0e0;
      color: #333;
    }

    button.secondary:hover {
      background: #d0d0d0;
    }

    .hierarchy-diagram {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 13px;
      line-height: 1.8;
    }

    .hierarchy-diagram .provides {
      color: #2e7d32;
    }

    .hierarchy-diagram .configures {
      color: #1565c0;
    }

    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column-reverse;
      gap: 12px;
      z-index: 1000;
    }

    .feature-list {
      margin: 8px 0;
      padding-left: 20px;
    }

    .feature-list li {
      margin: 4px 0;
    }
  `;

  private _createToast(status: StatusType): void {
    this._toastCount++;
    const messages: Record<StatusType, string> = {
      info: 'This is an informational toast notification.',
      success: 'Operation completed successfully!',
      warning: 'Please review before proceeding.',
      error: 'An error occurred. Please try again.'
    };

    const toast = {
      id: this._toastCount,
      status,
      message: messages[status]
    };

    this._toasts = [...this._toasts, toast];
    this.requestUpdate();

    // Auto-remove from array after animation
    setTimeout(() => {
      this._toasts = this._toasts.filter(t => t.id !== toast.id);
      this.requestUpdate();
    }, 6000);
  }

  render(): TemplateResult {
    return html`
      <h1>LitFeature Notification System</h1>
      <p class="subtitle">A demonstration of the composable feature architecture with 4 levels of inheritance</p>

      <!-- Hierarchy Diagram -->
      <div class="section">
        <h2>Component Hierarchy</h2>
        <div class="hierarchy-diagram">
          <div><strong>Level 1:</strong> message-base <span class="provides">→ provides StatusFeature</span></div>
          <div>    ↓</div>
          <div><strong>Level 2:</strong> message-box <span class="provides">→ provides VisibilityFeature</span> <span class="configures">+ configures Status</span></div>
          <div>    ↓</div>
          <div><strong>Level 3:</strong> alert-box <span class="provides">→ provides DismissFeature</span> <span class="configures">+ configures Status, Visibility</span></div>
          <div>    ↓</div>
          <div><strong>Level 4:</strong> toast-notification <span class="provides">→ provides TimerFeature</span> <span class="configures">+ configures all</span></div>
        </div>
      </div>

      <!-- Level 1: message-base -->
      <div class="section">
        <h2><span class="level-badge">Level 1</span> message-base</h2>
        <p>Base component with <span class="code">StatusFeature</span> - controls colors and icons based on severity.</p>
        <div class="demo-grid">
          <message-base status="info">This is an info message</message-base>
          <message-base status="success">This is a success message</message-base>
          <message-base status="warning">This is a warning message</message-base>
          <message-base status="error">This is an error message</message-base>
          <message-base status="info" .showIcon=${false}>Message without icon (show-icon=false)</message-base>
        </div>
      </div>

      <!-- Level 2: message-box -->
      <div class="section">
        <h2><span class="level-badge">Level 2</span> message-box</h2>
        <p>Extends message-base with <span class="code">VisibilityFeature</span> - adds show/hide with transitions.</p>
        <div class="demo-grid">
          <div class="demo-row">
            <button @click=${() => this._toggleMessageBox()}>Toggle Visibility</button>
            <span class="code">Visibility.toggle()</span>
          </div>
          <message-box id="demo-message-box" status="success">
            This message can be shown/hidden with smooth transitions. 
            Click the button above to toggle!
          </message-box>
        </div>
      </div>

      <!-- Level 3: alert-box -->
      <div class="section">
        <h2><span class="level-badge">Level 3</span> alert-box</h2>
        <p>Extends message-box with <span class="code">DismissFeature</span> - adds close button and callbacks.</p>
        <div class="demo-grid">
          <div class="demo-row">
            <button @click=${() => this._resetAlerts()}>Reset Alerts</button>
          </div>
          <alert-box id="alert-1" status="warning">
            This is a dismissible alert. Click the × button to dismiss it.
          </alert-box>
          <alert-box id="alert-2" status="error" .dismissible=${false}>
            This alert has dismissible=false, so no close button appears.
          </alert-box>
          <alert-box id="alert-3" status="info">
            Try dismissing this alert. The Dismiss feature integrates with Visibility for smooth fade-out.
          </alert-box>
        </div>
      </div>

      <!-- Level 4: toast-notification -->
      <div class="section">
        <h2><span class="level-badge">Level 4</span> toast-notification</h2>
        <p>Extends alert-box with <span class="code">TimerFeature</span> - adds auto-dismiss countdown.</p>
        <ul class="feature-list">
          <li><strong>Auto-dismiss:</strong> Countdown timer that triggers dismiss</li>
          <li><strong>Progress bar:</strong> Visual countdown indicator</li>
          <li><strong>Pause on hover:</strong> Timer pauses when mouse enters</li>
          <li><strong>Controls:</strong> Pause/Resume and Reset buttons</li>
        </ul>
        <div class="demo-row">
          <button @click=${() => this._createToast('info')}>Info Toast</button>
          <button @click=${() => this._createToast('success')}>Success Toast</button>
          <button @click=${() => this._createToast('warning')}>Warning Toast</button>
          <button @click=${() => this._createToast('error')}>Error Toast</button>
        </div>
      </div>

      <!-- Feature Summary -->
      <div class="section">
        <h2>Features Demonstrated</h2>
        <ul class="feature-list">
          <li><strong>@provide decorator:</strong> Registers features at each component level</li>
          <li><strong>@configure decorator:</strong> Overrides feature config in descendant classes</li>
          <li><strong>Property inheritance:</strong> Feature properties automatically added to host</li>
          <li><strong>Lifecycle hooks:</strong> beforeConnectedCallback, afterConnectedCallback, updated, etc.</li>
          <li><strong>Feature communication:</strong> Timer → Dismiss, Dismiss → Visibility</li>
          <li><strong>Config merging:</strong> Descendant configs merge with ancestor defaults</li>
        </ul>
      </div>

      <!-- Toast Container (fixed position) -->
      <div class="toast-container">
        ${this._toasts.map(toast => html`
          <toast-notification 
            status=${toast.status}
            duration="5000"
            @dismissed=${() => this._removeToast(toast.id)}
          >
            ${toast.message}
          </toast-notification>
        `)}
      </div>
    `;
  }

  private _toggleMessageBox(): void {
    const messageBox = this.renderRoot.querySelector('#demo-message-box') as { toggle?: () => void };
    messageBox?.toggle?.();
  }

  private _resetAlerts(): void {
    // Re-create alerts by forcing a re-render
    const alerts = this.renderRoot.querySelectorAll('alert-box');
    alerts.forEach(alert => {
      (alert as { dismissed?: boolean; visible?: boolean }).dismissed = false;
      (alert as { visible?: boolean }).visible = true;
    });
    this.requestUpdate();
  }

  private _removeToast(id: number): void {
    this._toasts = this._toasts.filter(t => t.id !== id);
    this.requestUpdate();
  }
}

// Register the demo component
customElements.define('notification-demo', NotificationDemo);
