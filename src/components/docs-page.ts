import { html, css, TemplateResult, CSSResultGroup, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * DocsPage Component
 *
 * In-depth documentation for the LitFeature system.
 */
@customElement('docs-page')
export class DocsPage extends LitElement {
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
    }

    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .pill {
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(125, 211, 252, 0.15);
      color: #7dd3fc;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .toc {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 40px 0 56px;
    }

    .toc-card {
      background: #111827;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      transition: all 0.2s ease;
    }

    .toc-card:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: #1a1f2e;
    }

    .toc-card h3 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: #e0f2fe;
    }

    .toc-card p {
      margin: 0;
      font-size: 13px;
      color: #94a3af;
      line-height: 1.5;
    }

    section {
      margin-bottom: 72px;
      position: relative;
    }

    .section-header {
      margin-bottom: 32px;
      padding: 24px 28px;
      background: linear-gradient(135deg, rgba(125, 211, 252, 0.12) 0%, rgba(52, 211, 153, 0.08) 100%);
      border-radius: 16px;
      border: 1px solid rgba(125, 211, 252, 0.25);
      position: relative;
      scroll-margin-top: 24px;
    }

    .section-number {
      display: inline-block;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      color: #0a0f1a;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 12px;
    }

    h2 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      color: #e0f2fe;
      letter-spacing: -0.02em;
    }

    .section-lead {
      margin: 12px 0 0;
      font-size: 16px;
      line-height: 1.65;
      color: #a5b4fc;
      max-width: 800px;
    }

    .subsection {
      margin-bottom: 48px;
      padding: 28px;
      background: #0b0f19;
      border-radius: 14px;
      border: 1px solid rgba(148, 163, 184, 0.15);
      transition: all 0.2s ease;
    }

    .subsection:hover {
      border-color: rgba(125, 211, 252, 0.25);
      background: #0d1220;
    }

    h3 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 700;
      color: #bae6fd;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h3::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #7dd3fc 0%, #34d399 100%);
      border-radius: 2px;
    }

    h4 {
      margin: 24px 0 12px;
      font-size: 15px;
      font-weight: 600;
      color: #7dd3fc;
      letter-spacing: 0.02em;
    }

    p {
      margin: 0 0 16px;
      color: #cbd5f5;
      line-height: 1.75;
      font-size: 15px;
    }

    ul {
      margin: 0 0 16px;
      padding-left: 20px;
      color: #cbd5f5;
      line-height: 1.7;
      font-size: 15px;
    }

    li {
      margin-bottom: 8px;
    }

    .code-block {
      margin: 20px 0 24px;
      border-radius: 12px;
      background: #0a0f1a;
      border: 1px solid rgba(59, 130, 246, 0.3);
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .code-block::before {
      content: '';
      display: block;
      height: 32px;
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(125, 211, 252, 0.1) 100%);
      border-bottom: 1px solid rgba(59, 130, 246, 0.2);
    }

    pre {
      margin: 0;
      padding: 20px;
      font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
      font-size: 13.5px;
      line-height: 1.7;
      color: #e2e8f0;
      overflow-x: auto;
    }

    code {
      color: #e2e8f0;
    }

    /* Syntax highlighting colors */
    .token.keyword {
      color: #f472b6;
    }

    .token.string {
      color: #86efac;
    }

    .token.function {
      color: #93c5fd;
    }

    .token.class-name {
      color: #fbbf24;
    }

    .token.comment {
      color: #6b7280;
    }

    .token.punctuation {
      color: #cbd5e1;
    }

    .note {
      border-left: 4px solid #34d399;
      background: linear-gradient(90deg, rgba(52, 211, 153, 0.12) 0%, rgba(52, 211, 153, 0.04) 100%);
      padding: 16px 20px;
      border-radius: 10px;
      margin: 24px 0;
      color: #d1fae5;
      font-size: 14.5px;
      line-height: 1.7;
    }

    .note::before {
      content: '💡 ';
      font-size: 16px;
      margin-right: 6px;
    }

    .grid-two {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .card {
      background: #111827;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(59, 130, 246, 0.15);
    }

    .card h4 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: #bae6fd;
    }

    .signature {
      padding: 16px 20px;
      background: linear-gradient(135deg, rgba(125, 211, 252, 0.10) 0%, rgba(59, 130, 246, 0.08) 100%);
      border-left: 4px solid #5dd3fc;
      border-radius: 10px;
      margin: 20px 0;
      font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
      font-size: 13.5px;
      color: #cffafe;
      line-height: 1.7;
      overflow-x: auto;
      border: 1px solid rgba(125, 211, 252, 0.2);
    }

    .signature::before {
      content: '📝 API';
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #7dd3fc;
      margin-bottom: 8px;
      font-family: 'IBM Plex Sans', sans-serif;
    }

    /* Inline code styling */
    p code, li code {
      background: rgba(125, 211, 252, 0.15);
      color: #7dd3fc;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.9em;
      font-weight: 500;
    }

    /* Visual separator between subsections */
    .subsection + .subsection {
      margin-top: 32px;
    }

    .footer {
      margin-top: 80px;
      text-align: center;
      color: #64748b;
      font-size: 13px;
    }

    @media (max-width: 720px) {
      h1 {
        font-size: 40px;
      }

      .subsection {
        padding: 20px;
      }

      .section-header {
        padding: 20px;
      }
    }
  `;

  private hashChangeHandler = () => this.handleHashNavigation();

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.hashChangeHandler);
    // Handle initial hash on page load
    this.updateComplete.then(() => {
      if (window.location.hash) {
        this.handleHashNavigation();
      }
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.hashChangeHandler);
  }

  private handleHashNavigation() {
    const hash = window.location.hash.split('#')[2]; // Get the part after the first #
    console.warn(hash);
    if (hash) {
      // Look for the element in this component's shadow root
      const element = this.shadowRoot?.getElementById(hash);
      if (element) {
        // Calculate scroll position with 15px gap
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - 15;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }
  }

    override render(): TemplateResult {
        return html`
      <div class="hero">
        <div class="eyebrow">Documentation</div>
        <h1>Feature Authoring & Composition</h1>
        <p class="lead">
          Master the LitFeature workflow: author custom features, attach them to components, configure across inheritance chains, and extend with additional behavior.
        </p>
      </div>

      <div class="toc">
        <a href="#docs#author-feature" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Create a Feature</h3>
            <p>Define properties, styles, and behavior in a LitFeature subclass.</p>
          </div>
        </a>
        <a href="#docs#attach-feature" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Attach to a Component</h3>
            <p>Wire a feature into a host using @provide or static provide.</p>
          </div>
        </a>
        <a href="#docs#configure-compose" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Configure & Compose</h3>
            <p>Override config and compose multiple features together.</p>
          </div>
        </a>
        <a href="#docs#extend-features" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Extend Features</h3>
            <p>Subclass existing features to add custom behavior and properties.</p>
          </div>
        </a>
      </div>

      <section id="author-feature">
        <div class="section-header">
          <div class="section-number">1</div>
          <h2>Author a Feature</h2>
          <p class="section-lead">
            LitFeature provides a structured way to encapsulate reusable functionality across multiple components using the same patterns you'd use in a standard LitElement.
          </p>
        </div>

        <div class="subsection">
          <h3>Creating a Feature</h3>
          <p>
            Define a class that extends <code>LitFeature</code>. The constructor receives the host component instance and a config object with any options passed when the feature is attached.
          </p>
          <p>
            In this guide, we'll build a <code>CounterFeature</code>—a simple feature that manages a counter with increment and decrement functionality.
          </p>
          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitFeature } <span class="token keyword">from</span> <span class="token string">'lit-feature'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">constructor</span>(host, config) {
    <span class="token keyword">super</span>(host, config);
    <span class="token comment">// Initialize counter to 0</span>
    <span class="token keyword">this</span>.count = 0;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step ?? 1;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step ?? 1;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>TypeScript Support</h3>
          <p>
            LitFeature provides strong typing for properties and configuration. Use a generic type parameter to specify the config object shape and strongly type your feature.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitFeature } <span class="token keyword">from</span> <span class="token string">'lit-feature'</span>;
