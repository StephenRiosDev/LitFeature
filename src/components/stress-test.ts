import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { performanceMonitor } from '../root/performance-monitor.js';

// Import showcase components used for stress testing
import './simple-button.js';
import './simple-card.js';
import './simple-badge.js';
import './themed-card.js';
import './themed-button.js';
import './themed-panel.js';
import './basic-notification.js';
import './auto-notification.js';
import './swipe-notification.js';

/**
 * Stress Test Component
 * 
 * Creates 50+ components of varying complexity to stress-test the LitFeature system.
 * Includes simple, themed, and notification components used in the showcase demo.
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
    kind: string;
    title?: string;
    message: string;
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
      color: #f2f2f2;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    :host * {
      box-sizing: border-box;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 40px;
    }

    h1 {
      font-size: 52px;
      font-weight: 700;
      margin: 0 0 12px;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #cbd5f5;
      margin: 0 0 24px;
      font-size: 17px;
      line-height: 1.7;
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
      letter-spacing: 0.05em;
    }

    .btn-primary {
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      color: #0a0f1a;
      border: none;
      box-shadow: 0 4px 12px rgba(125, 211, 252, 0.2);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(125, 211, 252, 0.35);
    }

    .btn-secondary {
      background: #111827;
      color: #7dd3fc;
      border: 1px solid rgba(125, 211, 252, 0.3);
    }

    .btn-secondary:hover {
      border-color: rgba(125, 211, 252, 0.5);
      background: #1a1f2e;
      transform: translateY(-2px);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .stat {
      background: #0b0f19;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      transition: all 0.2s ease;
    }

    .stat:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: #0d1220;
    }

    .stat-label {
      color: #94a3af;
      font-size: 11px;
      text-transform: uppercase;
      margin-bottom: 8px;
      letter-spacing: 0.1em;
      font-weight: 600;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value.warning {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value.error {
      background: linear-gradient(135deg, #ff6b6b 0%, #f44336 100%);
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
      background: #0b0f19;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      transition: all 0.2s ease;
    }

    .section:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: #0d1220;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #bae6fd;
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .component-type-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid;
    }

    .badge-simple {
      background: rgba(125, 211, 252, 0.15);
      color: #7dd3fc;
      border-color: rgba(125, 211, 252, 0.3);
    }

    .badge-medium {
      background: rgba(251, 191, 36, 0.15);
      color: #fbbf24;
      border-color: rgba(251, 191, 36, 0.3);
    }

    .badge-complex {
      background: rgba(255, 107, 107, 0.15);
      color: #ff6b6b;
      border-color: rgba(255, 107, 107, 0.3);
    }

    .component-wrapper {
      border: 1px solid rgba(125, 211, 252, 0.15);
      border-radius: 8px;
      padding: 16px;
      background: rgba(125, 211, 252, 0.05);
      transition: all 0.2s ease;
    }

    .component-wrapper:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: rgba(125, 211, 252, 0.08);
    }

    .component-meta {
      font-size: 12px;
      color: #94a3af;
      margin-top: 12px;
      font-family: 'Courier New', monospace;
      background: rgba(125, 211, 252, 0.05);
      padding: 8px;
      border-radius: 4px;
      border: 1px solid rgba(125, 211, 252, 0.1);
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #cbd5f5;
      font-size: 16px;
    }

    .spinner {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 3px solid rgba(125, 211, 252, 0.2);
      border-top: 3px solid #7dd3fc;
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
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.3);
      color: #fbbf24;
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
            Rendering 50+ showcase components with varying complexity to identify performance bottlenecks
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
        ${this._renderComponentGroup('Simple Components (Ripple + Pulse)', 'simple', groupedByType.simple)}
      </div>

      <div class="section" style="margin-top: 24px;">
        ${this._renderComponentGroup('Medium Complexity (Theme)', 'medium', groupedByType.medium)}
      </div>

      <div class="section" style="margin-top: 24px;">
        ${this._renderComponentGroup('High Complexity (Dismiss Chain)', 'complex', groupedByType.complex)}
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
          ${comp.kind === 'button'
            ? html`<simple-button>${messagePrefix} ${comp.message}</simple-button>`
            : comp.kind === 'card'
              ? html`
                  <simple-card>
                    <span slot="title">${comp.title}</span>
                    ${messagePrefix} ${comp.message}
                  </simple-card>
                `
              : html`<simple-badge>${comp.message}</simple-badge>`}
          <div class="component-meta">ID: ${comp.id} | Type: ${comp.kind}</div>
        </div>
      `;
    }

    if (comp.type === 'medium') {
      return html`
        <div class="component-wrapper">
          ${comp.kind === 'themed-card'
            ? html`
                <themed-card>
                  <span slot="title">${comp.title}</span>
                  ${messagePrefix} ${comp.message}
                </themed-card>
              `
            : comp.kind === 'themed-button'
              ? html`<themed-button>${messagePrefix} ${comp.message}</themed-button>`
              : html`<themed-panel>${messagePrefix} ${comp.message}</themed-panel>`}
          <div class="component-meta">ID: ${comp.id} | Type: ${comp.kind}</div>
        </div>
      `;
    }

    return html`
      <div class="component-wrapper">
        ${comp.kind === 'basic-notification'
          ? html`<basic-notification>${messagePrefix} ${comp.message}</basic-notification>`
          : comp.kind === 'auto-notification'
            ? html`<auto-notification>${messagePrefix} ${comp.message}</auto-notification>`
            : html`<swipe-notification>${messagePrefix} ${comp.message}</swipe-notification>`}
        <div class="component-meta">ID: ${comp.id} | Type: ${comp.kind}</div>
      </div>
    `;
  }

  private _handleGenerateComponents(): void {
    performanceMonitor.mark('component-generation-start');

    const components: typeof this._components = [];
    const simpleKinds = ['button', 'card', 'badge'];
    const mediumKinds = ['themed-card', 'themed-button', 'themed-panel'];
    const complexKinds = ['basic-notification', 'auto-notification', 'swipe-notification'];

    // Generate 20 simple components
    performanceMonitor.mark('generate-simple-start');
    for (let i = 0; i < 20; i++) {
      const kind = simpleKinds[i % simpleKinds.length];
      components.push({
        id: i,
        type: 'simple',
        kind,
        title: kind === 'card' ? `Simple Card ${i + 1}` : undefined,
        message: `Simple component ${i + 1}`
      });
    }
    const simpleTime = performanceMonitor.measure('generate-simple', {
      markStart: 'generate-simple-start',
      threshold: 0.5,
      context: { count: 20 }
    });

    // Generate 18 medium complexity components
    performanceMonitor.mark('generate-medium-start');
    for (let i = 0; i < 18; i++) {
      const kind = mediumKinds[i % mediumKinds.length];
      components.push({
        id: 20 + i,
        type: 'medium',
        kind,
        title: kind === 'themed-card' ? `Themed Card ${i + 1}` : undefined,
        message: `Themed component ${i + 1}`
      });
    }
    const mediumTime = performanceMonitor.measure('generate-medium', {
      markStart: 'generate-medium-start',
      threshold: 0.5,
      context: { count: 15 }
    });

    // Generate 18 complex components
    performanceMonitor.mark('generate-complex-start');
    for (let i = 0; i < 18; i++) {
      const kind = complexKinds[i % complexKinds.length];
      components.push({
        id: 38 + i,
        type: 'complex',
        kind,
        message: `Dismiss demo ${i + 1}`
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
        `   - Medium (18): ${mediumTime.toFixed(2)}ms (${(mediumTime / 18).toFixed(3)}ms each)`
      );
      console.log(
        `   - Complex (18): ${complexTime.toFixed(2)}ms (${(complexTime / 18).toFixed(3)}ms each)`
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
