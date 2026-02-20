import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { performanceMonitor } from '../root/performance-monitor.js';

// Import showcase notification component
import './swipe-notification.js';

/**
 * Super Stress Test Component
 * 
 * Silently generates 500 of the most complex showcase components to test performance.
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
    message: string;
  }> = [];

  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 100vh;
      background: #030303;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    .container {
      text-align: center;
      background: linear-gradient(135deg, rgba(13, 18, 32, 0.8) 0%, rgba(11, 15, 25, 0.8) 100%);
      border: 1px solid rgba(125, 211, 252, 0.2);
      box-shadow: 0 8px 32px rgba(125, 211, 252, 0.1);
      padding: 60px 40px;
      border-radius: 16px;
      max-width: 600px;
    }

    h1 {
      font-size: 42px;
      font-weight: 700;
      margin: 0 0 20px;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -1px;
    }

    .subtitle {
      font-size: 17px;
      color: #cbd5f5;
      margin: 0 0 40px;
      line-height: 1.7;
    }

    .status {
      font-size: 16px;
      color: #7dd3fc;
      font-weight: 600;
      margin-bottom: 24px;
      height: 24px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .spinner {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 4px solid rgba(125, 211, 252, 0.2);
      border-top: 4px solid #7dd3fc;
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
      font-size: 72px;
      font-weight: 700;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 32px 0;
      font-family: 'Courier New', monospace;
      letter-spacing: -2px;
    }

    .unit {
      font-size: 24px;
      color: #94a3af;
    }

    .details {
      background: rgba(125, 211, 252, 0.08);
      border: 1px solid rgba(125, 211, 252, 0.2);
      padding: 20px;
      border-radius: 8px;
      margin-top: 24px;
      text-align: left;
      font-size: 14px;
      font-family: 'Courier New', monospace;
      color: #cbd5f5;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(125, 211, 252, 0.1);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      color: #a0a0a0;
    }

    .detail-value {
      color: #90ffff;
      font-weight: 600;
    }

    .rating {
      margin-top: 24px;
      font-size: 32px;
    }

    button {
      margin-top: 24px;
      padding: 12px 32px;
      border: 2px solid #90ffff;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      background: linear-gradient(135deg, #4d64ff 0%, rgba(77, 100, 255, 0.8) 100%);
      color: white;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    button:hover {
      background: linear-gradient(135deg, #5d74ff 0%, rgba(77, 100, 255, 0.9) 100%);
      transform: translateY(-1px);
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
      opacity: 0.15;
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
              <p class="subtitle">Silently rendering 500 complex showcase components...</p>

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
        <swipe-notification>${comp.message}</swipe-notification>
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
    const componentsToGenerate = 500;
    const batchSize = 50; // Process in batches of 50

    const generateBatch = (batchIndex: number) => {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, componentsToGenerate);

      for (let i = start; i < end; i++) {
        this._components.push({
          id: i,
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
