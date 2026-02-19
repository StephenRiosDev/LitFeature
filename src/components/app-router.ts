import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './nav-bar.js';
import './home-page.js';
import './notification-demo.js';
import './stress-test.js';
import './super-stress-test.js';

/**
 * AppRouter Component
 * 
 * Main application routing layer that handles:
 * - Navigation between pages
 * - Hash-based routing
 * - Dynamic page loading
 * - Shared navigation bar
 */
@customElement('app-router')
export class AppRouter extends LitElement {
  @state()
  private currentPage: 'home' | 'demo' | 'stress-test' | 'super-stress-test' = 'home';

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
    this.handleHashChange();
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  private handleHashChange() {
    const hash = window.location.hash.slice(1) || 'home';
    const validPages: Record<string, 'home' | 'demo' | 'stress-test' | 'super-stress-test'> = {
      home: 'home',
      demo: 'demo',
      'stress-test': 'stress-test',
      'super-stress-test': 'super-stress-test',
    };
    this.currentPage = validPages[hash] || 'home';
  }

  private handleNavigate(e: Event) {
    const event = e as CustomEvent<{ page: string }>;
    const page = event.detail.page as 'home' | 'demo' | 'stress-test' | 'super-stress-test';
    this.currentPage = page;
    window.location.hash = page === 'home' ? '' : page;
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
      case 'demo':
        return html`<notification-demo></notification-demo>`;
      case 'stress-test':
        return html`<stress-test></stress-test>`;
      case 'super-stress-test':
        return html`<super-stress-test></super-stress-test>`;
      default:
        return html`<home-page></home-page>`;
    }
  }
}
