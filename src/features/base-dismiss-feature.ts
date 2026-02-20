import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';
import { property } from '../root/decorators/feature-property.js';

/**
 * Configuration for BaseDismissFeature
 */
export interface BaseDismissConfig extends FeatureConfig {
  /** Whether the element can be dismissed */
  dismissible?: boolean;
  /** Accessibility label for dismiss button */
  dismissLabel?: string;
}

/**
 * BaseDismissFeature - Tier 3 Example (Foundation)
 * 
 * Base feature for manual dismissal functionality.
 * Can be extended by other dismiss features.
 */
export class BaseDismissFeature extends LitFeature<BaseDismissConfig> {
  @property({ type: Boolean, reflect: true })
  dismissible: boolean;

  @property({ type: Boolean, reflect: true })
  dismissed = false;

  static properties: FeatureProperties = {
    dismissLabel: {
      type: String,
      attribute: 'dismiss-label'
    }
  };

  declare dismissLabel: string;

  constructor(host: LitCore, config: BaseDismissConfig) {
    super(host, config);
    this.dismissible = config.dismissible ?? true;
    this.dismissLabel = config.dismissLabel || 'Dismiss';
  }

  /**
   * Manually dismiss the element
   */
  dismiss(): void {
    if (!this.dismissible || this.dismissed) return;
    
    this.dismissed = true;
    this._dispatchDismissed();
  }

  /**
   * Reset dismissed state
   */
  reset(): void {
    this.dismissed = false;
  }

  /**
   * Dispatch dismissed event
   */
  protected _dispatchDismissed(): void {
    this.host.dispatchEvent(
      new CustomEvent('dismissed', {
        bubbles: true,
        composed: true,
        detail: { source: 'manual' }
      })
    );
  }
}
