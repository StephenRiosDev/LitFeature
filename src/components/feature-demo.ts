import { html, TemplateResult } from 'lit';
import { CustomElement } from './custom-element.js';
import { FocusFeature } from '../features/focus-feature.js';
import { CounterFeature } from '../features/counter-feature.js';
import { LifecycleLoggerFeature } from '../features/lifecycle-logger-feature.js';
import { classMap } from 'lit/directives/class-map.js';
import { provide, feature } from '../root/decorators/index.js';

/**
 * <feature-demo-element>
 * 
 * This element demonstrates the full power of the feature system:
 * - Multiple features (layout, focus, counter, lifecycle logger)
 * - Feature configuration and property merging
 * - Disabling features and properties
 * - Lifecycle hooks
 * - Living documentation via code and comments
 * 
 * Usage:
 *   <feature-demo-element></feature-demo-element>
 */
@provide('Focus', { class: FocusFeature, config: { makeHostFocusable: false } })
@provide('Counter', { class: CounterFeature, config: { start: 5 } })
@provide('LifecycleLogger', { class: LifecycleLoggerFeature })
@feature('Layout', { 
  config: { layout: 'emphasized', shape: 'rounded', size: 'lg', onDark: false },
  properties: { onDark: 'disable' }
})
@feature('Focus', { 
  config: { 
    onFocus: () => console.log('Demo: Focused!'),
    onBlur: () => console.log('Demo: Blurred!'),
    makeHostFocusable: true 
  }
})
@feature('Counter', { config: { start: 10 } })
export class FeatureDemoElement extends CustomElement {
  // Declare feature instances and properties
  declare Focus: FocusFeature;
  declare Counter: CounterFeature;
  declare LifecycleLogger: LifecycleLoggerFeature;
  declare hasFocus: boolean;
  declare count: number;

  private renderLayoutClassic(): TemplateResult {
    return html`
      <div class="${classMap(this.layoutClasses || {})}">
        <p>Classic Layout</p>
      </div>
    `;
  }

  private renderLayoutEmphasized(): TemplateResult {
    return html`
      <div class="${classMap(this.layoutClasses || {})}">
        <p>Emphasized Layout</p>
      </div>
    `;
  }

  private renderers: Record<string, () => TemplateResult> = {
    classic: this.renderLayoutClassic.bind(this),
    emphasized: this.renderLayoutEmphasized.bind(this),
    default: this.renderLayoutClassic.bind(this)
  };

  private get layoutRenderer(): () => TemplateResult {
    return this.renderers[this.layout] || this.renderers['default'];
  }

  updateLayout(): void { 
    if (this.layout) {
      this.layout = this.layout === 'classic' ? 'emphasized' : 'classic';
    }
  }

  updateSize(): void { 
    if (this.size) {
      this.size = this.size === 'md' ? 'lg' : 'md';
    }
  }

  updateShape(): void { 
    if (this.shape) {
      this.shape = this.shape === 'pill' ? 'rounded' : 'pill';
    }
  }

  increment(): void { 
    this.Counter?.increment(); 
  }

  decrement(): void { 
    this.Counter?.decrement(); 
  }

  override updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('hasFocus')) {
      console.log(`Focus state changed: ${this.hasFocus}.`);
    }
    if (changedProperties.has('count')) {
      console.log(`Counter changed: ${this.count}.`);
    }
  }

  override renderLayout(): TemplateResult {
    return html`
      <h2>Feature System Demo</h2>
      <button @click="${this.updateLayout}">Toggle Layout</button>
      <button @click="${this.updateSize}">Toggle Size</button>
      <button @click="${this.updateShape}">Toggle Shape</button>
      <button @click="${this.increment}">Increment Counter</button>
      <button @click="${this.decrement}">Decrement Counter</button>
      ${this.layoutRenderer()}
      <p>
        <strong>Shape:</strong> ${this.shape}<br> 
        <strong>Size:</strong> ${this.size}<br> 
        <strong>Layout:</strong> ${this.layout}<br>
        <strong>Layout Classes:</strong> ${Object.keys(this.layoutClasses || {}).join(', ')}
      </p>
      <p>
        <strong>Focus state:</strong> ${this.hasFocus ? 'Focused' : 'Not Focused'}
      </p>
      <p>
        <strong>Counter:</strong> ${this.count}
      </p>
      <p>
        <em>Open the console to see lifecycle and feature logs.</em>
      </p>
    `;
  }
}

FeatureDemoElement.register('feature-demo-element');
