import { LitElement, PropertyDeclaration } from 'lit';
import { FeatureManager, ProvidesRegistry, FeaturesRegistry, LitCoreConstructor } from './services/feature-manager.js';
import { FeatureSnapshot } from './types/feature-types.js';

/**
 * Global queue for deferred component registration
 * This ensures all decorators are applied before any finalization happens
 */
const REGISTRATION_QUEUE: Array<{ ctor: LitCoreConstructor; name: string }> = [];
let REGISTRATION_SCHEDULED = false;

/**
 * Schedule deferred registration processing
 */
function scheduleRegistration() {
  if (REGISTRATION_SCHEDULED) return;
  REGISTRATION_SCHEDULED = true;

  // Use queueMicrotask to defer until after all current event loop tasks complete
  // This gives all decorators time to run
  queueMicrotask(() => {
    processRegistrationQueue();
  });
}

/**
 * Process all queued registrations in order
 */
function processRegistrationQueue() {
  console.log(`[Registration] Processing ${REGISTRATION_QUEUE.length} queued components`);
  
  while (REGISTRATION_QUEUE.length > 0) {
    const { ctor, name } = REGISTRATION_QUEUE.shift()!;
    console.log(`[Registration] Finalizing and registering ${ctor.name} as <${name}>`);
    
    // Now finalize and register
    LitCore._finalizeAndRegister(ctor, name);
  }
}

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

  /**
   * Immutable snapshot of features for this class.
   */
  static _featureSnapshot?: FeatureSnapshot;

  constructor() {
    super();
    this.featureManager = new FeatureManager(this, this.constructor as LitCoreConstructor);
  }

  /**
   * Lit's class finalization hook.
   * We override this to defer execution until after all decorators have run.
   */
  static finalize(): void {
    const ctor = this as unknown as LitCoreConstructor;

    // Only run if explicitly called via _finalizeAndRegister
    // Prevent Lit from auto-finalizing before decorators complete
    if (!(ctor as any)._explicitFinalize) {
      console.log(`[LitCore.finalize] Skipping auto-finalize for ${ctor.name}, deferring to register()`);
      return;
    }

    console.log(`[LitCore.finalize] Running explicit finalization for ${ctor.name}`);

    // Ensure parent is finalized first
    const parent = Object.getPrototypeOf(ctor) as LitCoreConstructor | null;
    if (parent && parent !== LitElement && parent.name !== 'LitElement' && parent.name !== 'LitCore') {
      if (!(parent as any)._explicitFinalize) {
        (parent as any)._explicitFinalize = true;
        parent.finalize();
      }
    }

    // Now prepare features for this class
    FeatureManager.prepareFeatures(ctor);

    const snapshotProps = ctor._featureSnapshot?.properties ?? {};
    const baseProps = this.hasOwnProperty('properties') ? this.properties : {};

    const merged: Record<string, PropertyDeclaration> = {
      ...snapshotProps,
      ...baseProps,
    };

    (this as any).properties = merged;

    console.log(`[LitCore.finalize] ${this.name} feature snapshot properties:`, Object.keys(snapshotProps));

    // Call Lit's finalization
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
   * Internal method called after all decorators have completed
   * Finalizes features and registers the custom element.
   *
   * This walks the ENTIRE inheritance chain and ensures each class
   * has its finalize() called so that getInheritedDecoratorProvides
   * and getInheritedDecoratorConfigurations run at EACH level.
   */
  private static _finalizeAndRegister(ctor: LitCoreConstructor, name: string): void {
    // Collect the full inheritance chain from base to current
    const chain: LitCoreConstructor[] = [];
    let current: LitCoreConstructor | null = ctor;
    
    while (current && current.name !== 'LitElement') {
      chain.unshift(current); // Add to front (bottom-up)
      current = Object.getPrototypeOf(current) as LitCoreConstructor | null;
    }

    console.log(`[Registration] Finalization chain for ${ctor.name}:`, chain.map(c => c.name).join(' → '));

    // Now finalize EACH class in the chain from base to derived
    // This ensures getInheritedDecoratorProvides is called at each level
    for (const cls of chain) {
      if (!cls._featureSnapshot) {
        console.log(`[Registration] Calling finalize() on ${cls.name}`);
        (cls as any)._explicitFinalize = true;
        cls.finalize();
      }
    }

    // Register with browser
    customElements.define(name, ctor as any);
  }

  /**
   * Registers the component as a custom element with the browser.
   * Queues the registration to occur after all decorators have completed.
   */
  static register(componentName: string): void {
    const ctor = this as unknown as LitCoreConstructor;

    console.log(`[Registration] Queuing ${ctor.name} as <${componentName}>`);

    // Add to queue
    REGISTRATION_QUEUE.push({ ctor, name: componentName });

    // Schedule processing of queue
    scheduleRegistration();
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
