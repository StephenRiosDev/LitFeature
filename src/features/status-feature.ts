import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

/**
 * Available message status types
 */
export type StatusType = 'info' | 'success' | 'warning' | 'error';

/**
 * Configuration for the StatusFeature
 */
export interface StatusConfig extends FeatureConfig {
  /** Default status when none is specified */
  defaultStatus?: StatusType;
  /** Show status icon */
  showIcon?: boolean;
}

/**
 * CSS class map for styles
 */
export interface StatusStyles {
  [className: string]: boolean;
}

/**
 * StatusFeature
 * 
 * Manages the visual status/severity of a message component.
 * Provides reactive properties for status type and computed style classes.
 * 
 * Features demonstrated:
 * - Reactive properties with reflection
 * - Config-driven defaults
 * - Computed property (statusStyles)
 * - Lifecycle hooks (updated)
 */
export class StatusFeature extends LitFeature<StatusConfig> {
  declare status: StatusType;
  declare showIcon: boolean;
  declare statusStyles: StatusStyles;

  /** Status icons as unicode characters (no dependencies) */
  private static readonly STATUS_ICONS: Record<StatusType, string> = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠',
    error: '✕'
  };

  static properties: FeatureProperties = {
    status: {
      type: String,
      attribute: 'status',
      reflect: true
    },
    showIcon: {
      type: Boolean,
      attribute: 'show-icon',
      reflect: true
    },
    statusStyles: {
      type: Object,
      attribute: false
    }
  };

  constructor(host: LitCore, config: StatusConfig) {
    super(host, config);
    console.log('[StatusFeature] constructor with config:', config);
    console.log('[StatusFeature] initial properties:', this.status, 'showIcon:', this.showIcon);
    // this.setInternalValue('status', config.defaultStatus ?? 'info');
    // this.setInternalValue('showIcon', config.showIcon ?? true);
    this.statusStyles = {};
    this._updateStatusStyles();
  }

  /**
   * Get the icon character for the current status
   */
  getStatusIcon(): string {
    return StatusFeature.STATUS_ICONS[this.status] || StatusFeature.STATUS_ICONS.info;
  }

  /**
   * Get CSS color variable for current status
   */
  getStatusColor(): string {
    const colors: Record<StatusType, string> = {
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336'
    };
    return colors[this.status] || colors.info;
  }

  /**
   * Update computed statusStyles whenever status changes
   */
  private _updateStatusStyles(): void {
    this.statusStyles = {
      'status-info': this.status === 'info',
      'status-success': this.status === 'success',
      'status-warning': this.status === 'warning',
      'status-error': this.status === 'error',
      'has-icon': this.showIcon
    };
  }

  firstUpdated(_changedProperties?: Map<PropertyKey, unknown>): void {
    super.firstUpdated();
    console.log('[StatusFeature] firstUpdated with status:', this.status, 'showIcon:', this.showIcon);
  }

  /**
   * Lifecycle: Update styles when properties change
   */
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('status') || changedProperties.has('showIcon')) {
      this._updateStatusStyles();
    }
  }

  /**
   * Lifecycle: Log when feature connects
   */
  connectedCallback(): void {
    console.log(`[StatusFeature] Connected with status: ${this.status}`);
  }
}
