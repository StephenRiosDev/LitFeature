import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

/**
 * Configuration for the TimerFeature
 */
export interface TimerConfig extends FeatureConfig {
  /** Duration in milliseconds before auto-action */
  duration?: number;
  /** Whether to start timer automatically */
  autoStart?: boolean;
  /** Whether to auto-dismiss when timer completes */
  autoDismiss?: boolean;
  /** Callback when timer completes */
  onTimerComplete?: () => void;
  /** Callback for progress updates (0-1) */
  onProgress?: (progress: number) => void;
}

/**
 * TimerFeature
 * 
 * Provides countdown timer functionality with progress tracking.
 * Integrates with DismissFeature for auto-dismissal.
 * 
 * Features demonstrated:
 * - Complex state management (timer)
 * - beforeConnectedCallback lifecycle
 * - afterConnectedCallback for deferred initialization
 * - Resource cleanup in disconnectedCallback
 * - Feature-to-feature communication
 */
export class TimerFeature extends LitFeature<TimerConfig> {
  declare duration: number;
  declare remaining: number;
  declare progress: number;
  declare running: boolean;
  declare paused: boolean;

  private _timerId: number | null = null;
  private _startTime: number = 0;
  private _pausedAt: number = 0;
  private _autoStart: boolean;
  private _autoDismiss: boolean;
  private _onTimerComplete?: () => void;
  private _onProgress?: (progress: number) => void;

  static properties: FeatureProperties = {
    duration: {
      type: Number,
      attribute: 'duration',
      reflect: true
    },
    remaining: {
      type: Number,
      attribute: false
    },
    progress: {
      type: Number,
      attribute: false
    },
    running: {
      type: Boolean,
      attribute: false
    },
    paused: {
      type: Boolean,
      attribute: false
    }
  };

  constructor(host: LitCore, config: TimerConfig) {
    super(host, config);
    this.duration = config.duration ?? 5000;
    this.remaining = this.duration;
    this.progress = 0;
    this.running = false;
    this.paused = false;
    this._autoStart = config.autoStart ?? true;
    this._autoDismiss = config.autoDismiss ?? true;
    this._onTimerComplete = config.onTimerComplete;
    this._onProgress = config.onProgress;
  }

  /**
   * Start the countdown timer
   */
  start(): void {
    if (this.running && !this.paused) return;

    this.running = true;
    this.paused = false;
    this._startTime = Date.now() - (this.duration - this.remaining);
    
    this._tick();
    console.log(`[TimerFeature] Timer started, ${this.duration}ms`);
  }

  /**
   * Pause the timer
   */
  pause(): void {
    if (!this.running || this.paused) return;

    this.paused = true;
    this._pausedAt = Date.now();
    
    if (this._timerId !== null) {
      cancelAnimationFrame(this._timerId);
      this._timerId = null;
    }
    
    console.log(`[TimerFeature] Timer paused at ${this.remaining}ms`);
  }

  /**
   * Resume a paused timer
   */
  resume(): void {
    if (!this.paused) return;

    const pauseDuration = Date.now() - this._pausedAt;
    this._startTime += pauseDuration;
    this.paused = false;
    
    this._tick();
    console.log('[TimerFeature] Timer resumed');
  }

  /**
   * Reset the timer to initial state
   */
  reset(): void {
    this.stop();
    this.remaining = this.duration;
    this.progress = 0;
    console.log('[TimerFeature] Timer reset');
  }

  /**
   * Stop the timer completely
   */
  stop(): void {
    this.running = false;
    this.paused = false;
    
    if (this._timerId !== null) {
      cancelAnimationFrame(this._timerId);
      this._timerId = null;
    }
  }

  /**
   * Get formatted time remaining (e.g., "3.2s")
   */
  getFormattedRemaining(): string {
    const seconds = Math.ceil(this.remaining / 1000);
    return `${seconds}s`;
  }

  private _tick(): void {
    const elapsed = Date.now() - this._startTime;
    this.remaining = Math.max(0, this.duration - elapsed);
    this.progress = Math.min(1, elapsed / this.duration);
    
    this._onProgress?.(this.progress);

    if (this.remaining <= 0) {
      this._complete();
    } else {
      this._timerId = requestAnimationFrame(() => this._tick());
    }
  }

  private _complete(): void {
    this.running = false;
    this.remaining = 0;
    this.progress = 1;
    
    this._onTimerComplete?.();
    
    this.host.dispatchEvent(
      new CustomEvent('timer-complete', {
        detail: { duration: this.duration },
        bubbles: true,
        composed: true
      })
    );

    console.log('[TimerFeature] Timer complete');

    // Auto-dismiss if configured
    if (this._autoDismiss) {
      const dismissFeature = (this.host as unknown as { Dismiss?: { dismiss: () => void } }).Dismiss;
      dismissFeature?.dismiss();
    }
  }

  /**
   * Lifecycle: Prepare before connection
   */
  beforeConnectedCallback(): void {
    console.log('[TimerFeature] Preparing timer...');
  }

  /**
   * Lifecycle: Auto-start after connection
   */
  afterConnectedCallback(): void {
    if (this._autoStart) {
      // Defer start to allow other features to initialize
      requestAnimationFrame(() => {
        this.start();
      });
    }
  }

  /**
   * Lifecycle: Clean up resources
   */
  disconnectedCallback(): void {
    this.stop();
    console.log('[TimerFeature] Disconnected, timer cleaned up');
  }
}
