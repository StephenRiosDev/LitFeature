import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * HomePage Component
 * 
 * Explains the LitFeature system with content from README and PROPOSAL
 */
@customElement('home-page')
export class HomePage extends LitElement {
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
      margin-bottom: 48px;
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
      margin: 0 auto;
    }

    .byline {
      font-size: 13px;
      color: #94a3af;
      margin: 12px 0;
      font-style: italic;
    }

    .cta-button {
      display: block;
      padding: 12px 32px;
      margin: 0 auto;
      width: 100%;
      max-width: 240px;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      color: #0a0f1a;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 12px rgba(125, 211, 252, 0.2);
      text-align: center;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(125, 211, 252, 0.35);
    }

    .content {
      margin: 0;
    }

    .content > .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 56px;
    }

    .content > .single-column {
      max-width: 900px;
      margin: 0 auto 56px;
    }

    section {
      margin-bottom: 56px;
      padding: 0;
    }

    section.section {
      background: #0b0f19;
      border-radius: 14px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      padding: 36px;
      transition: all 0.2s ease;
    }

    section.section:hover {
      border-color: rgba(125, 211, 252, 0.25);
      background: #0d1220;
    }

    h2 {
      margin: 0 0 24px;
      font-size: 28px;
      font-weight: 700;
      color: #bae6fd;
      display: flex;
      align-items: center;
      gap: 12px;
      letter-spacing: -0.01em;
    }

    h2::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 28px;
      background: linear-gradient(180deg, #7dd3fc 0%, #34d399 100%);
      border-radius: 2px;
    }

    .section p {
      color: #cbd5f5;
      font-size: 15px;
      line-height: 1.75;
      margin: 0 0 16px 0;
    }

    .section p:last-child {
      margin-bottom: 0;
    }

    .section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .section li {
      padding: 16px 0;
      color: #cbd5f5;
      font-size: 15px;
      line-height: 1.75;
      border-bottom: 1px solid rgba(125, 211, 252, 0.1);
    }

    .section li:first-child {
      padding-top: 0;
    }

    .section li:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .section strong {
      color: #e0f2fe;
      font-weight: 600;
    }

    .highlight {
      color: #7dd3fc;
      font-weight: 600;
    }

    .footer {
      margin-top: 64px;
      padding-top: 32px;
      border-top: 1px solid rgba(125, 211, 252, 0.1);
      text-align: center;
      font-size: 13px;
      color: #94a3af;
    }

    .footer a {
      color: #7dd3fc;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer a:hover {
      color: #e0f2fe;
    }

    .hero {
      text-align: center;
    }

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      h1 {
        font-size: 28px;
        line-height: 1.2;
      }

      h2 {
        font-size: 18px;
        margin: 20px 0 12px 0;
      }

      .lead {
        font-size: 14px;
        line-height: 1.6;
      }

      .byline {
        font-size: 12px;
      }

      section.section {
        padding: 16px;
        margin-bottom: 24px;
      }

      .content > .two-column {
        grid-template-columns: 1fr;
        gap: 16px;
        margin-bottom: 32px;
      }

      .content > .single-column {
        margin: 0 0 32px;
      }

      .cta-button {
        padding: 10px 24px;
        font-size: 13px;
        width: 100%;
        max-width: 280px;
      }

      .section ul {
        margin: 0;
      }

      .section li {
        padding: 12px 0;
        font-size: 13px;
      }

      .footer {
        font-size: 12px;
        margin-top: 40px;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      h1 {
        font-size: 32px;
      }

      h2 {
        font-size: 20px;
      }

      .lead {
        font-size: 15px;
      }

      section.section {
        padding: 20px;
      }

      .content > .two-column {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .cta-button {
        padding: 11px 28px;
        font-size: 14px;
      }

      .section li {
        font-size: 14px;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      h1 {
        font-size: 36px;
      }

      h2 {
        font-size: 22px;
      }

      .lead {
        font-size: 16px;
      }

      section.section {
        padding: 24px;
      }

      .content > .two-column {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .content > .single-column {
        max-width: 100%;
      }

      .cta-button {
        padding: 12px 30px;
        font-size: 14px;
        max-width: 260px;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      h1 {
        font-size: 44px;
      }

      h2 {
        font-size: 26px;
      }

      .lead {
        font-size: 16px;
        max-width: 700px;
      }

      section.section {
        padding: 28px;
      }

      .content > .two-column {
        gap: 18px;
      }

      .cta-button {
        max-width: 260px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default styles already set */
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="hero">
        <div class="eyebrow">LitElement Proposal</div>
        <h1>Composable Features for Lit</h1>
        <p class="lead">
          A proof-of-concept exploring an ergonomics-focused alternative to deep mixin stacks when building
          component libraries and design systems with Lit.
        </p>
        <div class="byline">A proposal by Stephen Rios</div>
        <button class="cta-button" @click="${this._goToDemo}">
          → View the Demo
        </button>
      </div>

      <div class="content">
        <div class="two-column">
          <!-- What is LitFeature -->
          <section class="section">
            <h2>What is LitFeature?</h2>
            <p>
              Large design systems need to compose multiple independent behaviors (status indicators, visibility management,
              dismissal logic, timers) while enabling/disabling them per component or per subtree. Traditional approaches often
              lead to unnecessary complexity and brittle deep mixin stacks.
            </p>
            <p>
              <strong>LitFeature</strong> introduces a cleaner model: <span class="highlight">features</span> are small,
              single-responsibility units of behavior that can be <span class="highlight">provided</span> by base classes and
              <span class="highlight">configured</span> by subclasses, while participating fully in Lit's reactive property
              system and component lifecycle.
            </p>
          </section>

          <!-- Core Concepts -->
          <section class="section">
            <h2>Core Concepts</h2>
            <ul>
              <li>
                <strong>Features:</strong> Specialized controllers that encapsulate single-responsibility behavior like status
                management, visibility, dismissal, or timers.
              </li>
              <li>
                <strong>Provide:</strong> Base classes declare which features they make available to themselves and subclasses.
              </li>
              <li>
                <strong>Configure:</strong> Subclasses override or disable inherited features, with configs that deep-merge down
                the inheritance chain.
              </li>
              <li>
                <strong>Property Integration:</strong> Feature properties automatically become host properties in Lit's reactive
                system.
              </li>
              <li>
                <strong>Lifecycle Participation:</strong> Features hook into host lifecycle events and can communicate with each
                other.
              </li>
            </ul>
          </section>
        </div>

        <div class="single-column">
          <!-- Why This Matters -->
          <section class="section">
            <h2>Why This Matters</h2>
            <ul>
              <li>
                <strong>Scalability:</strong> Add new behaviors to design systems by composing features, not by creating new
                mixin chains.
              </li>
              <li>
                <strong>Maintainability:</strong> Each feature is self-contained. Changes to one don't cascade through mixins.
              </li>
              <li>
                <strong>Flexibility:</strong> Enable/disable behaviors per component or per use-case using configuration.
              </li>
              <li>
                <strong>Clarity:</strong> Decorators and static getters make feature composition explicit and easy to follow.
              </li>
              <li>
                <strong>Inheritance-Aware:</strong> Leverage JavaScript's class inheritance system with first-class support for
                features.
              </li>
            </ul>
          </section>
        </div>

        <div class="single-column">
          <!-- Integration Goal -->
          <section class="section">
            <h2>Integration Goal</h2>
            <p>
              This proof-of-concept demonstrates the desired developer experience. The architecture (LitCore, LitFeature,
              decorators, and FeatureManager) would ideally be integrated directly into LitElement and ReactiveElement, making
              features a native part of Lit's component model rather than a separate library.
            </p>
          </section>
        </div>

        <!-- Footer -->
        <footer class="footer">
          <p>Composable Features for Lit © 2026 by Stephen Rios. Open source under <a href="https://opensource.org/licenses/Apache-2.0" target="_blank">Apache 2.0</a></p>
        </footer>
      </div>
    `;
  }

  private _goToDemo(): void {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'demo' },
        bubbles: true,
        composed: true,
      })
    );
  }
}
