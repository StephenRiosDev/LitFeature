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
 * Super Stress Test Component
 * 
 * Silently generates 500 of the most complex components (AlertBox) to test performance.
 * Designed for quick standup demos - no console spam, only final timing.
 * 
 * @element super-stress-test
 */
export class SuperStressTest extends LitElement {
  @state()
  private _isRunning: boolean = false;

  @state()
  private _isComplete: boolean = false;

  @state()
  private _totalTime: number = 0;

  @state()
  private _componentCount: number = 0;

  @state()
  private _components: Array<{
    id: number;
    status: StatusType;
    message: string;
  }> = [];

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      text-align: center;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
      padding: 60px 40px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 600px;
    }

    h1 {
      font-size: 36px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #1a1a1a;
    }

    .subtitle {
      font-size: 16px;
      color: #666;
      margin: 0 0 40px;
    }

    .status {
      font-size: 18px;
      color: #667eea;
      font-weight: 600;
      margin-bottom: 24px;
      height: 24px;
    }

    .spinner {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 24px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .results {
      display: none;
    }

    .results.show {
      display: block;
    }

    .time-display {
      font-size: 64px;
      font-weight: 700;
      color: #667eea;
      margin: 32px 0;
      font-family: 'Monaco', 'Courier New', monospace;
    }

    .unit {
      font-size: 24px;
      color: #999;
    }

    .details {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-top: 24px;
      text-align: left;
      font-size: 14px;
      font-family: monospace;
      color: #333;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      color: #666;
    }

    .detail-value {
      color: #1a1a1a;
      font-weight: 600;
    }

    .rating {
      margin-top: 24px;
      font-size: 32px;
    }

    button {
      margin-top: 24px;
      padding: 12px 32px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      background: #667eea;
      color: white;
      transition: all 0.2s;
    }

    button:hover {
      background: #764ba2;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    button:active {
      transform: translateY(0);
    }

    .hidden {
      display: none;
    }

    .components-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      opacity: 0.3;
      z-index: -1;
    }

    .component-item {
      position: absolute;
      width: 300px;
      opacity: 0.5;
    }
  `;

  override firstUpdated(): void {
    performanceMonitor.disable();
  }

  override render(): TemplateResult {
    return html`
      <div class="container">
        ${!this._isComplete
          ? html`
              <h1>⚡ Super Stress Test</h1>
              <p class="subtitle">Silently rendering 500 complex components...</p>

              ${this._isRunning
                ? html`
                    <div class="spinner"></div>
                    <div class="status">Generating ${this._componentCount}/500...</div>
                  `
                : html`
                    <div class="status"></div>
                    <button @click=${this._handleRun}>Start Test</button>
                  `}
            `
          : html`
              <h1>✅ Test Complete!</h1>

              <div class="results show">
                <div class="time-display">
                  ${this._totalTime.toFixed(0)}<span class="unit">ms</span>
                </div>

                <div class="details">
                  <div class="detail-row">
                    <span class="detail-label">Components Generated:</span>
                    <span class="detail-value">${this._componentCount}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Total Time:</span>
                    <span class="detail-value">${this._totalTime.toFixed(2)}ms</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Time per Component:</span>
                    <span class="detail-value">${(this._totalTime / this._componentCount).toFixed(3)}ms</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Projected 2500:</span>
                    <span class="detail-value">${((this._totalTime / this._componentCount) * 2500).toFixed(0)}ms</span>
                  </div>
                </div>

                <div class="rating">
                  ${this._getRating()}
                </div>

                <button @click=${this._handleReset}>Run Again</button>
              </div>
            `}
      </div>

      <div class="components-container">
        ${this._components.map((comp) => this._renderHiddenComponent(comp))}
      </div>
    `;
  }

  private _getRating(): string {
    const avg = this._totalTime / this._componentCount;

    if (avg < 0.4) return '🚀 Blazing fast!';
    if (avg < 0.6) return '⚡ Very fast';
    if (avg < 0.8) return '✅ Fast';
    if (avg < 1.0) return '👍 Acceptable';
    if (avg < 1.5) return '⚠️  Slow';
    return '❌ Very slow';
  }

  private _renderHiddenComponent(comp: (typeof this._components)[0]): TemplateResult {
    return html`
      <div class="component-item">
        <toast-notification status=${comp.status} ?dismissible=${true}>
          ${comp.message}
        </toast-notification>
      </div>
    `;
  }

  private _handleRun(): void {
    this._isRunning = true;
    this._isComplete = false;
    this._components = [];
    this._componentCount = 0;
    this._totalTime = 0;

    // Use requestAnimationFrame to break up work and allow renders between batches
    const startTime = performance.now();
    const statuses: StatusType[] = ['info', 'success', 'warning', 'error'];
    const componentsToGenerate = 500;
    const batchSize = 50; // Process in batches of 50

    const generateBatch = (batchIndex: number) => {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, componentsToGenerate);

      for (let i = start; i < end; i++) {
        this._components.push({
          id: i,
          status: statuses[i % statuses.length],
          message: `Component ${i + 1}`
        });
      }

      this._componentCount = end;
      this.requestUpdate();

      if (end < componentsToGenerate) {
        requestAnimationFrame(() => generateBatch(batchIndex + 1));
      } else {
        const endTime = performance.now();
        this._totalTime = endTime - startTime;
        this._isRunning = false;
        this._isComplete = true;

        // Log only the final result
        console.log(`✅ Super Stress Test Complete`);
        console.log(`📊 Generated ${this._componentCount} complex components in ${this._totalTime.toFixed(2)}ms`);
        console.log(`⏱️  Average per component: ${(this._totalTime / this._componentCount).toFixed(3)}ms`);
        console.log(`📈 Projected at 2500 components: ${((this._totalTime / this._componentCount) * 2500).toFixed(0)}ms`);
      }
    };

    generateBatch(0);
  }

  private _handleReset(): void {
    this._isComplete = false;
    this._isRunning = false;
    this._components = [];
    this._componentCount = 0;
    this._totalTime = 0;
  }
}

customElements.define('super-stress-test', SuperStressTest);

declare global {
  interface HTMLElementTagNameMap {
    'super-stress-test': SuperStressTest;
  }
}
