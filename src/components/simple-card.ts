import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { RippleFeature } from '../features/ripple-feature.js';

/**
 * SimpleCard - Tier 1 Demo Component
 * 
 * A minimal card demonstrating RippleFeature.
 * Same feature, different component type.
 * 
 * @element simple-card
 */
@provide('Ripple', { class: RippleFeature })
export class SimpleCard extends LitCore {
  declare Ripple: RippleFeature;
  declare rippling: boolean;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      position: relative;
    }

    .card {
      padding: 24px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #333;
    }

    .card-content {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="card">
        <h3 class="card-title"><slot name="title">Card Title</slot></h3>
        <div class="card-content"><slot>Card content goes here.</slot></div>
      </div>
    `;
  }
}
