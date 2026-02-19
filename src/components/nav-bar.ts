import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * NavBar Component
 * 
 * Shared navigation bar used across all pages
 * Dispatches navigation events that can be handled by a router
 */
@customElement('nav-bar')
export class NavBar extends LitElement {
  @property()
  currentPage: 'home' | 'demo' | 'stress-test' | 'super-stress-test' = 'home';

  static override styles = css`
    :host {
      display: block;
      background: linear-gradient(135deg, #030303 0%, #1a1a1a 100%);
      border-bottom: 2px solid #4d64ff;
      box-shadow: 0 4px 20px rgba(77, 100, 255, 0.1);
    }

    nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 32px;
      display: flex;
      align-items: center;
      gap: 32px;
    }

    .logo {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      cursor: pointer;
      transition: transform 0.2s ease;
      margin-right: 16px;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .nav-links {
      display: flex;
      gap: 24px;
      margin-left: auto;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      color: #90ffff;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 8px 16px;
      border-radius: 6px;
      position: relative;
    }

    a:hover {
      color: #4d64ff;
      background: rgba(77, 100, 255, 0.1);
      transform: translateY(-2px);
    }

    a.active {
      color: #4d64ff;
      background: rgba(77, 100, 255, 0.15);
      border-bottom: 2px solid #4d64ff;
      padding-bottom: 6px;
    }

    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        padding: 16px 24px;
      }

      .nav-links {
        margin-left: 0;
        gap: 16px;
      }

      .logo {
        margin-right: 0;
      }
    }
  `;

  private handleNavigation(page: 'home' | 'demo' | 'stress-test' | 'super-stress-test') {
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <nav>
        <div class="logo" @click=${() => this.handleNavigation('home')}>
          ⚡ LitFeature
        </div>
        <ul class="nav-links">
          <li>
            <a
              href="#home"
              @click=${(e: Event) => {
                e.preventDefault();
                this.handleNavigation('home');
              }}
              class=${this.currentPage === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#demo"
              @click=${(e: Event) => {
                e.preventDefault();
                this.handleNavigation('demo');
              }}
              class=${this.currentPage === 'demo' ? 'active' : ''}
            >
              Demo
            </a>
          </li>
          <li>
            <a
              href="#stress-test"
              @click=${(e: Event) => {
                e.preventDefault();
                this.handleNavigation('stress-test');
              }}
              class=${this.currentPage === 'stress-test' ? 'active' : ''}
            >
              Stress Test
            </a>
          </li>
          <li>
            <a
              href="#super-stress-test"
              @click=${(e: Event) => {
                e.preventDefault();
                this.handleNavigation('super-stress-test');
              }}
              class=${this.currentPage === 'super-stress-test' ? 'active' : ''}
            >
              Super Stress Test
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}
