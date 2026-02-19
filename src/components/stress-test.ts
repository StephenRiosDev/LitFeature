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
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8f9fa;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      background: white;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 8px;
      color: #1a1a1a;
    }

    .subtitle {
      color: #666;
      margin: 0 0 16px;
      font-size: 16px;
    }

    .controls {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .stat {
      background: #f0f0f0;
      padding: 12px;
      border-radius: 4px;
      font-size: 14px;
    }

    .stat-label {
      color: #666;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .stat-value.warning {
      color: #ff9800;
    }

    .stat-value.error {
      color: #f44336;
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
      margin-top: 24px;
    }

    .section {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px;
      color: #333;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .component-type-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge-simple {
      background: #e3f2fd;
      color: #1565c0;
    }

    .badge-medium {
      background: #fff3e0;
      color: #e65100;
    }

    .badge-complex {
      background: #f3e5f5;
      color: #6a1b9a;
    }

    .component-wrapper {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 12px;
      background: #fafafa;
    }

    .component-meta {
      font-size: 12px;
      color: #999;
      margin-top: 8px;
      font-family: monospace;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 12px;
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
      background: #fff3cd;
      border: 1px solid #ffc107;
      color: #856404;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 14px;
    }

    .error-message {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 14px;
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
