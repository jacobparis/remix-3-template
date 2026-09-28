import { css } from "remix/ui";
import type { Handle, RemixNode } from "remix/ui";
import { Breadcrumbs } from "remix/ui/breadcrumbs";

import { GitHubIcon, RemixWordmark } from "../ui/brand.tsx";
import { Foundations } from "../ui/foundations.tsx";
import { LinkButton } from "../ui/public/button.tsx";
import { Container } from "../ui/public/container.tsx";
import { Code } from "../ui/public/text.tsx";
import { componentStyleValues as tokens } from "../ui/public/tokens.ts";
import { Document } from "./document.tsx";
import { Deployments } from "./public/deployments.tsx";
import { Faq } from "./public/faq.tsx";
import { ProjectSettings } from "./public/project-settings.tsx";

export function HomePage() {
  return () => (
    <Document title="Remix UI">
      <SiteHeader />
      <main>
        <Hero />
        <Section
          id="foundations"
          title="Every component reads from one set of light-dark tokens"
        >
          <Foundations />
        </Section>
        <Section
          id="components"
          title="A settings screen, a deployment list, and help text built only from remix/ui"
        >
          <Breadcrumbs
            items={[
              { href: "#", label: "Acme" },
              { href: "#", label: "bookstore" },
              { label: "Settings" },
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
  );
}

function SiteHeader() {
  return () => (
    <header mix={siteHeaderStyle}>
      <Container mix={headerInnerStyle}>
        <a href="/" mix={brandLinkStyle} aria-label="Remix UI home">
          <RemixWordmark height={14} />
        </a>
        <nav aria-label="Primary" mix={navStyle}>
          <LinkButton href="#foundations" tone="ghost" mix={hideOnMobile}>
            Foundations
          </LinkButton>
          <LinkButton href="#components" tone="ghost" mix={hideOnMobile}>
            Components
          </LinkButton>
          <LinkButton
            href="https://api.remix.run"
            tone="ghost"
            mix={hideOnMobile}
          >
            API
          </LinkButton>
          <LinkButton
            href="https://github.com/remix-run/remix"
            aria-label="Remix on GitHub"
            tone="ghost"
            mix={iconButtonStyle}
          >
            <GitHubIcon />
          </LinkButton>
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return () => (
    <Container>
      <section mix={heroStyle} aria-labelledby="hero-title">
        <h1 mix={heroTitleStyle} id="hero-title">
          Remix 3 components render on the server and hydrate without React
        </h1>
        <p mix={heroLeadStyle}>
          Each component is a setup function that returns a render function.
          Styles attach through the css() mixin, and every color resolves with
          light-dark(), so the page follows the visitor&apos;s system theme.
        </p>
        <div mix={heroActionsStyle}>
          <LinkButton href="#components" tone="primary" size="lg">
            Browse components
          </LinkButton>
          <LinkButton href="https://guides.remix.run" size="lg">
            Read the guides
          </LinkButton>
          <Code mix={installStyle}>npm i remix</Code>
        </div>
      </section>
    </Container>
  );
}

function Section(
  handle: Handle<{ id: string; title: string; children: RemixNode }>,
) {
  return () => (
    <Container>
      <section id={handle.props.id} mix={sectionStyle}>
        <h2 mix={sectionTitleStyle}>{handle.props.title}</h2>
        {handle.props.children}
      </section>
    </Container>
  );
}

function SiteFooter() {
  return () => (
    <footer>
      <Container>
        <p mix={footerStyle}>Remix docs and examples are licensed under MIT.</p>
      </Container>
    </footer>
  );
}

const siteHeaderStyle = css({
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: tokens.surface.lvl1,
  borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
});

const headerInnerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: tokens.space.lg,
  height: "56px",
});

const brandLinkStyle = css({
  display: "inline-flex",
  alignItems: "center",
  color: tokens.colors.text.primary,
});

const navStyle = css({
  display: "flex",
  alignItems: "center",
  gap: tokens.space.xs,
});

const hideOnMobile = css({ "@media (max-width: 640px)": { display: "none" } });

const iconButtonStyle = css({
  paddingInline: "7px",
  "& svg": { width: "14px", height: "14px" },
});

const heroStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "1120px",
  paddingBlock: "72px 40px",
  "@media (max-width: 640px)": { paddingBlock: "40px 24px" },
});

const heroTitleStyle = css({
  margin: 0,
  maxWidth: "760px",
  fontSize: "clamp(28px, 4.4vw, 44px)",
  fontWeight: 650,
  lineHeight: 1.1,
  letterSpacing: "-0.025em",
  textWrap: "balance",
});

const heroLeadStyle = css({
  margin: 0,
  maxWidth: "640px",
  fontSize: "16px",
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.colors.text.secondary,
  textWrap: "pretty",
});

const heroActionsStyle = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: tokens.space.sm,
});

const installStyle = css({
  fontSize: tokens.fontSize.sm,
  marginInlineStart: tokens.space.sm,
});

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingBlock: "40px",
});

const sectionTitleStyle = css({
  margin: 0,
  maxWidth: "760px",
  fontSize: "22px",
  fontWeight: 600,
  lineHeight: 1.25,
  letterSpacing: "-0.015em",
  textWrap: "balance",
});

const componentsGridStyle = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
  gap: tokens.space.lg,
  alignItems: "start",
  "@media (max-width: 960px)": { gridTemplateColumns: "minmax(0, 1fr)" },
});

const columnStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: tokens.space.lg,
  minWidth: 0,
});

const footerStyle = css({
  margin: 0,
  paddingBlock: "32px 48px",
  marginBlockStart: "24px",
  borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
  fontSize: tokens.fontSize.sm,
  color: tokens.colors.text.secondary,
});
