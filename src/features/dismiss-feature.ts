import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

/**
 * Configuration for the DismissFeature
 */
export interface DismissConfig extends FeatureConfig {
  /** Whether dismissal is enabled */
  dismissible?: boolean;
  /** Callback before dismiss (return false to prevent) */
  onBeforeDismiss?: () => boolean | void;
  /** Callback after dismiss completes */
  onDismiss?: () => void;
  /** Label for dismiss button (accessibility) */
  dismissLabel?: string;
}

/**
 * DismissFeature
 * 
 * Provides dismissal functionality with callbacks and events.
 * Works with VisibilityFeature when available.
 * 
 * Features demonstrated:
 * - Feature-to-feature communication
 * - Preventable actions via callbacks
 * - beforeDisconnectedCallback lifecycle
 * - Custom events with composed: true
 */
export class DismissFeature extends LitFeature<DismissConfig> {
  declare dismissible: boolean;
  declare dismissed: boolean;

  private _onBeforeDismiss?: () => boolean | void;
  private _onDismiss?: () => void;
  private _dismissLabel: string;

  static properties: FeatureProperties = {
    dismissible: {
      type: Boolean,
      attribute: 'dismissible',
      reflect: true
    },
    dismissed: {
      type: Boolean,
      attribute: 'dismissed',
      reflect: true
    }
  };

  constructor(host: LitCore, config: DismissConfig) {
    super(host, config);
    this.dismissible = config.dismissible ?? true;
    this.dismissed = false;
    this._onBeforeDismiss = config.onBeforeDismiss;
    this._onDismiss = config.onDismiss;
    this._dismissLabel = config.dismissLabel ?? 'Dismiss';
  }

  /**
   * Get the dismiss button label
   */
  getDismissLabel(): string {
    return this._dismissLabel;
  }

  /**
   * Attempt to dismiss the component
   * @returns true if dismissal was successful
   */
  dismiss(): boolean {
    if (!this.dismissible || this.dismissed) {
      return false;
    }

    // Call before callback - can prevent dismissal
    const shouldProceed = this._onBeforeDismiss?.();
    if (shouldProceed === false) {
      return false;
    }

    // Check if we have a Visibility feature to animate
    const visibilityFeature = (this.host as unknown as { Visibility?: { hide: () => void } }).Visibility;
    
    if (visibilityFeature) {
      // Use Visibility feature's hide for animation
      visibilityFeature.hide();
      // Wait for animation then complete dismissal
      setTimeout(() => this._completeDismiss(), 300);
    } else {
      this._completeDismiss();
    }

    return true;
  }

  private _completeDismiss(): void {
    this.dismissed = true;
    this._onDismiss?.();
    
    this.host.dispatchEvent(
      new CustomEvent('dismissed', {
        detail: { dismissed: true },
        bubbles: true,
        composed: true
      })
    );
  }
}
