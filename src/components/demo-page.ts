import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './showcase-demo.js';

/**
 * DemoPage Component
 * 
 * Wrapper for the showcase demo with header
 */
@customElement('demo-page')
export class DemoPage extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      width: 100%;
      color: #f2f2f2;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    :host * {
      box-sizing: border-box;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
      margin-bottom: 32px;
      padding: 0 32px;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 11px;
      font-weight: 600;
      color: #7dd3fc;
    }

    h1 {
      font-size: 52px;
      line-height: 1.1;
      margin: 0;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }

    .lead {
      font-size: 17px;
      line-height: 1.7;
      color: #cbd5f5;
      max-width: 800px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 36px;
      }

      .hero {
        padding: 0;
      }
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="hero">
        <div class="eyebrow">Interactive Demo</div>
        <h1>LitFeature in Action</h1>
        <p class="lead">
          Explore how features compose across different component types—from simple ripple effects to complex state management with dismissible notifications.
        </p>
      </div>
      <showcase-demo></showcase-demo>
    `;
  }
}
