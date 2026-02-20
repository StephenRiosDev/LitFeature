import { html, TemplateResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './showcase-demo.js';

/**
 * DemoPage Component
 * 
 * Wrapper for the showcase demo
 */
@customElement('demo-page')
export class DemoPage extends LitElement {
  override render(): TemplateResult {
    return html`<showcase-demo></showcase-demo>`;
  }
}
