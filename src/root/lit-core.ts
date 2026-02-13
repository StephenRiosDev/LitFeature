import { LitElement, PropertyDeclaration } from 'lit';
import { FeatureManager, ProvidesRegistry, FeaturesRegistry, LitCoreConstructor } from './services/feature-manager.js';

/**
 * Base class for web components with feature management capabilities.
 * Provides a feature system that allows components to inherit, configure, and extend
 * functionality through a composable architecture.
 */
export class LitCore extends LitElement {
  /**
   * Instance of the FeatureManager that handles feature registration,
   * lifecycle management, and property merging.
   */
  featureManager: FeatureManager;

  /**
   * Holds feature-defined properties. This static property is populated
   * by the FeatureManager when features are prepared during component registration.
   */
  static _featureProperties: Record<string, PropertyDeclaration> = {};

  /**
   * Flag to track if features have been initialized for this class
   */
  static _featuresInitialized = false;

  constructor() {
    super();
    this.featureManager = new FeatureManager(this, this.constructor as LitCoreConstructor);
  }

  /**
   * Combined properties from both direct class definition and features.
   * Base properties take precedence over feature properties when merged.
   */
  static get properties(): Record<string, PropertyDeclaration> {
    const baseProperties = (Object.getPrototypeOf(this) as typeof LitCore).properties || {};
    const featureProperties = this._featureProperties || {};

    return {
      ...featureProperties,
      ...baseProperties
    };
  }

  /**
   * Configuration for features this component wants to use.
   * Use 'disable' property to explicitly disable an inherited feature.
   */
  static get configure(): FeaturesRegistry {
    return {};
  }

  /**
   * Registry of features provided by this component/class.
   * Each feature should include a class reference and optional default configuration.
   */
  static get provide(): ProvidesRegistry {
    return {};
  }

  /**
   * Registers the component as a custom element with the browser.
   * Also ensures all features are prepared before the component is instantiated.
   */
  static register(componentName: string): void {
    FeatureManager.prepareFeatures(this as unknown as LitCoreConstructor);
    customElements.define(componentName, this);
  }

  connectedCallback(): void {
    this.featureManager.processLifecycle('beforeConnectedCallback');
    super.connectedCallback();
    this.featureManager.processLifecycle('connectedCallback');
    this.featureManager.processLifecycle('afterConnectedCallback');
  }

  disconnectedCallback(): void {
    this.featureManager.processLifecycle('beforeDisconnectedCallback');
    this.featureManager.processLifecycle('disconnectedCallback');
    super.disconnectedCallback();
    this.featureManager.processLifecycle('afterDisconnectedCallback');
  }

  firstUpdated(changedProperties: Map<PropertyKey, unknown>): void {
    this.featureManager.processLifecycle('beforeFirstUpdated', changedProperties);
    super.firstUpdated(changedProperties);
    this.featureManager.processLifecycle('firstUpdated', changedProperties);
    this.featureManager.processLifecycle('afterFirstUpdated', changedProperties);
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    this.featureManager.processLifecycle('beforeUpdated', changedProperties);
    super.updated(changedProperties);
    this.featureManager.processLifecycle('updated', changedProperties);
    this.featureManager.processLifecycle('afterUpdated', changedProperties);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    this.featureManager.processLifecycle('beforeAttributeChangedCallback', name, oldValue, newValue);
    super.attributeChangedCallback(name, oldValue, newValue);
    this.featureManager.processLifecycle('attributeChangedCallback', name, oldValue, newValue);
    this.featureManager.processLifecycle('afterAttributeChangedCallback', name, oldValue, newValue);
  }
}
