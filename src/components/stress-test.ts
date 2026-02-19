import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { performanceMonitor } from '../root/performance-monitor.js';

// Import all notification components
import './message-base.js';
import './message-box.js';
import './alert-box.js';
import './toast-notification.js';

import type { StatusType } from '../features/status-feature.js';

/**
 * Stress Test Component
 * 
 * Creates 50+ components of varying complexity to stress-test the LitFeature system.
 * Includes:
 * - 20 simple message-base components
 * - 15 message-box components (with VisibilityFeature)
 * - 15 alert-box components (with multiple features)
 * - Some with auto-dismiss timers
 * 
 * Monitors performance throughout and logs only when there are potential
 * slowdowns or issues, assuming the system could scale to 2500+ components.
 * 
 * @element stress-test
 */
export class StressTest extends LitElement {
  @state()
  private _componentCount: number = 0;

  @state()
  private _components: Array<{
    id: number;
    type: 'simple' | 'medium' | 'complex';
    status: StatusType;
    message: string;
    visible?: boolean;
    hasTimer?: boolean;
  }> = [];

  @state()
  private _initialized: boolean = false;

  @state()
  private _performanceSummary = {
    totalTime: 0,
    componentCount: 0,
    avgPerComponent: 0,
    warnings: 0,
    errors: 0
  };

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      background: #1f1f1f;
      padding: 32px;
      border-radius: 12px;
      margin-bottom: 32px;
      border: 1px solid #404040;
    }

    h1 {
      font-size: 42px;
      font-weight: 700;
      margin: 0 0 12px;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -1px;
    }

    .subtitle {
      color: #a0a0a0;
      margin: 0 0 20px;
      font-size: 18px;
    }

    .controls {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #4d64ff 0%, rgba(77, 100, 255, 0.8) 100%);
      color: white;
      border: 2px solid #4d64ff;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #5d74ff 0%, rgba(77, 100, 255, 0.9) 100%);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #2a2a2a;
      color: #90ffff;
      border: 2px solid #90ffff;
    }

    .btn-secondary:hover {
      background: #353535;
      transform: translateY(-1px);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .stat {
      background: #2a2a2a;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #404040;
      font-size: 14px;
    }

    .stat:hover {
      border-color: #4d64ff;
    }

    .stat-label {
      color: #a0a0a0;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value.warning {
      background: linear-gradient(135deg, #ffc107 0%, #ffeb3b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value.error {
      background: linear-gradient(135deg, #f44336 0%, #ff6b6b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 32px;
    }

    .section {
      background: #1f1f1f;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid #404040;
    }

    .section:hover {
      border-color: #4d64ff;
    }

    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #e0e0e0;
      display: flex;
      align-items: center;
      gap: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .component-type-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid;
    }

    .badge-simple {
      background: rgba(77, 100, 255, 0.15);
      color: #90ffff;
      border-color: #4d64ff;
    }

    .badge-medium {
      background: rgba(255, 193, 7, 0.15);
      color: #ffeb3b;
      border-color: #ffc107;
    }

    .badge-complex {
      background: rgba(244, 67, 54, 0.15);
      color: #ff6b6b;
      border-color: #f44336;
    }

    .component-wrapper {
      border: 2px solid #404040;
      border-radius: 8px;
      padding: 16px;
      background: rgba(77, 100, 255, 0.05);
    }

    .component-wrapper:hover {
      border-color: #4d64ff;
      background: rgba(77, 100, 255, 0.1);
    }

    .component-meta {
      font-size: 12px;
      color: #808080;
      margin-top: 12px;
      font-family: 'Courier New', monospace;
      background: rgba(0, 0, 0, 0.2);
      padding: 8px;
      border-radius: 4px;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #a0a0a0;
      font-size: 18px;
    }

    .spinner {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 3px solid rgba(77, 100, 255, 0.3);
      border-top: 3px solid #4d64ff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 16px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .warning-message {
      background: rgba(255, 193, 7, 0.1);
      border: 2px solid #ffc107;
      color: #ffeb3b;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .error-message {
      background: rgba(244, 67, 54, 0.1);
      border: 2px solid #f44336;
      color: #ff6b6b;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 500;
    }
  `;

  override firstUpdated(): void {
    performanceMonitor.mark('stress-test-init-start');
  }

  override render(): TemplateResult {
    return html`
      <div class="container">
        <div class="header">
          <h1>🔥 LitFeature Stress Test</h1>
          <p class="subtitle">
            Rendering 50+ components with varying complexity to identify performance bottlenecks
            and scaling limitations. Assuming potential scale to 2500+ components.
          </p>

          ${this._performanceSummary.warnings > 0 || this._performanceSummary.errors > 0
            ? html`
                <div class="warning-message">
                  ⚠️ Performance issues detected during initialization:
                  ${this._performanceSummary.warnings} warnings,
                  ${this._performanceSummary.errors} errors
                </div>
              `
            : ''}

          <div class="controls">
            <button
              class="btn-primary"
              @click=${this._handleGenerateComponents}
              ?disabled=${this._initialized}
            >
              ${this._initialized ? 'Generated ✓' : 'Generate 50+ Components'}
            </button>
            <button class="btn-secondary" @click=${this._handleClear}>Clear & Reset</button>
            <button class="btn-secondary" @click=${this._handleLogMetrics}>
              📊 Log Metrics
            </button>
          </div>

          ${this._initialized
            ? html`
                <div class="stats">
                  <div class="stat">
                    <div class="stat-label">Total Components</div>
                    <div class="stat-value">${this._performanceSummary.componentCount}</div>
                  </div>
                  <div class="stat">
                    <div class="stat-label">Total Init Time</div>
                    <div class="stat-value">${this._performanceSummary.totalTime.toFixed(2)}ms</div>
                  </div>
                  <div class="stat">
                    <div class="stat-label">Avg per Component</div>
                    <div class="stat-value">${this._performanceSummary.avgPerComponent.toFixed(3)}ms</div>
                  </div>
                  <div class="stat">
                    <div class="stat-label">Issues</div>
                    <div
                      class="stat-value ${this._performanceSummary.warnings > 0 ? 'warning' : this._performanceSummary.errors > 0 ? 'error' : ''}"
                    >
                      ${this._performanceSummary.warnings + this._performanceSummary.errors}
                    </div>
                  </div>
                </div>
              `
            : ''}
        </div>

        ${!this._initialized
          ? html` <div class="loading">
              <div class="spinner"></div>
              <span>Click "Generate 50+ Components" to start stress test...</span>
            </div>`
          : this._renderComponents()}
      </div>
    `;
  }

  private _renderComponents(): TemplateResult {
    const groupedByType = {
      simple: this._components.filter((c) => c.type === 'simple'),
      medium: this._components.filter((c) => c.type === 'medium'),
      complex: this._components.filter((c) => c.type === 'complex')
    };

    return html`
      <div class="section">
        ${this._renderComponentGroup('Simple Components (Message Base)', 'simple', groupedByType.simple)}
      </div>

      <div class="section" style="margin-top: 24px;">
        ${this._renderComponentGroup('Medium Complexity (Message Box + Visibility)', 'medium', groupedByType.medium)}
      </div>

      <div class="section" style="margin-top: 24px;">
        ${this._renderComponentGroup('High Complexity (Alert Box + Multiple Features)', 'complex', groupedByType.complex)}
      </div>
    `;
  }

  private _renderComponentGroup(
    title: string,
    type: 'simple' | 'medium' | 'complex',
    components: typeof this._components
  ): TemplateResult {
    const badgeClass =
      type === 'simple' ? 'badge-simple' : type === 'medium' ? 'badge-medium' : 'badge-complex';

    return html`
      <div class="section-title">
        <span class="component-type-badge ${badgeClass}">${type}</span>
        ${title} (${components.length})
      </div>

      <div class="components-grid">
        ${components.map((comp) => this._renderComponentInstance(comp))}
      </div>
    `;
  }

  private _renderComponentInstance(comp: typeof this._components[0]): TemplateResult {
    const messagePrefix = `[${comp.type}]`;

    if (comp.type === 'simple') {
      return html`
        <div class="component-wrapper">
          <message-base status=${comp.status}> ${messagePrefix} ${comp.message} </message-base>
          <div class="component-meta">ID: ${comp.id} | Type: message-base</div>
        </div>
      `;
    } else if (comp.type === 'medium') {
      return html`
        <div class="component-wrapper">
          <message-box status=${comp.status} ?visible=${comp.visible !== false}>
            ${messagePrefix} ${comp.message}
          </message-box>
          <div class="component-meta">ID: ${comp.id} | Type: message-box | Visible: ${comp.visible !== false ? 'yes' : 'no'}</div>
        </div>
      `;
    } else {
      // complex
      return html`
        <div class="component-wrapper">
          <alert-box status=${comp.status} ?dismissible=${true}>
            ${messagePrefix} ${comp.message}
          </alert-box>
          <div class="component-meta">
            ID: ${comp.id} | Type: alert-box | Timer: ${comp.hasTimer ? 'yes' : 'no'}
          </div>
        </div>
      `;
    }
  }

  private _handleGenerateComponents(): void {
    performanceMonitor.mark('component-generation-start');

    const components: typeof this._components = [];
    const statuses: StatusType[] = ['info', 'success', 'warning', 'error'];

    // Generate 20 simple components
    performanceMonitor.mark('generate-simple-start');
    for (let i = 0; i < 20; i++) {
      components.push({
        id: i,
        type: 'simple',
        status: statuses[i % statuses.length],
        message: `Simple message ${i + 1}: Basic notification component`
      });
    }
    const simpleTime = performanceMonitor.measure('generate-simple', {
      markStart: 'generate-simple-start',
      threshold: 0.5,
      context: { count: 20 }
    });

    // Generate 15 medium complexity components
    performanceMonitor.mark('generate-medium-start');
    for (let i = 0; i < 15; i++) {
      components.push({
        id: 20 + i,
        type: 'medium',
        status: statuses[i % statuses.length],
        message: `Medium message ${i + 1}: Component with visibility feature`,
        visible: i % 3 !== 0 // Some hidden
      });
    }
    const mediumTime = performanceMonitor.measure('generate-medium', {
      markStart: 'generate-medium-start',
      threshold: 0.5,
      context: { count: 15 }
    });

    // Generate 15 complex components
    performanceMonitor.mark('generate-complex-start');
    for (let i = 0; i < 15; i++) {
      components.push({
        id: 35 + i,
        type: 'complex',
        status: statuses[i % statuses.length],
        message: `Complex message ${i + 1}: Dismiss and visibility features`,
        visible: true,
        hasTimer: i % 2 === 0 // Half have timers
      });
    }
    const complexTime = performanceMonitor.measure('generate-complex', {
      markStart: 'generate-complex-start',
      threshold: 0.5,
      context: { count: 15 }
    });

    // Update component list and stats
    this._components = components;
    this._componentCount = components.length;

    // Measure total generation time
    performanceMonitor.mark('component-render-start');
    this.requestUpdate();

    // Use microtask to measure render completion
    Promise.resolve().then(() => {
      const totalTime = performanceMonitor.measure('component-generation-total', {
        markStart: 'component-generation-start',
        threshold: 10,
        context: { componentCount: components.length },
        alwaysLog: true
      });

      // Calculate performance metrics
      const avg = totalTime / components.length;
      const metrics = performanceMonitor.getSummary();

      this._performanceSummary = {
        totalTime,
        componentCount: components.length,
        avgPerComponent: avg,
        warnings: metrics.warnings,
        errors: metrics.errors
      };

      this._initialized = true;

      // Check if averages indicate scaling issues
      const scaledTo2500 = avg * 2500;
      if (scaledTo2500 > 500) {
        console.warn(
          `⚠️ Scaling concern: Average ${avg.toFixed(3)}ms per component would result in ${scaledTo2500.toFixed(0)}ms for 2500 components`
        );
      }

      console.log(
        `✅ Generated ${components.length} components in ${totalTime.toFixed(2)}ms (${avg.toFixed(3)}ms each)`
      );
      console.log(
        `   - Simple (20): ${simpleTime.toFixed(2)}ms (${(simpleTime / 20).toFixed(3)}ms each)`
      );
      console.log(
        `   - Medium (15): ${mediumTime.toFixed(2)}ms (${(mediumTime / 15).toFixed(3)}ms each)`
      );
      console.log(
        `   - Complex (15): ${complexTime.toFixed(2)}ms (${(complexTime / 15).toFixed(3)}ms each)`
      );
    });
  }

  private _handleClear(): void {
    this._components = [];
    this._initialized = false;
    this._componentCount = 0;
    this._performanceSummary = {
      totalTime: 0,
      componentCount: 0,
      avgPerComponent: 0,
      warnings: 0,
      errors: 0
    };
    performanceMonitor.clearMetrics();
  }

  private _handleLogMetrics(): void {
    performanceMonitor.logSummary();
  }
}

customElements.define('stress-test', StressTest);

declare global {
  interface HTMLElementTagNameMap {
    'stress-test': StressTest;
  }
}
