import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { RippleFeature } from '../features/ripple-feature.js';

/**
 * SimpleButton - Tier 1 Demo Component
 * 
 * A minimal button demonstrating RippleFeature.
 * Shows "write once, use everywhere" concept.
 * 
 * @element simple-button
 */
@provide('Ripple', { class: RippleFeature })
export class SimpleButton extends LitCore {
  declare Ripple: RippleFeature;
  declare rippling: boolean;

  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      position: relative;
    }

    button {
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }

    button:active {
      transform: translateY(0);
    }
  `;

  override render(): TemplateResult {
    return html`
      <button>
        <slot>Click Me</slot>
      </button>
    `;
  }
}
