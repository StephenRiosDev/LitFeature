import { LitFeature, FeatureProperties, FeatureConfig } from '../root/lit-feature.js';
import type { LitCore } from '../root/lit-core.js';

export interface LayoutConfig extends FeatureConfig {
  layout?: string;
  shape?: string;
  size?: string;
  onDark?: boolean;
}

export interface LayoutClasses {
  [className: string]: boolean;
}

export class LayoutFeature extends LitFeature<LayoutConfig> {
  declare layout: string;
  declare shape: string;
  declare size: string;
  declare onDark: boolean;
  declare layoutClasses: LayoutClasses;

  static override properties: FeatureProperties = {
    layout: {
      type: String,
      attribute: 'layout',
      reflect: true
    },
    shape: {
      type: String,
      attribute: 'shape',
      reflect: true
    },
    size: {
      type: String,
      attribute: 'size',
      reflect: true
    },
    onDark: {
      type: Boolean,
      attribute: 'ondark',
      reflect: true
    },
    layoutClasses: {
      type: Object,
      attribute: false,
      reflect: false
    }
  };

  constructor(host: LitCore, config: LayoutConfig) {
    super(host, config);
    this.layout = config.layout ?? 'classic';
    this.shape = config.shape ?? 'pill';
    this.size = config.size ?? 'md';
    this.onDark = config.onDark ?? false;
    this.layoutClasses = {};

    this.updateComponentArchitecture();
  }

  updateShapeClasses(): void {
    const updatedClasses: LayoutClasses = { ...this.layoutClasses };
    
    Object.keys(updatedClasses).forEach(className => {
      if (className.startsWith('shape-')) {
        delete updatedClasses[className];
      }
    });

    if (this.shape && this.size) {
      updatedClasses[`shape-${this.shape.toLowerCase()}-${this.size.toLowerCase()}`] = true;
    } else {
      updatedClasses['shape-none'] = true;
    }

    this.layoutClasses = updatedClasses;
  }

  updateLayoutClasses(): void {
    if (this.layout) {
      const updatedClasses: LayoutClasses = { ...this.layoutClasses };
      
      Object.keys(updatedClasses).forEach(className => {
        if (className.startsWith('layout-')) {
          delete updatedClasses[className];
        }
      });

      updatedClasses[`layout-${this.layout.toLowerCase()}`] = true;
      
      this.layoutClasses = updatedClasses;
    }
  }

  updateComponentArchitecture(): void {
    this.updateLayoutClasses();
    this.updateShapeClasses();
  }

  override updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('layout') || changedProperties.has('shape') || changedProperties.has('size')) {
      this.updateComponentArchitecture();
    }
  }
}
