import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

export interface FocusConfig extends FeatureConfig {
  makeHostFocusable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class FocusFeature extends LitFeature<FocusConfig> {
  declare hasFocus: boolean;

  static override properties: FeatureProperties = {
    hasFocus: { type: Boolean, attribute: 'hasFocus', reflect: true }
  };

  constructor(host: LitCore, config: FocusConfig) {
    super(host, config);
    this._init();
  }

  private _init(): void {
    this._setHostFocusable();
    this._setDefaults();
    this._addEventListeners();
  }

  private get _onFocusCallback(): () => void {
    return typeof this.config.onFocus === 'function' 
      ? this.config.onFocus 
      : () => {};
  }

  private get _onBlurCallback(): () => void {
    return typeof this.config.onBlur === 'function' 
      ? this.config.onBlur 
      : () => {};
  }

  private _setHostFocusable(): void {
    if (this.config.makeHostFocusable) {
      this.host.tabIndex = 0;
    }
  }

  private _addEventListeners(): void {
    this.host.addEventListener('focus', () => {
      this.hasFocus = true;
      this._onFocusCallback();
    });

    this.host.addEventListener('blur', () => {
      this.hasFocus = false;
      this._onBlurCallback();
    });
  }

  private _setDefaults(): void {
    this.hasFocus = false;
  }
}
