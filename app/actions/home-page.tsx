import { css } from 'remix/ui'
import type { Handle, RemixNode } from 'remix/ui'

import { GitHubIcon, RemixWordmark } from '../ui/brand.tsx'
import { Foundations } from '../ui/foundations.tsx'
import { Breadcrumbs } from '../ui/public/breadcrumbs.tsx'
import { LinkButton } from '../ui/public/button.tsx'
import { Container } from '../ui/public/container.tsx'
import {
  font2xl,
  fontLg,
  fontMono,
  fontSemibold,
  fontSm,
  textSecondary,
} from '../ui/public/text.ts'
import { componentStyleValues as tokens } from '../ui/public/tokens.ts'
import { Document } from './document.tsx'
import { ComponentGallery } from './public/component-gallery.tsx'
import { Deployments } from './public/deployments.tsx'
import { Faq } from './public/faq.tsx'
import { ProjectSettings } from './public/project-settings.tsx'

const navLinks = [
  { href: '#foundations', label: 'Foundations' },
  { href: '#components', label: 'Components' },
  { href: '#gallery', label: 'Gallery' },
  { href: 'https://api.remix.run', label: 'API' },
]

export function HomePage() {
  return () => (
    <Document title="Remix UI">
      <SiteHeader />
      <main>
        <Hero />
        <Section id="foundations" title="Every component reads from one set of light-dark tokens">
          <Foundations />
        </Section>
        <Section
          id="components"
          title="A settings screen, a deployment list, and help text built only from remix/ui"
        >
          <Breadcrumbs
            items={[
              { href: '#', label: 'Acme' },
              { href: '#', label: 'bookstore' },
              { label: 'Settings' },
            ]}
          />
          <div
            mix={css({
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
              gap: tokens.space.lg,
              alignItems: 'start',
              '@media (max-width: 960px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
            })}
          >
            <ProjectSettings />
            <div
              mix={css({
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.space.lg,
                minWidth: 0,
              })}
            >
              <Deployments />
              <Faq />
            </div>
          </div>
        </Section>
        <Section id="gallery" title="Every component in app/ui/public, in each variant and size">
          <ComponentGallery />
        </Section>
      </main>
      <SiteFooter />
    </Document>
  )
}

function SiteHeader() {
  return () => (
    <header
      mix={css({
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: tokens.surface.lvl1,
        borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
      })}
    >
      <Container
        mix={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.space.lg,
          height: '56px',
        })}
      >
        <a
          href="/"
          aria-label="Remix UI home"
          mix={css({
            display: 'inline-flex',
            alignItems: 'center',
            color: tokens.colors.text.primary,
          })}
        >
          <RemixWordmark height={14} />
        </a>
        <nav
          aria-label="Primary"
          mix={css({ display: 'flex', alignItems: 'center', gap: tokens.space.xs })}
        >
          {navLinks.map((link) => (
            <LinkButton
              key={link.href}
              href={link.href}
              variant="ghost"
              size="sm"
              mix={css({ '@media (max-width: 640px)': { display: 'none' } })}
            >
              {link.label}
            </LinkButton>
          ))}
          <LinkButton
            href="https://github.com/remix-run/remix"
            aria-label="Remix on GitHub"
            variant="ghost"
            size="icon"
          >
            <GitHubIcon />
          </LinkButton>
        </nav>
      </Container>
    </header>
  )
}

function Hero() {
  return () => (
    <Container>
      <section
        aria-labelledby="hero-title"
        mix={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingBlock: '72px 40px',
          '@media (max-width: 640px)': { paddingBlock: '40px 24px' },
        })}
      >
        <h1
          id="hero-title"
          mix={css({
            margin: 0,
            maxWidth: '760px',
            fontSize: 'clamp(28px, 4.4vw, 44px)',
            fontWeight: 650,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            textWrap: 'balance',
          })}
        >
          Remix 3 components render on the server and hydrate without React
        </h1>
        <p
          mix={[
            fontLg,
            textSecondary,
            css({ margin: 0, maxWidth: '640px', textWrap: 'pretty' }),
          ]}
        >
          Each component is a setup function that returns a render function. Styles attach through
          the css() mixin, and every color resolves with light-dark(), so the page follows the
          visitor&apos;s system theme.
        </p>
        <div
          mix={css({
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: tokens.space.sm,
          })}
        >
          <LinkButton href="#components" size="lg">
            Browse components
          </LinkButton>
          <LinkButton href="https://guides.remix.run" variant="outline" size="lg">
            Read the guides
          </LinkButton>
          <code
            mix={[fontSm, fontMono, textSecondary, css({ marginInlineStart: tokens.space.sm })]}
          >
            npm i remix
          </code>
        </div>
      </section>
    </Container>
  )
}

function Section(handle: Handle<{ id: string; title: string; children: RemixNode }>) {
  return () => (
    <Container>
      <section
        id={handle.props.id}
        mix={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingBlock: '40px',
        })}
      >
        <h2
          mix={[
            font2xl,
            fontSemibold,
            css({ margin: 0, maxWidth: '760px', textWrap: 'balance' }),
          ]}
        >
          {handle.props.title}
        </h2>
        {handle.props.children}
      </section>
    </Container>
  )
}

function SiteFooter() {
  return () => (
    <footer>
      <Container>
        <p
          mix={[
            fontSm,
            textSecondary,
            css({
              margin: 0,
              paddingBlock: '32px 48px',
              marginBlockStart: '24px',
              borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
            }),
          ]}
        >
          Remix docs and examples are licensed under MIT.
        </p>
      </Container>
    </footer>
  )
}
