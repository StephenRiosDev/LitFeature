import { LitFeature } from 'lit-feature';
import type { LitCore } from 'lit-feature';
import { property } from 'lit-feature/decorators';

/**
 * Available theme variants
 */
export type ThemeVariant = 'light' | 'dark' | 'auto';

/**
 * Configuration for ThemeFeature
 */
export interface ThemeConfig {
  /** Default theme variant */
  defaultTheme?: ThemeVariant;
  /** Whether to respect system theme preference */
  respectSystemTheme?: boolean;
  /** Custom CSS property prefix */
  cssPrefix?: string;
}

/**
 * Theme color palette
 */
export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
}

/**
 * ThemeFeature - Tier 2 Example
 * 
 * Sophisticated theme management with system preference detection.
 * Demonstrates:
 * - Modern decorator syntax (@property)
 * - Traditional static properties
 * - Lifecycle hooks (connectedCallback, updated)
 * - Configuration-driven behavior
 * - Computed properties
 */
export class ThemeFeature extends LitFeature<ThemeConfig> {
  /**
   * Current theme variant (decorator syntax)
   */
  @property({ type: String, reflect: true })
  theme: ThemeVariant;

  /**
   * Traditional static properties for comparison
   */
  static properties = {
    colors: {
      type: Object,
      attribute: false
    },
    systemTheme: {
      type: String,
      attribute: false
    }
  };

  declare colors: ThemeColors;
  declare systemTheme: 'light' | 'dark';

  private _mediaQuery?: MediaQueryList;
  private _cssPrefix: string;

  constructor(host: LitCore, config: ThemeConfig) {
    super(host, config);
    this._cssPrefix = config.cssPrefix || '--theme';
    this.theme = config.defaultTheme || 'light';
    this.systemTheme = this._detectSystemTheme();
    this.colors = this._computeColors();
    this._applyResolvedTheme();
    this._applyCSSVariables();
  }

  /**
   * Setup system theme detection
   */
  connectedCallback(): void {
    if (this.config.respectSystemTheme !== false) {
      this._setupSystemThemeListener();
      this._applyResolvedTheme();
      this._applyCSSVariables();
    }
  }

  /**
   * Cleanup system theme detection
   */
  disconnectedCallback(): void {
    if (this._mediaQuery) {
      this._mediaQuery.removeEventListener('change', this._handleSystemThemeChange);
    }
  }

  /**
   * React to theme changes
   */
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('theme')) {
      this.colors = this._computeColors();
      this._applyResolvedTheme();
      this._applyCSSVariables();
    }
  }

  /**
   * Get the resolved theme (handles 'auto' mode)
   */
  getResolvedTheme(): 'light' | 'dark' {
    if (this.theme === 'auto') {
      return this.systemTheme;
    }
    return this.theme as 'light' | 'dark';
  }

  /**
   * Toggle between light and dark
   */
  toggleTheme(): void {
    this.theme = this.getResolvedTheme() === 'light' ? 'dark' : 'light';
  }

  setTheme(variant: ThemeVariant): void {
    this.theme = variant;
  }

  setRespectSystemTheme(value: boolean): void {
    this.config.respectSystemTheme = value;
    if (value) {
      this._setupSystemThemeListener();
      this.systemTheme = this._detectSystemTheme();
      this._applyResolvedTheme();
      this._applyCSSVariables();
    } else if (this._mediaQuery) {
      this._mediaQuery.removeEventListener('change', this._handleSystemThemeChange);
      this._mediaQuery = undefined;
    }
  }

  setCssPrefix(prefix: string): void {
    this._cssPrefix = prefix;
    this._applyCSSVariables();
  }

  refreshTheme(): void {
    this.systemTheme = this._detectSystemTheme();
    this.colors = this._computeColors();
    this._applyResolvedTheme();
    this._applyCSSVariables();
  }

  private _setupSystemThemeListener(): void {
    if (!this._mediaQuery && typeof window !== 'undefined' && window.matchMedia) {
      this._mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this._mediaQuery.addEventListener('change', this._handleSystemThemeChange);
    }
  }

  /**
   * Detect system color scheme preference
   */
  private _detectSystemTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Handle system theme changes
   */
  private _handleSystemThemeChange = (e: MediaQueryListEvent) => {
    this.systemTheme = e.matches ? 'dark' : 'light';
    if (this.theme === 'auto') {
      this._applyResolvedTheme();
      this._applyCSSVariables();
    }
  };

  /**
   * Compute theme colors based on resolved theme
   */
  private _computeColors(): ThemeColors {
    const resolved = this.getResolvedTheme();
    
    if (resolved === 'dark') {
      return {
        background: '#1a1a1a',
        foreground: '#ffffff',
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb'
      };
    }
    
    return {
      background: '#ffffff',
      foreground: '#333333',
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f5576c'
    };
  }

  /**
   * Apply resolved theme as attribute
   */
  private _applyResolvedTheme(): void {
    const resolved = this.getResolvedTheme();
    this.host.setAttribute('data-theme', resolved);
  }

  /**
   * Apply theme as CSS custom properties
   */
  private _applyCSSVariables(): void {
    const style = (this.host as HTMLElement).style;
    style.setProperty(`${this._cssPrefix}-bg`, this.colors.background);
    style.setProperty(`${this._cssPrefix}-fg`, this.colors.foreground);
    style.setProperty(`${this._cssPrefix}-primary`, this.colors.primary);
    style.setProperty(`${this._cssPrefix}-secondary`, this.colors.secondary);
    style.setProperty(`${this._cssPrefix}-accent`, this.colors.accent);
  }
}