<span class="token keyword">import type</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;

<span class="token keyword">interface</span> <span class="token class-name">CounterConfig</span> {
  initialValue?: <span class="token keyword">number</span>;
  step?: <span class="token keyword">number</span>;
}

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature&lt;CounterConfig&gt; {
  <span class="token keyword">constructor</span>(host: LitCore, config: CounterConfig = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Declaring Properties</h3>
          <p>
            Use the static <code>properties</code> object to declare reactive properties. They'll automatically merge into the host component and work with Lit's reactivity system.
          </p>
          <div class="signature"><code>static properties: { [propertyName]: { type: PropertyType, reflect?: boolean } }</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">static</span> properties = {
    count: { type: Number },
    step: { type: Number }
  };

  <span class="token keyword">constructor</span>(host, config = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}</code></pre>
          </div>

          <p>
            You can also use the <code>@property</code> decorator for a more concise syntax.
          </p>
          <div class="signature"><code>@property(options?: { type?: PropertyType, reflect?: boolean, attribute?: string })</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { <span class="token function">property</span> } <span class="token keyword">from</span> <span class="token string">'feature-property'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">constructor</span>(host, config = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}</code></pre>
          </div>

          <p>
            When a feature attaches properties to a host, the host can declare those properties to enable strict type checking and IntelliSense. You can also declare the feature instance itself on the host component class.
          </p>
          <div class="signature"><code>@provide(name: string, options: { class: FeatureClass, config?: Record&lt;string, any&gt; })</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;
<span class="token keyword">import</span> { provide } <span class="token keyword">from</span> <span class="token string">'decorators'</span>;
<span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'counter-feature'</span>;

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
    class: CounterFeature,
    config: { initialValue: 0, step: 1 }
})
<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  <span class="token keyword">onClick</span>() {
    <span class="token keyword">this</span>.Counter.increment(); <span class="token comment">// Access feature methods</span>
    console.log(<span class="token string">'Count is now:'</span>, <span class="token keyword">this</span>.count);
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Defining Styles</h3>
          <p>
            Features can define styles that merge into the host component. These styles are also inherited by feature subclasses.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitFeature, css } <span class="token keyword">from</span> <span class="token string">'lit-feature'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">static</span> styles = css&grave;
    :host {
      display: inline-flex;
      gap: 8px;
      align-items: center;
    }

    .counter-display {
      font-size: 18px;
      font-weight: bold;
      min-width: 40px;
      text-align: center;
    }
  &grave;;

  <span class="token keyword">constructor</span>(host, config = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Lifecycle Hooks</h3>
          <p>
            LitFeature supports all Lit lifecycle hooks which integrate with the host component's lifecycle. Just make sure to call <code>super[hook](...args)</code> in your overrides to maintain proper behavior.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">connectedCallback</span>() {
    <span class="token keyword">super</span>.connectedCallback();
    <span class="token comment">// Code to run when host component is connected to the DOM</span>
    console.log(<span class="token string">'CounterFeature connected'</span>);
  }

  <span class="token keyword">disconnectedCallback</span>() {
    <span class="token keyword">super</span>.disconnectedCallback();
    <span class="token comment">// Code to run when host component is disconnected from the DOM</span>
    console.log(<span class="token string">'CounterFeature disconnected'</span>);
  }

  <span class="token keyword">updated</span>(changedProperties) {
    <span class="token keyword">super</span>.updated(changedProperties);
    <span class="token comment">// Code to run when host component updates</span>
    console.log(<span class="token string">'CounterFeature updated'</span>, changedProperties);
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section id="attach-feature">
        <div class="section-header">
          <div class="section-number">2</div>
          <h2>Attach a Feature</h2>
          <p class="section-lead">
            Once you've authored a feature, you can attach it to any LitCore component using the <code>@provide</code> decorator or the static <code>provide</code> getter. This wires the feature's properties, styles, and behavior into the host component.
          </p>
        </div>

        <div class="subsection">
          <h3>Using the @provide Decorator</h3>
          <p>
            Use the <code>@provide</code> decorator to attach a feature to a component. The decorator takes a name for the feature and an options object where you specify the feature class and any configuration.
          </p>
          <p>
            All properties from the feature become available on the host component, and the feature instance itself is accessible via the name you provided.
          </p>
          <div class="signature"><code>@provide(name: string, options: { class: FeatureClass, config?: Record&lt;string, any&gt; })</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;
<span class="token keyword">import</span> { provide } <span class="token keyword">from</span> <span class="token string">'decorators'</span>;
<span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'counter-feature'</span>;

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1 }
})
<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  <span class="token keyword">override</span> render() {
    <span class="token keyword">return</span> html\`
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.increment}&gt;
        Increment
      &lt;/button&gt;
      &lt;div class=<span class="token string">"counter-display"</span>&gt;\${<span class="token keyword">this</span>.count}&lt;/div&gt;
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.decrement}&gt;
        Decrement
      &lt;/button&gt;
    \`;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Using the Static provide Getter</h3>
          <p>
            Alternatively, you can use the static <code>provide</code> getter to attach features without decorators. This approach is useful when you prefer a more explicit, class-based syntax or when decorators aren't available.
          </p>
          <div class="signature"><code>static provide: { [featureName]: { class: FeatureClass, config?: Record&lt;string, any&gt; } }</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;
<span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'counter-feature'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  <span class="token keyword">static</span> provide = {
    Counter: {
      class: CounterFeature,
      config: { initialValue: 0, step: 1 }
    }
  };

  <span class="token keyword">override</span> render() {
    <span class="token keyword">return</span> html\`
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.increment}&gt;
        Increment
      &lt;/button&gt;
      &lt;div class=<span class="token string">"counter-display"</span>&gt;\${<span class="token keyword">this</span>.count}&lt;/div&gt;
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.decrement}&gt;
        Decrement
      &lt;/button&gt;
    \`;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Accessing Feature Properties</h3>
          <p>
            When a feature is attached, all of its properties are automatically merged into the host component. You can access them directly via <code>this.propertyName</code> or through the feature instance like <code>this.FeatureName.propertyName</code>.
          </p>
          <p>
            It's recommended to use PascalCase for the feature name to make it clear that it's a feature instance, and declare the feature and its properties on your component class for TypeScript support.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 10, step: 2 }
})
<span class="token keyword">export class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token comment">// Declare the feature instance</span>
  <span class="token keyword">declare</span> Counter: CounterFeature;
  
  <span class="token comment">// Declare feature properties for type safety</span>
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  logCount() {
    <span class="token comment">// Access via host property</span>
    console.log(<span class="token string">'Count:'</span>, <span class="token keyword">this</span>.count);
    
    <span class="token comment">// Or access via feature instance</span>
    console.log(<span class="token string">'Count:'</span>, <span class="token keyword">this</span>.Counter.count);
    
    <span class="token comment">// Both reference the same value</span>
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Configuration Objects</h3>
          <p>
            Configuration objects are optional but provide a way to customize feature behavior when it's attached. The config is passed to the feature's constructor and can contain any data your feature needs.
          </p>
          <p>
            For TypeScript users, define an interface for your config to get autocomplete and type checking when attaching features.
          </p>

          <div class="code-block">
            <pre><code><span class="token comment">// Define config interface</span>
<span class="token keyword">interface</span> <span class="token class-name">CounterConfig</span> {
  initialValue?: <span class="token keyword">number</span>;
  step?: <span class="token keyword">number</span>;
  min?: <span class="token keyword">number</span>;
  max?: <span class="token keyword">number</span>;
}

<span class="token comment">// Feature uses config</span>
<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature&lt;CounterConfig&gt; {
  <span class="token keyword">constructor</span>(host: LitCore, config: CounterConfig = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
    <span class="token keyword">this</span>.min = config.min ?? -Infinity;
    <span class="token keyword">this</span>.max = config.max ?? Infinity;
  }
}

<span class="token comment">// Attach with custom config</span>
<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: {
    initialValue: 50,
    step: 5,
    min: 0,
    max: 100
  }
})
<span class="token keyword">export class</span> <span class="token class-name">RangeCounter</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
}</code></pre>
          </div>
        </div>
      </section>

      <section id="configure-compose">
        <div class="section-header">
          <div class="section-number">3</div>
          <h2>Configure & Compose</h2>
          <p class="section-lead">
            Customize feature behavior through configuration overrides in component subclasses and compose multiple features together to build rich, complex functionality.
          </p>
        </div>

        <div class="subsection">
          <h3>Overriding Configuration</h3>
          <p>
            When you extend a component that has features attached, you can override the feature's configuration to customize its behavior for the subclass. This allows you to reuse components while adapting features to specific use cases.
          </p>
          <p>
            Use the <code>@configure</code> decorator to override feature configuration in a subclass, or provide new config through the static <code>provide</code> getter.
          </p>
          <div class="signature"><code>@configure(featureName: string, config: Record&lt;string, any&gt;)</code></div>

          <div class="code-block">
            <pre><code><span class="token comment">// Base component with feature</span>
<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1 }
})
<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
}

<span class="token comment">// Subclass with overridden config</span>
<span class="token keyword">@configure</span>(<span class="token string">'Counter'</span>, {
  initialValue: 100,
  step: 10
})
<span class="token keyword">export class</span> <span class="token class-name">FastCounterButton</span> <span class="token keyword">extends</span> CounterButton {
  <span class="token comment">// Counter now starts at 100 and increments by 10</span>
}</code></pre>
          </div>

          <p>
            Configuration overrides are merged with the parent config, so you only need to specify the properties you want to change.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1, min: 0, max: 100 }
})
<span class="token keyword">export class</span> <span class="token class-name">BoundedCounter</span> <span class="token keyword">extends</span> LitCore {}

<span class="token comment">// Only override step, keep other config</span>
<span class="token keyword">@configure</span>(<span class="token string">'Counter'</span>, { step: 5 })
<span class="token keyword">export class</span> <span class="token class-name">FastBoundedCounter</span> <span class="token keyword">extends</span> BoundedCounter {
  <span class="token comment">// Inherits: initialValue: 0, min: 0, max: 100</span>
  <span class="token comment">// Overrides: step: 5</span>
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Multiple Feature Composition</h3>
          <p>
            Components can have multiple features attached simultaneously. Each feature operates independently but can interact with the host component's properties and methods.
          </p>
          <p>
            This enables powerful composition patterns where you combine small, focused features to build complex functionality.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'./counter-feature'</span>;
<span class="token keyword">import</span> { RippleFeature } <span class="token keyword">from</span> <span class="token string">'./ripple-feature'</span>;
<span class="token keyword">import</span> { ThemeFeature } <span class="token keyword">from</span> <span class="token string">'./theme-feature'</span>;

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1 }
})
<span class="token keyword">@provide</span>(<span class="token string">'Ripple'</span>, {
  class: RippleFeature,
  config: { color: '#3b82f6' }
})
<span class="token keyword">@provide</span>(<span class="token string">'Theme'</span>, {
  class: ThemeFeature,
  config: { mode: 'dark' }
})
<span class="token keyword">export class</span> <span class="token class-name">RichCounterButton</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> Ripple: RippleFeature;
  <span class="token keyword">declare</span> Theme: ThemeFeature;

  <span class="token keyword">override</span> render() {
    <span class="token keyword">return</span> html\`
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.increment}&gt;
        Count: \${<span class="token keyword">this</span>.Counter.count}
      &lt;/button&gt;
    \`;
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section id="extend-features">
        <div class="section-header">
          <div class="section-number">4</div>
          <h2>Extend Features</h2>
          <p class="section-lead">
            Create specialized feature variants by extending existing features. Feature subclasses inherit properties, styles, and methods, allowing you to build feature hierarchies that share common behavior.
          </p>
        </div>

        <div class="subsection">
          <h3>Subclassing Features</h3>
          <p>
            Create new features by extending existing ones. Feature subclasses inherit properties, styles, and methods from their parent, allowing you to build specialized variants with additional functionality.
          </p>
          <p>
            This is useful for creating feature hierarchies where you want to share common behavior while customizing specific aspects.
          </p>

          <div class="code-block">
            <pre><code><span class="token comment">// Base feature</span>
<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}

<span class="token comment">// Extended feature with boundaries</span>
<span class="token keyword">export class</span> <span class="token class-name">BoundedCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">@property</span>({ type: Number })
  min = -Infinity;

  <span class="token keyword">@property</span>({ type: Number })
  max = Infinity;

  <span class="token keyword">override</span> increment() {
    <span class="token keyword">const</span> newValue = <span class="token keyword">this</span>.count + <span class="token keyword">this</span>.step;
    <span class="token keyword">this</span>.count = Math.min(newValue, <span class="token keyword">this</span>.max);
  }

  <span class="token keyword">override</span> decrement() {
    <span class="token keyword">const</span> newValue = <span class="token keyword">this</span>.count - <span class="token keyword">this</span>.step;
    <span class="token keyword">this</span>.count = Math.max(newValue, <span class="token keyword">this</span>.min);
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Adding New Properties</h3>
          <p>
            When extending features, you can add new reactive properties that work seamlessly with Lit's reactivity system. These properties are merged with the parent feature's properties and become available on the host component.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">AnimatedCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">@property</span>({ type: Boolean })
  animating = <span class="token keyword">false</span>;

  <span class="token keyword">@property</span>({ type: Number })
  animationDuration = 300;

  <span class="token keyword">override</span> increment() {
    <span class="token keyword">this</span>.animating = <span class="token keyword">true</span>;
    <span class="token keyword">super</span>.increment();
    
    setTimeout(() =&gt; {
      <span class="token keyword">this</span>.animating = <span class="token keyword">false</span>;
    }, <span class="token keyword">this</span>.animationDuration);
  }

  <span class="token keyword">override</span> decrement() {
    <span class="token keyword">this</span>.animating = <span class="token keyword">true</span>;
    <span class="token keyword">super</span>.decrement();
    
    setTimeout(() =&gt; {
      <span class="token keyword">this</span>.animating = <span class="token keyword">false</span>;
    }, <span class="token keyword">this</span>.animationDuration);
  }
}

<span class="token comment">// Use the extended feature</span>
<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: AnimatedCounterFeature,
  config: { initialValue: 0, step: 1, animationDuration: 500 }
})
<span class="token keyword">export class</span> <span class="token class-name">AnimatedCounter</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: AnimatedCounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> animating: <span class="token keyword">boolean</span>;
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Extending Styles</h3>
          <p>
            Feature subclasses can extend their parent's styles using Lit's <code>css</code> and array syntax. Styles are merged automatically, with child styles taking precedence over parent styles.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { css } <span class="token keyword">from</span> <span class="token string">'lit'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">static</span> styles = css\`
    :host {
      display: inline-flex;
      gap: 8px;
    }
  \`;
}

<span class="token keyword">export class</span> <span class="token class-name">ThemedCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">static</span> styles = [
    CounterFeature.styles,
    css\`
      :host {
        background: var(--theme-bg, #1a1a1a);
        color: var(--theme-color, #ffffff);
        border-radius: 8px;
        padding: 12px;
      }

      :host([theme="primary"]) {
        --theme-bg: #3b82f6;
        --theme-color: #ffffff;
      }

      :host([theme="success"]) {
        --theme-bg: #22c55e;
        --theme-color: #ffffff;
      }
    \`
  ];
}

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, { class: ThemedCounterFeature })
<span class="token keyword">export class</span> <span class="token class-name">ThemedCounter</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">@property</span>({ reflect: <span class="token keyword">true</span> })
  theme = <span class="token string">'primary'</span>;
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Overriding Methods</h3>
          <p>
            Override parent methods to customize behavior while still leveraging the parent's implementation through <code>super</code> calls. This allows you to enhance or modify specific aspects of a feature without rewriting everything.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">LoggingCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">override</span> increment() {
    console.log(<span class="token string">'Before increment:'</span>, <span class="token keyword">this</span>.count);
    <span class="token keyword">super</span>.increment();
    console.log(<span class="token string">'After increment:'</span>, <span class="token keyword">this</span>.count);
  }

  <span class="token keyword">override</span> decrement() {
    console.log(<span class="token string">'Before decrement:'</span>, <span class="token keyword">this</span>.count);
    <span class="token keyword">super</span>.decrement();
    console.log(<span class="token string">'After decrement:'</span>, <span class="token keyword">this</span>.count);
  }
}

<span class="token comment">// Or completely replace the behavior</span>
<span class="token keyword">export class</span> <span class="token class-name">DoubleCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">override</span> increment() {
    <span class="token comment">// Don't call super - completely new behavior</span>
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step * 2;
  }

  <span class="token keyword">override</span> decrement() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step * 2;
  }
}</code></pre>
          </div>
        </div>
      </section>
    `;
    }
}
