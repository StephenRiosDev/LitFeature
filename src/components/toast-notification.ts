import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { provide, configure } from '../root/decorators/index.js';
import { AlertBox } from './alert-box.js';
import { TimerFeature } from '../features/timer-feature.js';
import { state } from 'lit/decorators.js';

/**
 * ToastNotification (Level 4)
 * 
 * Extends AlertBox with auto-dismiss timer functionality.
 * Shows a countdown progress bar and auto-dismisses after duration.
 * 
 * HIERARCHY: MessageBase → MessageBox → AlertBox → ToastNotification
 * INHERITS: StatusFeature, VisibilityFeature, DismissFeature
 * PROVIDES: TimerFeature
 * CONFIGURES: All parent features
 * 
 * This component demonstrates the full feature inheritance chain:
 * - StatusFeature: Controls color/icon (configured to 'info')
 * - VisibilityFeature: Handles show/hide transitions
 * - DismissFeature: Provides manual close button
 * - TimerFeature: Auto-dismisses after countdown
 * 
 * @element toast-notification
 * @attr {number} duration - Auto-dismiss duration in milliseconds
 * @fires timer-complete - When the countdown finishes
 * @fires dismissed - When the toast is dismissed (manual or auto)
 */
@provide('Timer', {
  class: TimerFeature,
  config: {
    duration: 5000,
    autoStart: true,
    autoDismiss: true
  }
})
@configure('Status', {
  config: {
    defaultStatus: 'info',
    showIcon: true
  }
})
@configure('Visibility', {
  config: {
    initiallyVisible: true,
    transitionDuration: 300,
    onVisibilityChange: (visible: boolean) => {
      console.log(`[ToastNotification] Visibility: ${visible}`);
    }
  }
})
@configure('Dismiss', {
  config: {
    dismissible: true,
    onDismiss: () => {
      console.log('[ToastNotification] Dismissed');
    }
  }
})
export class ToastNotification extends AlertBox {
  // Feature instance
  declare Timer: TimerFeature;
  
  // Properties from TimerFeature
  declare duration: number;
  declare remaining: number;
  declare progress: number;
  declare running: boolean;
  declare paused: boolean;

  // Internal state for progress bar updates
  @state()
  private _progressPercent: number = 0;

  static override styles: CSSResultGroup = [
    AlertBox.styles as CSSResultGroup,
    css`
      :host {
        --toast-max-width: 400px;
      }

      .toast {
        position: relative;
        max-width: var(--toast-max-width);
        overflow: hidden;
      }

      /* Progress bar at bottom */
      .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: currentColor;
        opacity: 0.5;
        transition: width 0.1s linear;
      }

      /* Timer controls */
      .timer-info {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        opacity: 0.8;
        margin-top: 8px;
      }

      .timer-remaining {
        font-variant-numeric: tabular-nums;
      }

      .timer-controls {
        display: flex;
        gap: 4px;
      }

      .timer-button {
        background: none;
        border: 1px solid currentColor;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 10px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.2s;
      }

      .timer-button:hover {
        opacity: 1;
      }

      /* Paused state visual */
      .toast.paused .progress-bar {
        opacity: 0.3;
      }
    `
  ];

  constructor() {
    super();
    this._progressPercent = 0;
  }

  /**
   * Pause the auto-dismiss timer (e.g., on hover)
   */
  pauseTimer(): void {
    this.Timer?.pause();
  }

  /**
   * Resume the auto-dismiss timer
   */
  resumeTimer(): void {
    this.Timer?.resume();
  }

  /**
   * Reset and restart the timer
   */
  resetTimer(): void {
    this.Timer?.reset();
    this.Timer?.start();
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Update progress on each frame
    this._startProgressTracking();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private _startProgressTracking(): void {
    const updateProgress = () => {
      if (this.Timer) {
        this._progressPercent = (1 - this.Timer.progress) * 100;
      }
      if (!this.dismissed) {
        requestAnimationFrame(updateProgress);
      }
    };
    requestAnimationFrame(updateProgress);
  }

  private _handleMouseEnter(): void {
    this.pauseTimer();
  }

  private _handleMouseLeave(): void {
    this.resumeTimer();
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
    const progressWidth = `${this._progressPercent}%`;
    
    return html`
      <div 
        class="message message-box alert-box toast ${statusClass} ${this.transitioning ? 'transitioning' : ''} ${this.paused ? 'paused' : ''}"
        style="${transitionStyle}"
        role="alert"
        aria-live="polite"
        @mouseenter=${() => this._handleMouseEnter()}
        @mouseleave=${() => this._handleMouseLeave()}
      >
        ${this.showIcon ? html`
          <span class="message-icon">${this.Status?.getStatusIcon()}</span>
        ` : null}
        <div class="message-content">
          ${this.renderContent()}
          <div class="timer-info">
            <span class="timer-remaining">
              ${this.paused ? '⏸' : ''} ${this.Timer?.getFormattedRemaining()}
            </span>
            <div class="timer-controls">
              ${this.paused 
                ? html`<button class="timer-button" @click=${() => this.resumeTimer()}>Resume</button>`
                : html`<button class="timer-button" @click=${() => this.pauseTimer()}>Pause</button>`
              }
              <button class="timer-button" @click=${() => this.resetTimer()}>Reset</button>
            </div>
          </div>
        </div>
        ${this.dismissible ? html`
          <button 
            class="dismiss-button"
            @click=${() => this.Dismiss?.dismiss()}
            aria-label="${this.Dismiss?.getDismissLabel()}"
            type="button"
          >×</button>
        ` : null}
        <div class="progress-bar" style="width: ${progressWidth}"></div>
      </div>
    `;
  }
}

// Register the component
ToastNotification.register('toast-notification');
