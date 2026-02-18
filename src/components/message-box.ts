import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { provide, configure } from '../root/decorators/index.js';
import { MessageBase } from './message-base.js';
import { VisibilityFeature } from '../features/visibility-feature.js';

/**
 * MessageBox (Level 2)
 * 
 * Extends MessageBase with visibility/transition capabilities.
 * Can be shown/hidden with smooth transitions.
 * 
 * HIERARCHY: MessageBase → MessageBox
 * INHERITS: StatusFeature (from MessageBase)
 * PROVIDES: VisibilityFeature
 * CONFIGURES: StatusFeature (changes default to 'success')
 * 
 * @element message-box
 * @attr {boolean} visible - Whether the message is visible
 * @fires visibility-changed - When visibility state changes
 */
@provide('Visibility', {
  class: VisibilityFeature,
  config: {
    initiallyVisible: true,
    transitionDuration: 300
  }
})
@configure('Status', {
  config: {
    defaultStatus: 'success' // Override parent's default
  }
})
export class MessageBox extends MessageBase {
  // Feature instance
  declare Visibility: VisibilityFeature;
  
  // Properties from VisibilityFeature
  declare visible: boolean;
  declare transitioning: boolean;

  static override styles: CSSResultGroup = [
    MessageBase.styles as CSSResultGroup,
    css`
      :host {
        display: block;
      }

      :host(:not([visible])) {
        display: none;
      }

      .message-box {
        position: relative;
      }

      .message-box.transitioning {
        pointer-events: none;
      }

      /* Slide-in animation */
      @keyframes slideIn {
        from {
          transform: translateY(-10px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .message-box.animate-in {
        animation: slideIn 0.3s ease-out;
      }
    `
  ];

  /**
   * Show the message box
   */
  show(): void {
    this.Visibility?.show();
  }

  /**
   * Hide the message box
   */
  hide(): void {
    this.Visibility?.hide();
  }

  /**
   * Toggle visibility
   */
  toggle(): void {
    this.Visibility?.toggle();
  }

  render(): TemplateResult {
    if (!this.visible && !this.transitioning) {
      return html``;
    }

    const statusClass = `status-${this.status || 'info'}`;
     const transitionStyle = this.Visibility?.visible ? this.Visibility.getTransitionStyles() || '' : '';
    
    return html`
      <div 
        class="message message-box ${statusClass} ${this.transitioning ? 'transitioning' : ''}"
        style="${transitionStyle}"
      >
        ${this.showIcon ? html`
          <span class="message-icon">${this.Status?.getStatusIcon()}</span>
        ` : null}
        <div class="message-content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }
}

// Register the component
MessageBox.register('message-box');
