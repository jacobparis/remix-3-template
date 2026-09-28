import { css } from 'remix/ui'
import type { Handle, RemixNode } from 'remix/ui'
import { Breadcrumbs } from 'remix/ui/breadcrumbs'
import button from 'remix/ui/button'

import { GitHubIcon, RemixWordmark, RemixWordmarkHero } from '../ui/brand.tsx'
import { Foundations } from '../ui/foundations.tsx'
import { containerStyle, eyebrowStyle, monoFont } from '../ui/public/styles.ts'
import { componentStyleValues as tokens } from '../ui/public/tokens.ts'
import { Document } from './document.tsx'
import { Deployments } from './public/deployments.tsx'
import { Faq } from './public/faq.tsx'
import { ProjectSettings } from './public/project-settings.tsx'
import { ThemeToggle } from './public/theme-toggle.tsx'

export function HomePage() {
  return () => (
    <Document title="Remix UI">
      <SiteHeader />
      <main>
        <Hero />
        <Section id="foundations" eyebrow="Foundations" title="Tokens every component shares">
          <Foundations />
        </Section>
        <Section id="components" eyebrow="Components" title="Composed from remix/ui">
          <Breadcrumbs
            items={[
              { href: '#', label: 'Acme' },
              { href: '#', label: 'bookstore' },
              { label: 'Settings' },
            ]}
          />
          <div mix={componentsGridStyle}>
            <ProjectSettings />
            <div mix={columnStyle}>
              <Deployments />
              <Faq />
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </Document>
  )
}

function SiteHeader() {
  return () => (
    <header mix={siteHeaderStyle}>
      <div mix={[containerStyle, headerInnerStyle]}>
        <a href="/" mix={brandLinkStyle} aria-label="Remix UI home">
          <RemixWordmark height={14} />
          <span mix={brandTagStyle}>UI</span>
        </a>
        <nav aria-label="Primary" mix={navStyle}>
          <a href="#foundations" mix={[button({ tone: 'ghost' }), hideOnMobile]}>
            Foundations
          </a>
          <a href="#components" mix={[button({ tone: 'ghost' }), hideOnMobile]}>
            Components
          </a>
          <a href="https://api.remix.run" mix={[button({ tone: 'ghost' }), hideOnMobile]}>
            API
          </a>
          <ThemeToggle />
          <a
            href="https://github.com/remix-run/remix"
            aria-label="Remix on GitHub"
            mix={[button({ tone: 'ghost' }), iconButtonStyle]}
          >
            <GitHubIcon />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return () => (
    <section mix={[containerStyle, heroStyle]} aria-labelledby="hero-title">
      <div mix={heroMarkStyle}>
        <RemixWordmarkHero />
      </div>
      <div mix={heroCopyStyle}>
        <h1 mix={heroTitleStyle} id="hero-title">
          Components for Remix 3, styled with mixins, rendered without React.
        </h1>
        <p mix={heroLeadStyle}>
          Headless primitives and styled components from remix/ui. They render on the server,
          hydrate as client entries, and follow the page between light and dark.
        </p>
        <div mix={heroActionsStyle}>
          <a href="#components" mix={button({ tone: 'primary', size: 'lg' })}>
            Browse components
          </a>
          <a href="https://guides.remix.run" mix={button({ size: 'lg' })}>
            Read the guides
          </a>
        </div>
        <code mix={installStyle}>npm i remix</code>
      </div>
    </section>
  )
}

function Section(handle: Handle<{ id: string; eyebrow: string; title: string; children: RemixNode }>) {
  return () => (
    <section id={handle.props.id} mix={[containerStyle, sectionStyle]}>
      <div mix={sectionHeaderStyle}>
        <p mix={eyebrowStyle}>{handle.props.eyebrow}</p>
        <h2 mix={sectionTitleStyle}>{handle.props.title}</h2>
      </div>
      {handle.props.children}
    </section>
  )
}

function SiteFooter() {
  return () => (
    <footer mix={containerStyle}>
      <div mix={footerStyle}>
        <RemixWordmark height={8} />
        <p mix={footerTextStyle}>Docs and examples licensed under MIT</p>
      </div>
    </footer>
  )
}

const siteHeaderStyle = css({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  background: `color-mix(in srgb, ${tokens.surface.lvl1} 82%, transparent)`,
  backdropFilter: 'saturate(1.4) blur(12px)',
  borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
})

const headerInnerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.lg,
  height: '56px',
})

const brandLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.space.sm,
  color: tokens.colors.text.primary,
  textDecoration: 'none',
})

const brandTagStyle = css({
  fontFamily: monoFont,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  paddingInline: '6px',
  borderRadius: tokens.radius.full,
  border: `1px solid ${tokens.colors.border.default}`,
  color: tokens.colors.text.secondary,
})

const navStyle = css({ display: 'flex', alignItems: 'center', gap: tokens.space.xs })

const hideOnMobile = css({ '@media (max-width: 640px)': { display: 'none' } })

const iconButtonStyle = css({
  paddingInline: '7px',
  '& svg': { width: '14px', height: '14px' },
})

const heroStyle = css({
  display: 'grid',
  gap: '40px',
  paddingBlock: '72px 56px',
  '@media (max-width: 640px)': { paddingBlock: '48px 40px', gap: '28px' },
})

const heroMarkStyle = css({ maxWidth: '560px', color: tokens.colors.text.primary })

const heroCopyStyle = css({ display: 'grid', gap: '20px', maxWidth: '680px' })

const heroTitleStyle = css({
  margin: 0,
  fontSize: 'clamp(28px, 4.4vw, 44px)',
  fontWeight: 650,
  lineHeight: 1.1,
  letterSpacing: '-0.025em',
  textWrap: 'balance',
})

const heroLeadStyle = css({
  margin: 0,
  fontSize: '16px',
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.colors.text.secondary,
  textWrap: 'pretty',
})

const heroActionsStyle = css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.sm })

const installStyle = css({
  justifySelf: 'start',
  fontFamily: monoFont,
  fontSize: '12px',
  padding: '6px 10px',
  borderRadius: tokens.radius.md,
  background: tokens.surface.lvl3,
  color: tokens.colors.text.secondary,
})

const sectionStyle = css({
  display: 'grid',
  gap: '20px',
  paddingBlock: '40px',
})

const sectionHeaderStyle = css({ display: 'grid', gap: '6px' })

const sectionTitleStyle = css({
  margin: 0,
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: 1.25,
  letterSpacing: '-0.015em',
})

const componentsGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
  gap: tokens.space.lg,
  alignItems: 'start',
  '@media (max-width: 960px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
})

const columnStyle = css({ display: 'grid', gap: tokens.space.lg, minWidth: 0 })

const footerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.lg,
  paddingBlock: '32px 48px',
  marginBlockStart: '24px',
  borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
  color: tokens.colors.text.muted,
})

const footerTextStyle = css({
  margin: 0,
  fontFamily: monoFont,
  fontSize: '10px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})
