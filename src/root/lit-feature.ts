import type { LitCore } from './lit-core.ts';
import type { PropertyDeclaration } from 'lit';
import type { ReactiveController } from 'lit';
import { DebugUtils } from './debug-utils.js';

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
export abstract class LitFeature<TConfig extends FeatureConfig = FeatureConfig> implements ReactiveController {
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
    const featureName = this.constructor.name || 'UnnamedFeature';
    const hostName = host.constructor.name || 'UnknownHost';
    DebugUtils.logProperties('feature-constructor', `Constructing ${featureName} on host ${hostName}`);

    this.host = host;
    this.config = config;

    // Register as a controller so we get host lifecycle callbacks
    (this.host as any).addController?.(this);

    this._litFeatureInit();
  }

  private _litFeatureInit(): void {
    const featureName = this.constructor.name || 'UnnamedFeature';
    DebugUtils.logProperties('feature-init', `Initializing ${featureName} - setting up property observers`);

    const properties = (this.constructor as typeof LitFeature).properties;
    if (!properties) {
      DebugUtils.logProperties('feature-init-no-props', `  → ${featureName} has no properties to observe`);
      return;
    }

    const propNames = Object.keys(properties);
    DebugUtils.logProperties('feature-init-props-count', `  → ${featureName} has ${propNames.length} properties`, propNames);

    // At construction time we only define proxy accessors on the feature.
    // Actual value reconciliation (host ↔ feature) happens in firstUpdated/updated
    // when the host has finished its own setup.
    Object.keys(properties).forEach(propertyName => {
      DebugUtils.logProperties('feature-init-observer', `    → Creating property observer for: ${propertyName}`);
      this._createPropertyObserver(propertyName);
    });
  }

  private _createPropertyObserver(propertyName: string): void {
    const featureName = this.constructor.name || 'UnnamedFeature';
    DebugUtils.logProperties('property-observer-create', `Creating property descriptor for ${featureName}.${propertyName}`);

    const feature = this;
    Object.defineProperty(this, propertyName, {
      configurable: true,
      enumerable: true,
      get() {
        const value = feature.getInternalValue(propertyName);
        DebugUtils.logWiring('property-getter', `Getting ${featureName}.${propertyName}`, value);
        return value;
      },
      set(newValue: unknown) {
        const hostRecord = feature.host as unknown as Record<string, unknown>;
        const oldValue = hostRecord[propertyName];

        DebugUtils.logWiring('property-setter', `Setting ${featureName}.${propertyName}`, {
          oldValue,
          newValue,
          hostName: feature.host.constructor.name || 'UnknownHost'
        });

        // Feature → host: write to Lit reactive property
        hostRecord[propertyName] = newValue;
        DebugUtils.logWiring('property-to-host', `  → Synced to host property: ${propertyName}`, newValue);

        // Mirror into feature internal map
        feature.setInternalValue(propertyName, newValue);
        DebugUtils.logWiring('property-to-internal', `  → Mirrored to internal storage: ${propertyName}`);

        // Ensure Lit schedules an update
        if (typeof (feature.host as any).requestUpdate === 'function') {
          (feature.host as any).requestUpdate(propertyName, oldValue);
          DebugUtils.logWiring('property-request-update', `  → Requested update for: ${propertyName}`);
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

  /**
   * Called after the host element's first update cycle (legacy hook).
   * Kept for compatibility; you can prefer `hostUpdated` for controller-style usage.
   */
  firstUpdated(_changedProperties?: Map<PropertyKey, unknown>): void {
    const featureName = this.constructor.name || 'UnnamedFeature';
    const hostName = this.host.constructor.name || 'UnknownHost';
    
    DebugUtils.logWiring('first-updated-start', `First update phase for ${featureName} (host: ${hostName})`);

    const featureRecord = this as unknown as Record<string, unknown>;
    const hostRecord = this.host as unknown as Record<string, unknown>;

    (_changedProperties || new Map()).forEach((oldValue, propertyName) => {
      const hostValue = hostRecord[propertyName];
      const internalValue = this.getInternalValue(propertyName);

      DebugUtils.logWiring('first-updated-reconcile', `Reconciling property: ${propertyName as string}`, {
        hostValue,
        internalValue,
        oldValue
      });

      if (hostValue !== undefined) {
        // Host wins: copy host value into feature internal via proxy setter
        DebugUtils.logWiring('first-updated-host-wins', `  → Host value wins for ${propertyName as string}`);
        (featureRecord as any)[propertyName] = hostValue;
      } else if (internalValue !== undefined) {
        // Feature default wins: push internal default out to host via proxy setter
        DebugUtils.logWiring('first-updated-feature-wins', `  → Feature default wins for ${propertyName as string}`, internalValue);
        (featureRecord as any)[propertyName] = internalValue;
      } else {
        // Nothing set anywhere; just mirror whatever host currently has (likely undefined)
        DebugUtils.logWiring('first-updated-mirror', `  → No value set, mirroring undefined for ${propertyName as string}`);
        this.setInternalValue(propertyName, hostValue);
      }
    });

    DebugUtils.logWiring('first-updated-complete', `First update phase complete for ${featureName}`);
  }

  /**
   * Called after the host element updates.
   * Sync host → feature only for properties that actually changed.
   */
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    const featureName = this.constructor.name || 'UnnamedFeature';
    const hostName = this.host.constructor.name || 'UnknownHost';

    DebugUtils.logWiring('updated-start', `Update phase for ${featureName} (host: ${hostName})`);

    const hostRecord = this.host as unknown as Record<string, unknown>;

    changedProperties.forEach((_oldValue, propertyName) => {
      const newValue = hostRecord[propertyName as string];
      DebugUtils.logWiring('updated-sync', `Syncing changed property: ${propertyName as string}`, newValue);
      this.setInternalValue(propertyName as string, newValue);
    });

    DebugUtils.logWiring('updated-complete', `Update phase complete for ${featureName}`);
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
