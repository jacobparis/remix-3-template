import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { ImportMap } from 'remix/ui/server'

import { scriptEntry } from '../assets.ts'
import { componentStyleValues as tokens } from '../ui/public/tokens.ts'

export interface DocumentProps {
  children?: RemixNode
  head?: RemixNode
  title?: string
}

const DEFAULT_TITLE = 'Remix UI'

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let { children, head, title = DEFAULT_TITLE } = handle.props
    let { href, importMap, preloads } = scriptEntry

    return (
      <html lang="en" mix={css({ colorScheme: 'light dark' })}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light dark" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <title>{title}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;700&display=swap"
          />
          {head}
          <ImportMap value={importMap} />
          {preloads.map((preloadHref) => (
            <link key={preloadHref} rel="modulepreload" href={preloadHref} />
          ))}
          <script type="module" src={href}></script>
        </head>
        <body
          mix={css({
            margin: 0,
            minHeight: '100vh',
            background: tokens.surface.lvl1,
            color: tokens.colors.text.primary,
            fontFamily: tokens.fontFamily.sans,
            fontSize: tokens.fontSize.md,
            lineHeight: tokens.lineHeight.normal,
            fontFeatureSettings: '"cv01" on, "ss01" on',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            '& *, & *::before, & *::after': { boxSizing: 'border-box' },
            '& ::selection': {
              background: tokens.colors.selection.background,
              color: tokens.colors.selection.foreground,
            },
          })}
        >
          {children}
        </body>
      </html>
    )
  }
}
