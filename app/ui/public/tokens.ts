// This app's design tokens, seeded from Remix's defaults in remix-run/remix
// packages/ui/src/shared/style-values.ts. That module is internal and its values are baked into
// the styled remix/ui components as literals, so nothing upstream reads this file; every
// component in app/ui/public does. Change a value here to retheme the whole app.

type ComponentActionColors = {
  readonly background: string
  readonly backgroundHover: string
  readonly backgroundActive: string
  readonly foreground: string
  readonly border: string
}

// fontSize and lineHeight share these keys so each size step has one matching line height.
type TypeSteps = {
  readonly xs: string
  readonly sm: string
  readonly md: string
  readonly lg: string
  readonly xl: string
  readonly '2xl': string
}

type ComponentStyleValues = {
  readonly space: {
    readonly none: string
    readonly xs: string
    readonly sm: string
    readonly md: string
    readonly lg: string
  }
  readonly radius: {
    readonly md: string
    readonly lg: string
    readonly xl: string
    readonly full: string
  }
  readonly fontFamily: {
    readonly sans: string
    readonly mono: string
  }
  readonly fontSize: TypeSteps & { readonly display: string }
  readonly lineHeight: TypeSteps & {
    readonly display: string
    readonly normal: string
    readonly relaxed: string
  }
  readonly letterSpacing: {
    readonly normal: string
    readonly tight: string
    readonly tighter: string
  }
  readonly fontWeight: {
    readonly normal: string
    readonly medium: string
    readonly semibold: string
  }
  readonly control: {
    readonly height: {
      readonly sm: string
      readonly md: string
      readonly lg: string
    }
  }
  readonly surface: {
    readonly lvl0: string
    readonly lvl1: string
    readonly lvl2: string
    readonly lvl3: string
    readonly lvl4: string
  }
  readonly shadow: {
    readonly xs: string
    readonly sm: string
    readonly md: string
    readonly thumb: string
  }
  readonly colors: {
    readonly brand: {
      readonly blue: string
      readonly green: string
      readonly yellow: string
      readonly pink: string
      readonly red: string
    }
    readonly selection: {
      readonly background: string
      readonly foreground: string
    }
    readonly status: {
      readonly success: string
      readonly warning: string
      readonly danger: string
    }
    readonly control: {
      readonly track: string
      readonly thumb: string
    }
    readonly text: {
      readonly primary: string
      readonly secondary: string
      readonly muted: string
    }
    readonly border: {
      readonly subtle: string
      readonly default: string
    }
    readonly focus: {
      readonly ring: string
      readonly halo: string
      readonly haloDanger: string
    }
    readonly wash: {
      readonly hover: string
      readonly active: string
    }
    readonly action: {
      readonly primary: ComponentActionColors
      readonly secondary: ComponentActionColors
      readonly danger: ComponentActionColors
    }
  }
}

export const componentStyleValues: ComponentStyleValues = {
  space: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  radius: {
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  fontSize: {
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    display: 'clamp(28px, 4.4vw, 44px)',
  },
  fontFamily: {
    sans: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  lineHeight: {
    xs: '16px',
    sm: '20px',
    md: '22px',
    lg: '24px',
    xl: '28px',
    '2xl': '32px',
    display: '1.1',
    normal: '1.45',
    relaxed: '1.65',
  },
  letterSpacing: {
    normal: '0',
    tight: '-0.015em',
    tighter: '-0.025em',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
  },
  control: {
    height: {
      sm: '28px',
      md: '32px',
      lg: '36px',
    },
  },
  surface: {
    lvl0: 'light-dark(#ffffff, #1a1a1a)',
    lvl1: 'light-dark(#f8f8f8, #1f1f1f)',
    lvl2: 'light-dark(#f5f5f5, #232323)',
    lvl3: 'light-dark(#f3f3f3, #272727)',
    lvl4: 'light-dark(#efefef, #2c2c2c)',
  },
  shadow: {
    xs: '0 1px 1px rgb(0 0 0 / 0.05)',
    sm: '0 1px 2px rgb(0 0 0 / 0.07)',
    md: '0 6px 18px rgb(0 0 0 / 0.08)',
    thumb: '0 1px 2px rgb(0 0 0 / 0.2)',
  },
  colors: {
    brand: {
      blue: '#20AAFF',
      green: '#80E464',
      yellow: '#FFDF5F',
      pink: '#FF65DB',
      red: '#FF5148',
    },
    selection: {
      background: '#FFDF5F',
      foreground: '#151515',
    },
    status: {
      success: 'light-dark(#1f9d55, #6fdc8c)',
      warning: 'light-dark(#b7791f, #ffdf5f)',
      danger: 'light-dark(#FF3000, #ff8a70)',
    },
    control: {
      track: 'light-dark(#dcdcdc, #3a3a3a)',
      thumb: '#ffffff',
    },
    text: {
      primary: 'light-dark(#151515, #ececec)',
      secondary: 'light-dark(#4f4f4f, #b3b3b3)',
      muted: 'light-dark(#6d6d6d, #b3b3b3)',
    },
    border: {
      subtle: 'light-dark(#e7e7e7, #333333)',
      default: 'light-dark(#d1d1d1, #444444)',
    },
    focus: {
      ring: 'light-dark(#1A72FF, #6eaaff)',
      halo: 'light-dark(rgb(26 114 255 / 0.16), rgb(110 170 255 / 0.22))',
      haloDanger: 'light-dark(rgb(255 48 0 / 0.14), rgb(255 138 112 / 0.2))',
    },
    wash: {
      hover: 'light-dark(rgb(16 16 16 / 0.05), rgb(236 236 236 / 0.1))',
      active: 'light-dark(rgb(16 16 16 / 0.08), rgb(236 236 236 / 0.14))',
    },
    action: {
      primary: {
        background: 'light-dark(#1A72FF, #6eaaff)',
        backgroundHover: 'light-dark(#1463e0, #8bbcff)',
        backgroundActive: 'light-dark(#0f55c9, #a7ccff)',
        foreground: 'light-dark(rgb(255 255 255 / 0.92), #151515)',
        border: 'light-dark(#1A72FF, #6eaaff)',
      },
      secondary: {
        background: 'light-dark(#ffffff, #1a1a1a)',
        backgroundHover: 'light-dark(#fbfbfb, #232323)',
        backgroundActive: 'light-dark(#f3f3f3, #2c2c2c)',
        foreground: 'light-dark(#202020, #ececec)',
        border: 'light-dark(#d1d1d1, #444444)',
      },
      danger: {
        background: 'light-dark(#FF3000, #ff8a70)',
        backgroundHover: 'light-dark(#e12b00, #ff9f8a)',
        backgroundActive: 'light-dark(#c52600, #ffb39f)',
        foreground: 'light-dark(rgb(255 255 255 / 0.92), #151515)',
        border: 'light-dark(#FF3000, #ff8a70)',
      },
    },
  },
}
