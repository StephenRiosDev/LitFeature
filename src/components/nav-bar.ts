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
  currentPage: 'home' | 'docs' | 'demo' = 'home';

  private baseUrl = (import.meta as any).env.BASE_URL;

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

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      nav {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 12px 12px;
      }

      .logo {
        font-size: 20px;
        margin-right: 0;
        text-align: center;
      }

      .nav-links {
        margin-left: 0;
        gap: 0;
        flex-direction: column;
      }

      .nav-links li {
        width: 100%;
      }

      .nav-links a {
        display: block;
        padding: 12px 12px;
        font-size: 14px;
        width: 100%;
        text-align: center;
        border-radius: 8px;
      }

      a.active {
        border-bottom: none;
        padding-bottom: 12px;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
        padding: 14px 16px;
      }

      .logo {
        font-size: 22px;
        margin-right: 0;
      }

      .nav-links {
        margin-left: 0;
        gap: 12px;
        width: 100%;
      }

      .nav-links a {
        font-size: 14px;
        padding: 10px 14px;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      nav {
        flex-direction: row;
        padding: 18px 20px;
        gap: 24px;
      }

      .logo {
        font-size: 22px;
        margin-right: auto;
      }

      .nav-links {
        gap: 12px;
      }

      .nav-links a {
        font-size: 14px;
        padding: 8px 12px;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      nav {
        padding: 20px 24px;
        gap: 28px;
      }

      .logo {
        font-size: 22px;
      }

      .nav-links {
        gap: 18px;
      }

      .nav-links a {
        font-size: 15px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default styles already set */
    }
  `;

  private handleNavigation(page: 'home' | 'docs' | 'demo') {
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
              href="${this.baseUrl}"
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
              href="${this.baseUrl}demo"
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
              href="${this.baseUrl}docs"
              @click=${(e: Event) => {
                e.preventDefault();
                this.handleNavigation('docs');
              }}
              class=${this.currentPage === 'docs' ? 'active' : ''}
            >
              Docs
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}
