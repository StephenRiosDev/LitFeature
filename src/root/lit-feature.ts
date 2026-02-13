import type { LitCore } from './lit-core.ts';
import type { PropertyDeclaration } from 'lit';

/**
 * Base interface for feature configuration objects
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FeatureConfig {}

/**
 * Property definitions for a feature
 */
export interface FeatureProperties {
  [key: string]: PropertyDeclaration;
}

/**
 * Base class for all features in the system.
 * Features extend this class to add functionality to LitCore components.
 */
export class LitFeature<TConfig extends FeatureConfig = FeatureConfig> {
  host: LitCore;
  config: TConfig;
  
  private _propertyObservers: Map<string, unknown> = new Map();
  private _internalValues: Map<string, unknown> = new Map();

  /**
   * Static property definitions for this feature.
   * Override in subclasses to define reactive properties.
   */
  static properties: FeatureProperties = {};

  constructor(host: LitCore, config: TConfig) {
    this.host = host;
    this.config = config;
    this._litFeatureInit();
  }

  private _litFeatureInit(): void {
    const properties = (this.constructor as typeof LitFeature).properties;
    if (!properties) return;

    Object.entries(properties).forEach(([propertyName]) => {
      // Create observer for the property
      this._createPropertyObserver(propertyName);

      // Set the initial value from the feature or host
      const featureValue = (this as unknown as Record<string, unknown>)[propertyName];
      const hostValue = (this.host as unknown as Record<string, unknown>)[propertyName];
      this.setInternalValue(propertyName, featureValue ?? hostValue);
    });
  }

  private _createPropertyObserver(propertyName: string): void {
    const feature = this;
    Object.defineProperty(this, propertyName, {
      get() {
        return feature.getInternalValue(propertyName);
      },
      set(newValue: unknown) {
        (feature.host as unknown as Record<string, unknown>)[propertyName] = newValue;
        feature.setInternalValue(propertyName, newValue);
      }
    });
  }

  /**
   * Method to set internal value without triggering the setter
   */
  setInternalValue(propertyName: string, value: unknown): void {
    this._internalValues.set(propertyName, value);
  }

  /**
   * Method to get internal value
   */
  getInternalValue(propertyName: string): unknown {
    return this._internalValues.get(propertyName);
  }

  /**
   * Called after the host element's first update cycle
   */
  firstUpdated(_changedProperties?: Map<PropertyKey, unknown>): void {
    const properties = (this.constructor as typeof LitFeature).properties;
    if (!properties) return;

    Object.entries(properties).forEach(([propertyName]) => {
      if (properties[propertyName]) {
        this.setInternalValue(
          propertyName, 
          (this.host as unknown as Record<string, unknown>)[propertyName]
        );
      }
    });
  }

  /**
   * Called after the host element updates
   */
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    const properties = (this.constructor as typeof LitFeature).properties;
    if (!properties) return;

    Object.entries(properties).forEach(([propertyName]) => {
      if (changedProperties.has(propertyName)) {
        this.setInternalValue(
          propertyName,
          (this.host as unknown as Record<string, unknown>)[propertyName]
        );
      }
    });
  }

  // Lifecycle hooks that can be overridden by subclasses
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  beforeConnectedCallback?(): void;
  afterConnectedCallback?(): void;
  beforeDisconnectedCallback?(): void;
  afterDisconnectedCallback?(): void;
  beforeFirstUpdated?(changedProperties: Map<PropertyKey, unknown>): void;
  afterFirstUpdated?(changedProperties: Map<PropertyKey, unknown>): void;
  beforeUpdated?(changedProperties: Map<PropertyKey, unknown>): void;
  afterUpdated?(changedProperties: Map<PropertyKey, unknown>): void;
  beforeAttributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  afterAttributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
}
