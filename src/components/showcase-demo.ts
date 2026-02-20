import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { LitCore } from '../root/lit-core.js';

// Register all demo components
import { SimpleButton } from './simple-button.js';
import { SimpleCard } from './simple-card.js';
import { SimpleBadge } from './simple-badge.js';
import { ThemedCard } from './themed-card.js';
import { ThemedButton } from './themed-button.js';
import { ThemedPanel } from './themed-panel.js';
import { BasicNotification } from './basic-notification.js';
import { AutoNotification } from './auto-notification.js';
import { SwipeNotification } from './swipe-notification.js';

/**
 * ShowcaseDemo - Main Demo Page
 * @element showcase-demo
 */
export class ShowcaseDemo extends LitCore {
  @state()
  private _showAutoNotification = true;

  @state()
  private _showSwipeNotification = true;

  @state()
  private _showBasicNotification = true;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #e0e0e0;
      background: #030303;
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      color: #e0e0e0;
      margin-bottom: 60px;
    }

    .header h1 {
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 16px 0;
      letter-spacing: -1px;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header p {
      font-size: 20px;
      color: #a0a0a0;
      margin: 0;
      font-weight: 400;
    }

    .tier-section {
      background: #1a1a1a;
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      border: 1px solid #404040;
    }

    .tier-header {
      border-bottom: 3px solid #4d64ff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .tier-label {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #4d64ff;
      background: rgba(77, 100, 255, 0.1);
      padding: 6px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .tier-title {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #e0e0e0;
    }

    .tier-description {
      font-size: 16px;
      color: #a0a0a0;
      line-height: 1.6;
      margin: 0;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin: 30px 0;
    }

    .demo-item {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #404040;
      transition: all 0.3s ease;
    }

    .demo-item:hover {
      border-color: #4d64ff;
      background: #323232;
    }

    .demo-label {
      font-size: 12px;
      font-weight: 600;
      color: #90ffff;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .code-section {
      background: #0a0a0a;
      border-radius: 12px;
      padding: 24px;
      margin: 30px 0;
      overflow-x: auto;
      border: 1px solid #404040;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .code-title {
      font-size: 14px;
      font-weight: 600;
      color: #e0e0e0;
    }

    .code-lang {
      font-size: 11px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    pre {
      margin: 0;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: #d4d4d4;
    }

    .keyword { color: #569cd6; }
    .string { color: #ce9178; }
    .comment { color: #6a9955; }
    .function { color: #dcdcaa; }
    .type { color: #4ec9b0; }
    .property { color: #9cdcfe; }

    .benefits-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .benefit-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: #2a2a2a;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #404040;
    }

    .benefit-icon {
      font-size: 20px;
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(77, 100, 255, 0.1);
      border-radius: 8px;
      color: #4d64ff;
      font-weight: 700;
    }

    .benefit-text {
      flex: 1;
    }

    .benefit-title {
      font-size: 14px;
      font-weight: 700;
      color: #e0e0e0;
      margin: 0 0 4px 0;
    }

    .benefit-description {
      font-size: 13px;
      color: #a0a0a0;
      margin: 0;
      line-height: 1.5;
    }

    .notification-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 500px;
    }

    .notification-slot {
      min-height: 70px;
      position: relative;
    }

    .notification-placeholder {
      height: 70px;
      opacity: 0;
      pointer-events: none;
    }

    .inheritance-diagram {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
      border: 1px solid #404040;
    }

    .inheritance-level {
      display: inline-block;
      padding: 12px 24px;
      background: #1a1a1a;
      border: 2px solid #4d64ff;
      border-radius: 8px;
      margin: 8px;
      font-weight: 600;
      color: #e0e0e0;
      position: relative;
    }

    .inheritance-level::after {
      content: '→';
      position: absolute;
      right: -30px;
      top: 50%;
      transform: translateY(-50%);
      color: #4d64ff;
      font-size: 20px;
    }

    .inheritance-level:last-child::after {
      display: none;
    }

    .cta-section {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, #4d64ff 0%, rgba(77, 100, 255, 0.8) 100%);
      color: white;
      border-radius: 20px;
      margin-top: 40px;
      border: 2px solid #90ffff;
    }

    .cta-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 16px 0;
    }

    .cta-description {
      font-size: 16px;
      opacity: 0.9;
      margin: 0 0 24px 0;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-button {
      padding: 14px 32px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid white;
      border-radius: 12px;
      background: white;
      color: #4d64ff;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .cta-button.secondary {
      background: transparent;
      color: white;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="container">
        ${this._renderHeader()}
        ${this._renderTier1()}
        ${this._renderTier2()}
        ${this._renderTier3()}
        ${this._renderCTA()}
      </div>
    `;
  }

  private _renderHeader(): TemplateResult {
    return html`
      <div class="header">
        <h1>LitFeature</h1>
        <p>Composable features for Lit web components</p>
      </div>
    `;
  }

  private _renderTier1(): TemplateResult {
    return html`
      <div class="tier-section">
        <div class="tier-header">
          <h2 class="tier-title">Write Once, Use Everywhere</h2>
          <p class="tier-description">
            Features are single sources of truth. Write a feature once, 
            apply it to any component instantly.
          </p>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Step 1: Define a feature (once)</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="keyword">export class</span> <span class="type">RippleFeature</span> <span class="keyword">extends</span> <span class="type">LitFeature</span> {
  <span class="comment">// Just one reactive property</span>
  <span class="property">@property</span>({ <span class="property">type</span>: Boolean })
  <span class="property">rippling</span> = <span class="keyword">false</span>;
  
  <span class="comment">// Simple click handler</span>
  <span class="function">connectedCallback</span>(): <span class="keyword">void</span> {
    <span class="keyword">this</span>.<span class="property">host</span>.<span class="function">addEventListener</span>(<span class="string">'click'</span>, <span class="keyword">this</span>.<span class="property">_handleClick</span>);
  }
}</code></pre>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Step 2: Use it everywhere</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Button with ripple</span>
<span class="property">@provide</span>(<span class="string">'Ripple'</span>, { <span class="property">class</span>: RippleFeature })
<span class="keyword">export class</span> <span class="type">SimpleButton</span> <span class="keyword">extends</span> <span class="type">LitCore</span> { }

<span class="comment">// Card with ripple (same feature!)</span>
<span class="property">@provide</span>(<span class="string">'Ripple'</span>, { <span class="property">class</span>: RippleFeature })
<span class="keyword">export class</span> <span class="type">SimpleCard</span> <span class="keyword">extends</span> <span class="type">LitCore</span> { }</code></pre>
        </div>

        <div class="demo-grid">
          <div class="demo-item">
            <div class="demo-label">Button + RippleFeature</div>
            <simple-button>Click for Ripple</simple-button>
          </div>
          <div class="demo-item">
            <div class="demo-label">Card + RippleFeature</div>
            <simple-card>
              <span slot="title">Interactive Card</span>
              Click me to see the same ripple effect!
            </simple-card>
          </div>
          <div class="demo-item">
            <div class="demo-label">Badge + PulseFeature</div>
            <simple-badge>New Feature</simple-badge>
          </div>
        </div>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">✓</div>
            <div class="benefit-text">
              <div class="benefit-title">Single Source of Truth</div>
              <div class="benefit-description">
                Write behavior once, reuse across all components
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">↻</div>
            <div class="benefit-text">
              <div class="benefit-title">Zero Duplication</div>
              <div class="benefit-description">
                No more copy-pasting logic between components
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-text">
              <div class="benefit-title">Instant Reusability</div>
              <div class="benefit-description">
                One decorator call applies the complete feature
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderTier2(): TemplateResult {
    return html`
      <div class="tier-section">
        <div class="tier-header">
          <h2 class="tier-title">Modern TypeScript Ready</h2>
          <p class="tier-description">
            Features support both modern decorators and static properties. 
            Full lifecycle hooks, configuration, and type safety.
          </p>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Sophisticated feature with both patterns</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="keyword">export class</span> <span class="type">ThemeFeature</span> <span class="keyword">extends</span> <span class="type">LitFeature</span>&lt;<span class="type">ThemeConfig</span>&gt; {
  <span class="comment">// Modern decorator syntax</span>
  <span class="property">@property</span>({ <span class="property">type</span>: String, <span class="property">reflect</span>: <span class="keyword">true</span> })
  <span class="property">theme</span>: <span class="string">'light'</span> | <span class="string">'dark'</span> | <span class="string">'auto'</span>;
  
  <span class="comment">// Traditional static properties</span>
  <span class="keyword">static</span> <span class="property">properties</span> = {
    <span class="property">colors</span>: { <span class="property">type</span>: Object },
    <span class="property">systemTheme</span>: { <span class="property">type</span>: String }
  };
  
  <span class="comment">// Lifecycle hooks</span>
  <span class="function">connectedCallback</span>(): <span class="keyword">void</span> { <span class="comment">/* setup */</span> }
  <span class="function">updated</span>(<span class="property">props</span>): <span class="keyword">void</span> { <span class="comment">/* react to changes */</span> }
}</code></pre>
        </div>

        <div class="demo-grid">
          <div class="demo-item">
            <div class="demo-label">ThemeFeature + Card</div>
            <themed-card>
              <span slot="title">Adaptive Theme</span>
              Click the theme toggle to switch between light and dark modes.
            </themed-card>
          </div>
          <div class="demo-item">
            <div class="demo-label">ThemeFeature + Button</div>
            <themed-button>Themed Button</themed-button>
            <br><br>
            <themed-button theme="light">Another One</themed-button>
          </div>
        </div>

        <div class="demo-item" style="margin-top: 24px;">
          <div class="demo-label">ThemeFeature + Panel (Auto Mode)</div>
          <themed-panel>
            This panel automatically respects your system's theme preference.
            Try changing your OS theme setting to see it adapt!
          </themed-panel>
        </div>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">⚙</div>
            <div class="benefit-text">
              <div class="benefit-title">Your Style, Your Choice</div>
              <div class="benefit-description">
                Use decorators, static properties, or both
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-text">
              <div class="benefit-title">Configuration-Driven</div>
              <div class="benefit-description">
                Each component can configure features differently
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">✓</div>
            <div class="benefit-text">
              <div class="benefit-title">Full Type Safety</div>
              <div class="benefit-description">
                TypeScript support with complete auto-completion
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderTier3(): TemplateResult {
    return html`
      <div class="tier-section">
        <div class="tier-header">
          <h2 class="tier-title">Features Extend Features</h2>
          <p class="tier-description">
            Features are first-class citizens that support inheritance. 
            Build sophisticated feature hierarchies with ease.
          </p>
        </div>

        <div class="inheritance-diagram">
          <div class="inheritance-level">BaseDismissFeature</div>
          <div class="inheritance-level">AutoDismissFeature</div>
          <div class="inheritance-level">SwipeDismissFeature</div>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Base feature</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Level 1: Manual dismiss</span>
<span class="keyword">export class</span> <span class="type">BaseDismissFeature</span> <span class="keyword">extends</span> <span class="type">LitFeature</span> {
  <span class="function">dismiss</span>() { <span class="comment">/* basic dismiss logic */</span> }
}</code></pre>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Extended feature</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Level 2: Extends with auto-dismiss timer</span>
<span class="keyword">export class</span> <span class="type">AutoDismissFeature</span> <span class="keyword">extends</span> <span class="type">BaseDismissFeature</span> {
  <span class="keyword">override</span> <span class="function">dismiss</span>() {
    <span class="keyword">this</span>.<span class="function">_clearTimer</span>();
    <span class="keyword">super</span>.<span class="function">dismiss</span>();
  }
}</code></pre>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Doubly extended feature</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Level 3: Extends with swipe gestures!</span>
<span class="keyword">export class</span> <span class="type">SwipeDismissFeature</span> <span class="keyword">extends</span> <span class="type">AutoDismissFeature</span> {
  <span class="comment">// Inherits timer AND adds gesture support</span>
  <span class="keyword">override</span> <span class="function">connectedCallback</span>() {
    <span class="keyword">super</span>.<span class="function">connectedCallback</span>();
    <span class="keyword">this</span>.<span class="property">host</span>.<span class="function">addEventListener</span>(<span class="string">'touchstart'</span>, ...);
  }
}</code></pre>
        </div>

        <div class="notification-stack">
          <div class="notification-slot">
            ${this._showBasicNotification ? html`
              <basic-notification @dismissed=${this._handleBasicNotificationDismissed}>
                <strong>Level 1:</strong> BaseDismissFeature - Manual dismiss only
              </basic-notification>
            ` : html`
              <div class="notification-placeholder"></div>
            `}
          </div>
          
          <div class="notification-slot">
            ${this._showAutoNotification ? html`
              <auto-notification @dismissed=${this._handleAutoNotificationDismissed}>
                <strong>Level 2:</strong> AutoDismissFeature - Manual + Timer (4s)
              </auto-notification>
            ` : html`
              <div class="notification-placeholder"></div>
            `}
          </div>
          
          <div class="notification-slot">
            ${this._showSwipeNotification ? html`
              <swipe-notification @dismissed=${this._handleSwipeNotificationDismissed}>
                <strong>Level 3:</strong> SwipeDismissFeature - Manual + Timer + Swipe!
              </swipe-notification>
            ` : html`
              <div class="notification-placeholder"></div>
            `}
          </div>
        </div>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">◎</div>
            <div class="benefit-text">
              <div class="benefit-title">Composable Architecture</div>
              <div class="benefit-description">
                Build complex features from simpler ones
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⋮</div>
            <div class="benefit-text">
              <div class="benefit-title">Choose Your Level</div>
              <div class="benefit-description">
                Components pick exactly the features they need
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⚙</div>
            <div class="benefit-text">
              <div class="benefit-title">Configure Down the Tree</div>
              <div class="benefit-description">
                Override config at any inheritance level
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderCTA(): TemplateResult {
    return html`
      <div class="cta-section">
        <h2 class="cta-title">Ready to Transform Your Component Library?</h2>
        <p class="cta-description">
          LitFeature makes component features inherently reusable, composable, and maintainable.
        </p>
        <div class="cta-buttons">
          <a class="cta-button" href="https://github.com/StephenRiosDev/LitFeature" target="_blank">
            View on GitHub
          </a>
          <a class="cta-button secondary" href="#documentation">
            Read the Docs
          </a>
        </div>
      </div>
    `;
  }

  private _handleAutoNotificationDismissed(): void {
    this._showAutoNotification = false;
    // Respawn after 0.5 seconds
    setTimeout(() => {
      this._showAutoNotification = true;
    }, 500);
  }

  private _handleSwipeNotificationDismissed(): void {
    this._showSwipeNotification = false;
    // Respawn after 0.5 seconds
    setTimeout(() => {
      this._showSwipeNotification = true;
    }, 500);
  }

  private _handleBasicNotificationDismissed(): void {
    this._showBasicNotification = false;
    // Respawn after 0.5 seconds
    setTimeout(() => {
      this._showBasicNotification = true;
    }, 500);
  }
}

// Register all components
customElements.define('simple-button', SimpleButton);
customElements.define('simple-card', SimpleCard);
customElements.define('simple-badge', SimpleBadge);
customElements.define('themed-card', ThemedCard);
customElements.define('themed-button', ThemedButton);
customElements.define('themed-panel', ThemedPanel);
customElements.define('basic-notification', BasicNotification);
customElements.define('auto-notification', AutoNotification);
customElements.define('swipe-notification', SwipeNotification);
customElements.define('showcase-demo', ShowcaseDemo);
