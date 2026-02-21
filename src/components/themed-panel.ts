import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from 'lit-feature';
import { provide } from 'lit-feature/decorators';
import { ThemeFeature, ThemeVariant } from '../features/theme-feature.js';

/**
 * ThemedPanel - Tier 2 Demo Component
 * 
 * Full-width panel with theme support and auto mode.
 * 
 * @element themed-panel
 */
@provide('Theme', {
  class: ThemeFeature,
  config: {
    defaultTheme: 'auto', // Respects system preference
    respectSystemTheme: true
  }
})
export class ThemedPanel extends LitCore {
  declare Theme: ThemeFeature;
  declare theme: ThemeVariant;

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
    }

    .panel {
      padding: 32px;
      border-radius: 12px;
      background: var(--theme-bg, #fff);
      color: var(--theme-fg, #333);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--theme-accent, #f5576c);
    }

    .panel-indicator {
      display: inline-block;
      padding: 4px 12px;
      margin-bottom: 12px;
      border-radius: 6px;
      background: var(--theme-primary, #667eea);
      color: white;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .panel-content {
      font-size: 14px;
      line-height: 1.8;
    }
  `;

  override render(): TemplateResult {
    const resolved = this.Theme.getResolvedTheme();
    return html`
      <div class="panel">
        <div class="panel-indicator">
          ${this.Theme.theme === 'auto' ? `Auto (${resolved})` : resolved}
        </div>
        <div class="panel-content">
          <slot>
            This panel respects your system's theme preference when in auto mode.
          </slot>
        </div>
      </div>
    `;
  }
}
