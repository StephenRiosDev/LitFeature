import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from 'lit-feature';
import { provide } from 'lit-feature/decorators';
import { ThemeFeature, ThemeVariant, ThemeColors } from '../features/theme-feature.js';

/**
 * ThemedCard - Tier 2 Demo Component
 * 
 * Card with sophisticated theme management.
 * Demonstrates configuration-driven feature usage.
 * 
 * @element themed-card
 */
@provide('Theme', {
  class: ThemeFeature,
  config: {
    defaultTheme: 'light',
    respectSystemTheme: true
  }
})
export class ThemedCard extends LitCore {
  declare Theme: ThemeFeature;
  declare theme: ThemeVariant;
  declare colors: ThemeColors;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
    }

    .card {
      padding: 24px;
      border-radius: 16px;
      background: var(--theme-bg, #fff);
      color: var(--theme-fg, #333);
      border: 2px solid var(--theme-primary, #667eea);
      transition: all 0.3s ease;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: var(--theme-primary, #667eea);
    }

    .theme-toggle {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      background: var(--theme-primary, #667eea);
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .theme-toggle:hover {
      transform: scale(1.05);
    }

    .card-content {
      font-size: 14px;
      line-height: 1.6;
      opacity: 0.9;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><slot name="title">Themed Card</slot></h3>
          <button class="theme-toggle" @click=${() => this.Theme.toggleTheme()}>
            ${this.Theme.getResolvedTheme() === 'light' ? '◐' : '◑'}
          </button>
        </div>
        <div class="card-content">
          <slot>This card adapts to your theme preference.</slot>
        </div>
      </div>
    `;
  }

}
