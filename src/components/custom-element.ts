import { TemplateResult } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { LayoutFeature, LayoutClasses } from '../features/layout-feature.js';
import type { ProvidesRegistry } from '../root/services/feature-manager.js';

export class CustomElement extends LitCore {
  // Declare layout feature properties that will be available on the host
  declare layout: string;
  declare shape: string;
  declare size: string;
  declare layoutClasses: LayoutClasses;
  declare Layout: LayoutFeature;

  static override get provides(): ProvidesRegistry {
    return {
      Layout: {
        class: LayoutFeature
      }
    };
  }

  /** 
   * Use this to define the layout of the component.
   * This method should be overridden in extending classes to provide the specific layout.
   */
  renderLayout(): TemplateResult | void {}

  /**
   * Render the layout for the component.
   * Do not override this method in extending classes.
   */
  override render(): TemplateResult | void {
    try {
      return this.renderLayout();
    } catch (error) {
      console.error('Failed to get the defined layout - using the default layout', error);
      return this.getLayout('default');
    }
  }

  /**
   * Get a specific layout by name. Override in subclasses to provide layout implementations.
   */
  protected getLayout(_name: string): TemplateResult | void {
    return undefined;
  }
}
