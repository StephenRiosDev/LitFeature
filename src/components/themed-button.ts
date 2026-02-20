import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { ThemeFeature, ThemeVariant } from '../features/theme-feature.js';

/**
 * ThemedButton - Tier 2 Demo Component
 * 
 * Button with theme support.
 * Shows same feature, different component, different config.
 * 
 * @element themed-button
 */
@provide('Theme', {
  class: ThemeFeature,
  config: {
    defaultTheme: 'dark', // Different default
    respectSystemTheme: false // Different config
  }
})
export class ThemedButton extends LitCore {
  declare Theme: ThemeFeature;
  declare theme: ThemeVariant;

  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 12px 32px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid var(--theme-primary, #667eea);
      border-radius: 12px;
      background: var(--theme-bg, #fff);
      color: var(--theme-fg, #333);
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      overflow: hidden;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        var(--theme-accent, rgba(102, 126, 234, 0.3)),
        transparent
      );
      transition: left 0.5s;
    }

    button:hover::before {
      left: 100%;
    }
  `;

  override render(): TemplateResult {
    return html`
      <button>
        <slot>Themed Button</slot>
      </button>
    `;
  }
}
