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
    }

    .hero {
      text-align: center;
      margin-bottom: 64px;
    }

    .hero h1 {
      font-size: 56px;
      font-weight: 700;
      margin: 0 0 20px 0;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -2px;
    }

    .hero p {
      font-size: 20px;
      color: #a0a0a0;
      max-width: 600px;
      margin: 0 auto 32px;
      line-height: 1.8;
    }

    .cta-button {
      display: inline-block;
      padding: 14px 40px;
      background: linear-gradient(135deg, #4d64ff 0%, rgba(77, 100, 255, 0.8) 100%);
      color: white;
      border: 2px solid #4d64ff;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(77, 100, 255, 0.2);
    }

    .cta-button:hover {
      background: linear-gradient(135deg, #5d74ff 0%, rgba(77, 100, 255, 0.9) 100%);
      box-shadow: 0 6px 20px rgba(77, 100, 255, 0.4);
      transform: translateY(-2px);
    }

    .content {
      max-width: 900px;
      margin: 0 auto;
    }

    .section {
      margin-bottom: 48px;
    }

    .section h2 {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 24px 0;
      color: #e0e0e0;
    }

    .section p {
      color: #a0a0a0;
      font-size: 16px;
      line-height: 1.8;
      margin: 0 0 20px 0;
    }

    .section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .section li {
      padding: 12px 0;
      color: #a0a0a0;
      font-size: 16px;
      line-height: 1.8;
      border-bottom: 1px solid #404040;
    }

    .section li:last-child {
      border-bottom: none;
    }

    .section strong {
      color: #e0e0e0;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin: 32px 0;
    }

    .feature-card {
      background: #2a2a2a;
      border: 1px solid #404040;
      border-radius: 10px;
      padding: 28px;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      border-color: #4d64ff;
      background: #323232;
    }

    .feature-card h3 {
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 12px 0;
      color: #90ffff;
    }

    .feature-card p {
      margin: 0;
      font-size: 14px;
    }

    .code-block {
      background: #1a1a1a;
      border: 1px solid #404040;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      margin: 20px 0;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #90ffff;
      line-height: 1.6;
    }

    .highlight {
      color: #4d64ff;
      font-weight: 600;
    }

    .byline {
      font-size: 13px;
      color: #808080;
      margin: 24px 0 12px 0;
      font-style: italic;
    }

    .footer {
      margin-top: 80px;
      padding-top: 40px;
      border-top: 1px solid #404040;
      text-align: center;
      font-size: 13px;
      color: #808080;
    }

    .footer a {
      color: #4d64ff;
    }

    .footer a:hover {
      color: #90ffff;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="hero">
        <h1>Composable Features for Lit</h1>
        <p>
          A proof-of-concept exploring an ergonomics-focused alternative to deep mixin stacks when building
          component libraries and design systems with Lit.
        </p>
        <div class="byline">A proposal by Stephen Rios</div>
        <button class="cta-button" @click=${this._goToDemo}>
          → View the Demo
        </button>
      </div>

      <div class="content">
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

        <!-- Built-in Features -->
        <section class="section">
          <h2>Built-in Features</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <h3>StatusFeature</h3>
              <p>
                Manages visual status indicators (info, success, warning, error) with icons and semantic colors.
              </p>
            </div>
            <div class="feature-card">
              <h3>VisibilityFeature</h3>
              <p>
                Handles show/hide state with smooth transitions and animation callbacks.
              </p>
            </div>
            <div class="feature-card">
              <h3>DismissFeature</h3>
              <p>
                Provides dismissal functionality with close buttons and dismiss callbacks.
              </p>
            </div>
            <div class="feature-card">
              <h3>TimerFeature</h3>
              <p>
                Countdown timer with progress tracking, pause/resume controls, and auto-dismissal.
              </p>
            </div>
          </div>
        </section>

        <!-- Component Hierarchy -->
        <section class="section">
          <h2>Hierarchical Composition</h2>
          <p>
            The demo shows a 4-level inheritance hierarchy where each level adds a new feature while maintaining and
            configuring all inherited features:
          </p>
          <div class="code-block">
            <div><strong>Level 1:</strong> message-base → <span class="highlight">provides StatusFeature</span></div>
            <div style="margin-top: 8px;">    ↓</div>
            <div style="margin-top: 8px;"><strong>Level 2:</strong> message-box → <span class="highlight">provides VisibilityFeature</span> + configures Status</div>
            <div style="margin-top: 8px;">    ↓</div>
            <div style="margin-top: 8px;"><strong>Level 3:</strong> alert-box → <span class="highlight">provides DismissFeature</span> + configures Status &amp; Visibility</div>
            <div style="margin-top: 8px;">    ↓</div>
            <div style="margin-top: 8px;"><strong>Level 4:</strong> toast-notification → <span class="highlight">provides TimerFeature</span> + configures all</div>
          </div>
          <p>
            This demonstrates how features cleanly layer without mixin complexity, and how subclasses can reconfigure
            inherited feature behavior.
          </p>
        </section>

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

        <!-- Integration Goal -->
        <section class="section">
          <h2>Integration Goal</h2>
          <p>
            This proof-of-concept demonstrates the desired developer experience. The architecture (LitCore, LitFeature,
            decorators, and FeatureManager) would ideally be integrated directly into LitElement and ReactiveElement, making
            features a native part of Lit's component model rather than a separate library.
          </p>
        </section>

        <!-- Footer -->
        <footer class="footer">
          <p>Composable Features for Lit © 2026 by Stephen Rios. Open source under <a href="https://opensource.org/licenses/Apache-2.0" target="_blank">Apache 2.0</a></p>
        </footer>
      </div>
    `;
  }

  private _goToDemo(): void {
    window.location.hash = 'demo';
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'demo' },
        bubbles: true,
        composed: true,
      })
    );
  }
}
