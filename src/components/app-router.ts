import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './nav-bar.js';
import './home-page.js';
import './docs-page.js';
import './demo-page.js';
import './stress-test.js';
import './super-stress-test.js';

/**
 * AppRouter Component
 * 
 * Main application routing layer that handles:
 * - Hash-based routing (#route/subroute#pagelink pattern)
 * - Dynamic page loading
 * - Shared navigation bar
 */
@customElement('app-router')
export class AppRouter extends LitElement {
  @state()
  private currentPage: 'home' | 'docs' | 'demo' | 'stress-test' | 'super-stress-test' = 'home';

  static override styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #030303;
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    }

    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 32px;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 24px 16px;
      }
    }
  `;

  constructor() {
    super();
    this.handleRouteChange();
    window.addEventListener('hashchange', () => this.handleRouteChange());
  }

  override connectedCallback() {
    super.connectedCallback();
    // Listen for navigate events from child components
    this.addEventListener('navigate', (e: Event) => this.handleNavigate(e));
  }

  private handleRouteChange() {
    // Parse hash pattern: #route/subroute#pagelink
    let hash = window.location.hash.slice(1); // Remove leading #
    let route = hash;
    
    // Handle subroute/pagelink pattern if present
    if (hash.includes('#')) {
      route = hash.split('#')[0];
    }
    
    // Extract main route (before any /)
    const mainRoute = route.split('/')[0] || 'home';
    
    const validPages: Record<string, 'home' | 'docs' | 'demo' | 'stress-test' | 'super-stress-test'> = {
      '': 'home',
      home: 'home',
      docs: 'docs',
      demo: 'demo',
      'stress-test': 'stress-test',
      'super-stress-test': 'super-stress-test',
    };
    
    const newPage = validPages[mainRoute] || 'home';
    const isPageChanging = this.currentPage !== newPage;
    this.currentPage = newPage;
    
    // If navigating to a new page, scroll to top
    if (isPageChanging) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  private handleNavigate(e: Event) {
    const event = e as CustomEvent<{ page: string }>;
    const page = event.detail.page as 'home' | 'docs' | 'demo' | 'stress-test' | 'super-stress-test';
    const route = page === 'home' ? '' : page;
    
    window.location.hash = route;
  }

  override render() {
    return html`
      <nav-bar
        .currentPage=${this.currentPage}
        @navigate=${(e: Event) => this.handleNavigate(e)}
      ></nav-bar>
      <div class="page-container">
        ${this.renderPage()}
      </div>
    `;
  }

  private renderPage() {
    switch (this.currentPage) {
      case 'home':
        return html`<home-page></home-page>`;
      case 'docs':
        return html`<docs-page></docs-page>`;
      case 'demo':
        return html`<demo-page></demo-page>`;
      case 'stress-test':
        return html`<stress-test></stress-test>`;
      case 'super-stress-test':
        return html`<super-stress-test></super-stress-test>`;
      default:
        return html`<home-page></home-page>`;
    }
  }
}
