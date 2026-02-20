import { css } from 'lit';
import { AutoDismissFeature, AutoDismissConfig } from './auto-dismiss-feature.js';
import type { LitCore } from '../root/lit-core.js';
import { property } from '../root/decorators/feature-property.js';

/**
 * Configuration for SwipeDismissFeature
 */
export interface SwipeDismissConfig extends AutoDismissConfig {
  /** Enable swipe to dismiss */
  swipeToDismiss?: boolean;
  /** Swipe threshold in pixels */
  swipeThreshold?: number;
}

/**
 * SwipeDismissFeature - Tier 3 Example (Doubly Extended)
 * 
 * Extends AutoDismissFeature with swipe gesture support.
 * Demonstrates multiple levels of feature inheritance.
 */
export class SwipeDismissFeature extends AutoDismissFeature {
  @property({ type: Boolean, attribute: 'swipe-to-dismiss' })
  swipeToDismiss: boolean;

  @property({ type: Number, attribute: 'swipe-threshold' })
  swipeThreshold: number;

  @property({ type: Number, attribute: false })
  swipeOffset = 0;

  private _startX = 0;
  private _startY = 0;
  private _isDragging = false;

  static styles = css`
    .notification {
      cursor: grab;
      user-select: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .notification:active {
      cursor: grabbing;
      box-shadow: 0 6px 16px rgba(79, 172, 254, 0.4);
    }

    .dismiss-btn {
      z-index: 10;
    }
  `;

  constructor(host: LitCore, config: SwipeDismissConfig) {
    super(host, config);
    this.swipeToDismiss = config.swipeToDismiss ?? true;
    this.swipeThreshold = config.swipeThreshold || 100;
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('swipeToDismiss')) {
      if (this.swipeToDismiss) {
        this._attachSwipeListeners();
      } else {
        this._detachSwipeListeners();
      }
    }
  }

  /**
   * Setup swipe listeners
   */
  override connectedCallback(): void {
    super.connectedCallback();
    
    if (this.swipeToDismiss) {
      this._attachSwipeListeners();
    }
  }

  /**
   * Cleanup swipe listeners
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this._detachSwipeListeners();
  }

  /**
   * Override dismiss to include swipe source
   */
  protected override _dispatchDismissed(): void {
    const source = this._isDragging ? 'swipe' : 'auto';
    this.host.dispatchEvent(
      new CustomEvent('dismissed', {
        bubbles: true,
        composed: true,
        detail: {
          source,
          swipeDistance: this.swipeOffset
        }
      })
    );
  }

  setSwipeEnabled(enabled: boolean): void {
    this.swipeToDismiss = enabled;
  }

  private _handleTouchStart = (e: TouchEvent) => {
    this._startX = e.touches[0].clientX;
    this._startY = e.touches[0].clientY;
    this._isDragging = true;
  };

  private _handleTouchMove = (e: TouchEvent) => {
    if (!this._isDragging) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - this._startX;
    const deltaY = Math.abs(currentY - this._startY);

    // Only track horizontal swipes
    if (deltaY < 30) {
      this.swipeOffset = deltaX;
      (this.host as HTMLElement).style.transform = `translateX(${deltaX}px)`;
      e.preventDefault();
    }
  };

  private _handleTouchEnd = () => {
    if (Math.abs(this.swipeOffset) >= this.swipeThreshold) {
      super.dismiss();
    } else {
      this._resetSwipe();
    }
    this._isDragging = false;
  };

  private _handleMouseDown = (e: MouseEvent) => {
    this._startX = e.clientX;
    this._startY = e.clientY;
    this._isDragging = true;
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
  };

  private _handleMouseMove = (e: MouseEvent) => {
    if (!this._isDragging) return;

    const deltaX = e.clientX - this._startX;
    const deltaY = Math.abs(e.clientY - this._startY);

    if (deltaY < 30) {
      this.swipeOffset = deltaX;
      (this.host as HTMLElement).style.transform = `translateX(${deltaX}px)`;
    }
  };

  private _handleMouseUp = () => {
    if (Math.abs(this.swipeOffset) >= this.swipeThreshold) {
      super.dismiss();
    } else {
      this._resetSwipe();
    }
    this._isDragging = false;
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  };

  private _resetSwipe(): void {
    this.swipeOffset = 0;
    (this.host as HTMLElement).style.transform = '';
  }

  private _attachSwipeListeners(): void {
    this.host.addEventListener('touchstart', this._handleTouchStart, { passive: true });
    this.host.addEventListener('touchmove', this._handleTouchMove, { passive: false });
    this.host.addEventListener('touchend', this._handleTouchEnd);
    this.host.addEventListener('mousedown', this._handleMouseDown);
  }

  private _detachSwipeListeners(): void {
    this.host.removeEventListener('touchstart', this._handleTouchStart);
    this.host.removeEventListener('touchmove', this._handleTouchMove);
    this.host.removeEventListener('touchend', this._handleTouchEnd);
    this.host.removeEventListener('mousedown', this._handleMouseDown);
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  }
}
