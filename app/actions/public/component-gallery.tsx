import { clientEntry, css } from 'remix/ui'
import type { Handle } from 'remix/ui'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/public/accordion.tsx'
import { Breadcrumbs } from '../../ui/public/breadcrumbs.tsx'
import { Button, LinkButton } from '../../ui/public/button.tsx'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/public/card.tsx'
import { Checkbox } from '../../ui/public/checkbox.tsx'
import { Combobox, ComboboxOption } from '../../ui/public/combobox.tsx'
import { Divider } from '../../ui/public/divider.tsx'
import {
  CheckboxField,
  Fieldset,
  RadioField,
  TextField,
  ToggleField,
} from '../../ui/public/field.tsx'
import { AddIcon, SearchIcon } from '../../ui/public/icons.tsx'
import { Input, InputGroup, InputGroupInput } from '../../ui/public/input.tsx'
import { ListboxList, ListboxOption } from '../../ui/public/listbox.tsx'
import { Menu, MenuItem, Submenu } from '../../ui/public/menu.tsx'
import { Radio } from '../../ui/public/radio.tsx'
import { Select, SelectOption } from '../../ui/public/select.tsx'
import { Tab, TabList, TabPanel, Tabs } from '../../ui/public/tabs.tsx'
import { fontMono, fontSm, fontXs, textSecondary } from '../../ui/public/text.ts'
import { Toggle } from '../../ui/public/toggle.tsx'
import { componentStyleValues as tokens } from '../../ui/public/tokens.ts'

