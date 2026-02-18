import type { LitCore } from './lit-core.ts';
import type { PropertyDeclaration } from 'lit';
import type { ReactiveController } from 'lit';

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
export class LitFeature<TConfig extends FeatureConfig = FeatureConfig> implements ReactiveController {
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

    // Register as a controller so we get host lifecycle callbacks
    (this.host as any).addController?.(this);

    this._litFeatureInit();
  }

  private _litFeatureInit(): void {
    const properties = (this.constructor as typeof LitFeature).properties;
    if (!properties) return;

    // At construction time we only define proxy accessors on the feature.
    // Actual value reconciliation (host ↔ feature) happens in firstUpdated/updated
    // when the host has finished its own setup.
    Object.keys(properties).forEach(propertyName => {
      this._createPropertyObserver(propertyName);
    });
  }

  private _createPropertyObserver(propertyName: string): void {
    const feature = this;
    Object.defineProperty(this, propertyName, {
      configurable: true,
      enumerable: true,
      get() {
        return feature.getInternalValue(propertyName);
      },
      set(newValue: unknown) {
        const hostRecord = feature.host as unknown as Record<string, unknown>;
        const oldValue = hostRecord[propertyName];

        // Feature → host: write to Lit reactive property
        hostRecord[propertyName] = newValue;

        // Mirror into feature internal map
        feature.setInternalValue(propertyName, newValue);

        // Ensure Lit schedules an update
        if (typeof (feature.host as any).requestUpdate === 'function') {
          (feature.host as any).requestUpdate(propertyName, oldValue);
        }
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

  hostUpdated(): void {
    // console.log("hostUpdated called on", this.constructor.name); 
    // Intentionally empty: timing hook only.
    // Host → feature sync happens via LitCore.updated → FeatureManager.processLifecycle('updated', changedProperties)
    // which calls each feature's `updated(changedProperties)`.
  }

  /**
   * Called after the host element's first update cycle (legacy hook).
   * Kept for compatibility; you can prefer `hostUpdated` for controller-style usage.
   */
  firstUpdated(_changedProperties?: Map<PropertyKey, unknown>): void {

    const featureRecord = this as unknown as Record<string, unknown>;
    const hostRecord = this.host as unknown as Record<string, unknown>;

    (_changedProperties || new Map()).forEach((oldValue, propertyName) => {
      const hostValue = hostRecord[propertyName];
      const internalValue = this.getInternalValue(propertyName);

      if (hostValue !== undefined) {
        // Host wins: copy host value into feature internal via proxy setter
        (featureRecord as any)[propertyName] = hostValue;
      } else if (internalValue !== undefined) {
        // Feature default wins: push internal default out to host via proxy setter
        (featureRecord as any)[propertyName] = internalValue;
      } else {
        // Nothing set anywhere; just mirror whatever host currently has (likely undefined)
        this.setInternalValue(propertyName, hostValue);
      }
    });
  }

  /**
   * Called after the host element updates.
   * Sync host → feature only for properties that actually changed.
   */
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    const hostRecord = this.host as unknown as Record<string, unknown>;

    console.log(`updated called:`, '\n', `Feature: [${this.constructor.name}]`, '\n', `Host: ${this.host.constructor.name}`, '\n', `Changed Properties:`, changedProperties, '\n', `Instance:`, this.host);

    changedProperties.forEach((_oldValue, propertyName) => {
      this.setInternalValue(propertyName as string, hostRecord[propertyName as string]);
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
