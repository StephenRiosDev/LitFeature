import { LitElement, PropertyDeclaration } from 'lit';
import { FeatureManager, ProvidesRegistry, FeaturesRegistry, LitCoreConstructor } from './services/feature-manager.js';
import { resolveFeatureSnapshot } from './feature-resolver.js';

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
   * Lit reactive properties for this class.
   * We keep this in sync with feature snapshots in `finalize()`.
   */
  static properties: Record<string, PropertyDeclaration> = {};

  constructor() {
    super();
    this.featureManager = new FeatureManager(this, this.constructor as LitCoreConstructor);
  }

  /**
   * Lit's class finalization hook.
   * We override this to merge feature properties into the class properties map.
   */
  static finalize(): void {
    const ctor = this as unknown as LitCoreConstructor;
    const snapshot = resolveFeatureSnapshot(ctor);
    const superProps = (Object.getPrototypeOf(this) as typeof LitElement)?.properties || {};
    const ownProps = Object.prototype.hasOwnProperty.call(this, 'properties') ? this.properties : {};

    (this as unknown as { properties: Record<string, PropertyDeclaration> }).properties = {
      ...superProps,
      ...snapshot.properties,
      ...ownProps
    };

    super.finalize();
  }


  /**
   * Configuration for features this component wants to use.
   * Use 'disable' property to explicitly disable an inherited feature.
   */
  static configure: FeaturesRegistry;

  /**
   * Registry of features provided by this component/class.
   * Each feature should include a class reference and optional default configuration.
   */
  static provide: ProvidesRegistry;

  /**
   * Registers the component as a custom element with the browser.
   * Also resolves feature metadata for the class.
   */
  static register(componentName: string): void {
    const ctor = this as unknown as LitCoreConstructor;

    resolveFeatureSnapshot(ctor);
    customElements.define(componentName, ctor as unknown as CustomElementConstructor);
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