export const ComponentGallery = clientEntry(
  import.meta.url,
  function ComponentGallery(_handle: Handle) {
    return () => (
      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
          gap: tokens.space.lg,
          alignItems: 'start',
        })}
      >
        <Card aria-labelledby="gallery-button">
          <CardHeader>
            <CardTitle id="gallery-button">Button</CardTitle>
            <CardDescription>Six variants, four sizes, and a link form.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
            <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.sm })}>
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div
              mix={css({
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: tokens.space.sm,
              })}
            >
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" variant="outline" aria-label="Add">
                <AddIcon />
              </Button>
              <Button disabled>Disabled</Button>
            </div>
            <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.sm })}>
              <LinkButton href="#gallery">LinkButton</LinkButton>
              <LinkButton href="#gallery" variant="outline">
                Outline link
              </LinkButton>
            </div>
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-input">
          <CardHeader>
            <CardTitle id="gallery-input">Input</CardTitle>
            <CardDescription>Default and filled, three sizes, and a leading icon.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.md })}>
            <Input aria-label="Default input" placeholder="Default" />
            <Input aria-label="Filled input" variant="filled" placeholder="Filled" />
            <div mix={css({ display: 'grid', gap: tokens.space.sm, gridTemplateColumns: '1fr 1fr 1fr' })}>
              <Input aria-label="Small input" size="sm" placeholder="Small" />
              <Input aria-label="Default size input" placeholder="Default" />
              <Input aria-label="Large input" size="lg" placeholder="Large" />
            </div>
            <InputGroup>
              <SearchIcon />
              <InputGroupInput aria-label="Search" placeholder="Search with InputGroup" />
            </InputGroup>
            <Input aria-label="Disabled input" disabled value="Disabled" />
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-choice">
          <CardHeader>
            <CardTitle id="gallery-choice">Checkbox, Radio, and Toggle</CardTitle>
            <CardDescription>Bare controls in both sizes, checked and disabled.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.md })}>
            <div mix={css({ display: 'flex', alignItems: 'center', gap: tokens.space.lg })}>
              <code mix={[fontXs, fontMono, textSecondary, css({ width: '64px' })]}>Checkbox</code>
              <Checkbox aria-label="Unchecked" />
              <Checkbox aria-label="Checked" checked />
              <Checkbox aria-label="Large checked" size="lg" checked />
              <Checkbox aria-label="Disabled" disabled />
            </div>
            <div mix={css({ display: 'flex', alignItems: 'center', gap: tokens.space.lg })}>
              <code mix={[fontXs, fontMono, textSecondary, css({ width: '64px' })]}>Radio</code>
              <Radio aria-label="First" name="gallery-radio" />
              <Radio aria-label="Second" name="gallery-radio" checked />
              <Radio aria-label="Large" name="gallery-radio-lg" size="lg" checked />
              <Radio aria-label="Disabled" name="gallery-radio-off" disabled />
            </div>
            <div mix={css({ display: 'flex', alignItems: 'center', gap: tokens.space.lg })}>
              <code mix={[fontXs, fontMono, textSecondary, css({ width: '64px' })]}>Toggle</code>
              <Toggle aria-label="Off" />
              <Toggle aria-label="On" checked />
              <Toggle aria-label="Large on" size="lg" checked />
              <Toggle aria-label="Disabled" disabled />
            </div>
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-field">
          <CardHeader>
            <CardTitle id="gallery-field">Field</CardTitle>
            <CardDescription>Labeled wrappers around each control.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
            <TextField id="gallery-email" label="Email" type="email" placeholder="you@example.com" />
            <Fieldset legend="Plan">
              <RadioField label="Hobby" name="gallery-plan" value="hobby" checked />
              <RadioField label="Pro" name="gallery-plan" value="pro" />
            </Fieldset>
            <CheckboxField label="Accept the terms" name="gallery-terms" />
            <ToggleField
              label="Preview comments"
              description="Show the toolbar on preview deployments."
              name="gallery-comments"
              checked
            />
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-select">
          <CardHeader>
            <CardTitle id="gallery-select">Select and Combobox</CardTitle>
            <CardDescription>Select in default and ghost; Combobox in default and filled.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.md })}>
            <div
              mix={css({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                gap: tokens.space.sm,
              })}
            >
              <Select aria-label="Framework" defaultLabel="Framework">
                <SelectOption label="Remix" value="remix" />
                <SelectOption label="Astro" value="astro" />
                <SelectOption label="SvelteKit" value="sveltekit" disabled />
              </Select>
              <Select aria-label="Sort order" defaultLabel="Newest" defaultValue="new" variant="ghost">
                <SelectOption label="Newest" value="new" />
                <SelectOption label="Oldest" value="old" />
              </Select>
              <Select aria-label="Small select" defaultLabel="Small" size="sm">
                <SelectOption label="Small" value="sm" />
              </Select>
              <Select aria-label="Large select" defaultLabel="Large" size="lg">
                <SelectOption label="Large" value="lg" />
              </Select>
            </div>
            <Combobox aria-label="Team member" placeholder="Search team members">
              <ComboboxOption label="Ada Lovelace" value="ada" />
              <ComboboxOption label="Grace Hopper" value="grace" />
              <ComboboxOption label="Alan Turing" value="alan" />
            </Combobox>
            <Combobox aria-label="Country" placeholder="Filled combobox" variant="filled">
              <ComboboxOption label="Canada" value="ca" />
              <ComboboxOption label="Germany" value="de" />
              <ComboboxOption label="Japan" value="jp" />
            </Combobox>
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-menu">
          <CardHeader>
            <CardTitle id="gallery-menu">Menu</CardTitle>
            <CardDescription>Items, a submenu, checkbox and radio items, and trigger variants.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.sm })}>
            <Menu label="Edit">
              <MenuItem name="copy">Copy</MenuItem>
              <MenuItem name="paste">Paste</MenuItem>
              <Submenu label="Move to">
                <MenuItem name="inbox">Inbox</MenuItem>
                <MenuItem name="archive">Archive</MenuItem>
              </Submenu>
              <MenuItem name="delete" disabled>
                Delete
              </MenuItem>
            </Menu>
            <Menu label="View" variant="outline">
              <MenuItem name="grid" type="checkbox" checked>
                Show grid
              </MenuItem>
              <MenuItem name="rulers" type="checkbox">
                Show rulers
              </MenuItem>
            </Menu>
            <Menu label="Density" variant="ghost">
              <MenuItem name="density" type="radio" value="compact">
                Compact
              </MenuItem>
              <MenuItem name="density" type="radio" value="comfortable" checked>
                Comfortable
              </MenuItem>
            </Menu>
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-tabs">
          <CardHeader>
            <CardTitle id="gallery-tabs">Tabs</CardTitle>
            <CardDescription>The default segmented list and the underline list.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
            <Tabs defaultActiveTab="overview">
              <TabList aria-label="Default tabs">
                <Tab name="overview">Overview</Tab>
                <Tab name="usage">Usage</Tab>
                <Tab name="billing" disabled>
                  Billing
                </Tab>
              </TabList>
              <TabPanel name="overview">
                <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>Overview panel.</p>
              </TabPanel>
              <TabPanel name="usage">
                <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>Usage panel.</p>
              </TabPanel>
              <TabPanel name="billing">
                <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>Billing panel.</p>
              </TabPanel>
            </Tabs>
            <Tabs defaultActiveTab="code" size="sm">
              <TabList aria-label="Underline tabs" variant="underline">
                <Tab name="code">Code</Tab>
                <Tab name="issues">Issues</Tab>
                <Tab name="actions">Actions</Tab>
              </TabList>
              <TabPanel name="code">
                <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>Small underline tabs.</p>
              </TabPanel>
              <TabPanel name="issues">
                <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>Issues panel.</p>
              </TabPanel>
              <TabPanel name="actions">
                <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>Actions panel.</p>
              </TabPanel>
            </Tabs>
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-accordion">
          <CardHeader>
            <CardTitle id="gallery-accordion">Accordion</CardTitle>
            <CardDescription>Default single-open, and plain with several open at once.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
            <Accordion defaultValue="one" collapsible>
              <AccordionItem value="one">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Triggers are buttons with aria-expanded.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="two">
                <AccordionTrigger>Can it be controlled?</AccordionTrigger>
                <AccordionContent>Pass value and onValueChange.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="three" disabled>
                <AccordionTrigger>Disabled item</AccordionTrigger>
                <AccordionContent>Unreachable.</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Divider />
            <Accordion type="multiple" variant="plain" defaultValue={['a', 'b']}>
              <AccordionItem value="a">
                <AccordionTrigger>Plain, first</AccordionTrigger>
                <AccordionContent>Multiple items can stay open.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Plain, second</AccordionTrigger>
                <AccordionContent>This one is open too.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card aria-labelledby="gallery-card">
          <CardHeader>
            <CardTitle id="gallery-card">Card</CardTitle>
            <CardDescription>Header with an action, content, and a footer.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p mix={[fontSm, textSecondary, css({ margin: 0 })]}>
              CardContent holds the body. Callers add layout through mix.
            </p>
          </CardContent>
            <CardFooter bordered mix={css({ justifyContent: 'flex-end' })}>
            <Button variant="ghost">Cancel</Button>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card aria-labelledby="gallery-navigation">
          <CardHeader>
            <CardTitle id="gallery-navigation">Breadcrumbs, Divider, and Listbox</CardTitle>
            <CardDescription>Navigation trail, a rule, and the list surface Menu and Select share.</CardDescription>
          </CardHeader>
          <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
            <Breadcrumbs
              items={[
                { href: '#gallery', label: 'Acme' },
                { href: '#gallery', label: 'bookstore' },
                { label: 'Domains' },
              ]}
            />
            <Divider />
            <div mix={css({ display: 'grid', gap: tokens.space.md, gridTemplateColumns: '1fr 1fr' })}>
              <ListboxList role="listbox" aria-label="Default list">
                <ListboxOption role="option" aria-selected="true">
                  Default list
                </ListboxOption>
                <ListboxOption role="option" end="Ctrl K">
                  With end slot
                </ListboxOption>
              </ListboxList>
              <ListboxList role="listbox" aria-label="Subtle list" variant="subtle">
                <ListboxOption role="option">Subtle list</ListboxOption>
                <ListboxOption role="option">Second option</ListboxOption>
              </ListboxList>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
)
