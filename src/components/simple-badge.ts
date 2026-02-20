import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { LitCore } from '../root/lit-core.js';
import { provide } from '../root/decorators/index.js';
import { PulseFeature } from '../features/pulse-feature.js';

/**
 * SimpleBadge - Tier 1 Demo Component
 * 
 * A minimal badge demonstrating PulseFeature.
 * Shows different feature on different component.
 * 
 * @element simple-badge
 */
@provide('Pulse', { class: PulseFeature, config: { initiallyPulsing: true } })
export class SimpleBadge extends LitCore {
  declare Pulse: PulseFeature;
  declare pulsing: boolean;

  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 12px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="badge">
        <span class="badge-dot"></span>
        <slot>New</slot>
      </div>
    `;
  }
}
