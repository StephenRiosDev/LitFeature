import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import './notification-demo.js';

/**
 * DemoPage Component
 * 
 * Wrapper for the notification demo
 */
@customElement('demo-page')
export class DemoPage extends HTMLElement {
  override connectedCallback(): void {
    this.innerHTML = '<notification-demo></notification-demo>';
  }

  override render(): TemplateResult {
    return html`<notification-demo></notification-demo>`;
  }
}
