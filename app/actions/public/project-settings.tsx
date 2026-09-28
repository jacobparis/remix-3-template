import { clientEntry, css } from 'remix/ui'
import type { Handle } from 'remix/ui'
import button from 'remix/ui/button'
import checkbox from 'remix/ui/checkbox'
import { Combobox, ComboboxOption } from 'remix/ui/combobox'
import input from 'remix/ui/input'
import radio from 'remix/ui/radio'
import { Option, Select } from 'remix/ui/select'
import { Tab, TabList, TabPanel, Tabs } from 'remix/ui/tabs'
import toggle from 'remix/ui/toggle'

import {
  cardStyle,
  cardTitleStyle,
  dividerStyle,
  fieldStyle,
  inlineLabelStyle,
  labelStyle,
  mutedTextStyle,
} from '../../ui/public/styles.ts'
import { componentStyleValues as tokens } from '../../ui/public/tokens.ts'

const frameworks = [
  { label: 'Remix', searchValue: ['remix', 'rmx'], value: 'remix' },
  { label: 'Hono', value: 'hono' },
  { label: 'Astro', value: 'astro' },
  { label: 'SvelteKit', searchValue: ['svelte', 'kit'], value: 'sveltekit' },
]

export const ProjectSettings = clientEntry(
  import.meta.url,
  function ProjectSettings(_handle: Handle) {
    return () => (
      <form mix={cardStyle} method="post" action="#" aria-label="Project settings">
        <div mix={headerStyle}>
          <h3 mix={cardTitleStyle}>Project settings</h3>
          <p mix={mutedTextStyle}>Changes apply to every environment.</p>
        </div>
        <Tabs defaultActiveTab="general">
          <TabList aria-label="Settings sections">
            <Tab name="general">General</Tab>
            <Tab name="notifications">Notifications</Tab>
            <Tab name="access">Access</Tab>
          </TabList>
          <TabPanel name="general">
            <div mix={panelStyle}>
              <div mix={gridStyle}>
                <label mix={fieldStyle}>
                  <span mix={labelStyle}>Project name</span>
                  <input mix={input()} name="name" defaultValue="bookstore" />
                </label>
                <div mix={fieldStyle}>
                  <span mix={labelStyle} id="region-label">
                    Region
                  </span>
                  <Select
                    aria-labelledby="region-label"
                    defaultLabel="Washington, D.C."
                    defaultValue="iad1"
                    name="region"
                  >
                    <Option label="Washington, D.C." value="iad1">
                      Washington, D.C.
                    </Option>
                    <Option label="Frankfurt" value="fra1">
                      Frankfurt
                    </Option>
                    <Option label="Tokyo" value="hnd1">
                      Tokyo
                    </Option>
                  </Select>
                </div>
              </div>
              <div mix={fieldStyle}>
                <label mix={labelStyle} for="framework">
                  Framework
                </label>
                <Combobox inputId="framework" name="framework" placeholder="Search frameworks">
                  {frameworks.map((framework) => (
                    <ComboboxOption key={framework.value} {...framework} />
                  ))}
                </Combobox>
              </div>
              <fieldset mix={fieldsetStyle}>
                <legend mix={labelStyle}>Visibility</legend>
                <div mix={optionRowStyle}>
                  <label mix={inlineLabelStyle}>
                    <input mix={radio()} name="visibility" value="private" defaultChecked />
                    Private
                  </label>
                  <label mix={inlineLabelStyle}>
                    <input mix={radio()} name="visibility" value="team" />
                    Team
                  </label>
                  <label mix={inlineLabelStyle}>
                    <input mix={radio()} name="visibility" value="public" />
                    Public
                  </label>
                </div>
              </fieldset>
            </div>
          </TabPanel>
          <TabPanel name="notifications">
            <div mix={panelStyle}>
              <label mix={switchRowStyle}>
                <span>
                  <span mix={rowTitleStyle}>Deploy notifications</span>
                  <span mix={mutedTextStyle}>Email the team when a deploy finishes.</span>
                </span>
                <input mix={toggle()} name="deployEmails" defaultChecked />
              </label>
              <hr mix={dividerStyle} />
              <label mix={switchRowStyle}>
                <span>
                  <span mix={rowTitleStyle}>Weekly digest</span>
                  <span mix={mutedTextStyle}>A Monday summary of traffic and errors.</span>
                </span>
                <input mix={toggle()} name="digest" />
              </label>
              <hr mix={dividerStyle} />
              <label mix={inlineLabelStyle}>
                <input mix={checkbox()} name="mentions" defaultChecked />
                Notify me when I am mentioned
              </label>
            </div>
          </TabPanel>
          <TabPanel name="access">
            <div mix={panelStyle}>
              <label mix={inlineLabelStyle}>
                <input mix={checkbox()} name="sso" defaultChecked />
                Require single sign-on
              </label>
              <label mix={inlineLabelStyle}>
                <input mix={checkbox()} name="previews" />
                Protect preview deployments
              </label>
            </div>
          </TabPanel>
        </Tabs>
        <div mix={footerStyle}>
          <button type="reset" mix={button()}>
            Cancel
          </button>
          <button type="submit" mix={button({ tone: 'primary' })}>
            Save changes
          </button>
        </div>
      </form>
    )
  },
)

const headerStyle = css({ display: 'grid', gap: '2px' })

const panelStyle = css({
  display: 'grid',
  gap: tokens.space.lg,
  paddingBlockStart: tokens.space.lg,
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: tokens.space.md,
})

const fieldsetStyle = css({
  display: 'grid',
  gap: tokens.space.sm,
  margin: 0,
  padding: 0,
  border: 0,
})

const optionRowStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.space.lg,
})

const switchRowStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.lg,
  cursor: 'pointer',
  '& > span': { display: 'grid', gap: '2px' },
})

const rowTitleStyle = css({
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
})

const footerStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: tokens.space.sm,
  paddingBlockStart: tokens.space.lg,
  borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
})
