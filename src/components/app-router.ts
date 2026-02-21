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
 * - Navigation between pages
 * - Path-based routing using History API
 * - Dynamic page loading
 * - Shared navigation bar
 */
@customElement('app-router')
export class AppRouter extends LitElement {
  @state()
  private currentPage: 'home' | 'docs' | 'demo' | 'stress-test' | 'super-stress-test' = 'home';

  private baseUrl = (import.meta as any).env.BASE_URL;

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
    window.addEventListener('popstate', () => this.handleRouteChange());
  }

  override connectedCallback() {
    super.connectedCallback();
    // Listen for navigate events from child components
    this.addEventListener('navigate', (e: Event) => this.handleNavigate(e));
  }

  private handleRouteChange() {
    // Remove base URL from pathname to get the route
    let path = window.location.pathname;
    if (path.startsWith(this.baseUrl)) {
      path = path.slice(this.baseUrl.length);
    }
    // Remove leading slash and default to 'home'
    path = path.replace(/^\//, '') || 'home';
    
    const validPages: Record<string, 'home' | 'docs' | 'demo' | 'stress-test' | 'super-stress-test'> = {
      '': 'home',
      home: 'home',
      docs: 'docs',
      demo: 'demo',
      'stress-test': 'stress-test',
      'super-stress-test': 'super-stress-test',
    };
    
    const newPage = validPages[path] || 'home';
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
    const fullPath = `${this.baseUrl}${route}`;
    
    if (this.currentPage !== page) {
      this.currentPage = page;
      window.history.pushState({}, '', fullPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
