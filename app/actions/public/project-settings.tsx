import { clientEntry, css } from "remix/ui";
import type { Handle } from "remix/ui";
import { Combobox, ComboboxOption } from "remix/ui/combobox";
import { Option, Select } from "remix/ui/select";
import { Tab, TabList, TabPanel, Tabs } from "remix/ui/tabs";

import { Button } from "../../ui/public/button.tsx";
import { Card, CardFooter, CardHeader } from "../../ui/public/card.tsx";
import { Divider } from "../../ui/public/divider.tsx";
import {
  CheckboxField,
  Field,
  Fieldset,
  RadioField,
  TextField,
  ToggleField,
} from "../../ui/public/field.tsx";
import { componentStyleValues as tokens } from "../../ui/public/tokens.ts";

const frameworks = [
  { label: "Remix", searchValue: ["remix", "rmx"], value: "remix" },
  { label: "Hono", value: "hono" },
  { label: "Astro", value: "astro" },
  { label: "SvelteKit", searchValue: ["svelte", "kit"], value: "sveltekit" },
];

export const ProjectSettings = clientEntry(
  import.meta.url,
  function ProjectSettings(_handle: Handle) {
    return () => (
      <Card aria-labelledby="settings-title">
        <CardHeader
          title="Project settings"
          titleId="settings-title"
          description="Changes apply to every environment."
        />
        <form mix={formStyle} method="post" action="#">
          <Tabs defaultActiveTab="general">
            <TabList aria-label="Settings sections">
              <Tab name="general">General</Tab>
              <Tab name="notifications">Notifications</Tab>
              <Tab name="access">Access</Tab>
            </TabList>
            <TabPanel name="general">
              <div mix={panelStyle}>
                <div mix={gridStyle}>
                  <TextField
                    id="project-name"
                    label="Project name"
                    name="name"
                    defaultValue="bookstore"
                  />
                  <Field label="Region" labelId="region-label">
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
                  </Field>
                </div>
                <Field label="Framework" controlId="framework">
                  <Combobox
                    inputId="framework"
                    name="framework"
                    placeholder="Search frameworks"
                  >
                    {frameworks.map((framework) => (
                      <ComboboxOption key={framework.value} {...framework} />
                    ))}
                  </Combobox>
                </Field>
                <Fieldset legend="Visibility">
                  <RadioField
                    label="Private"
                    name="visibility"
                    value="private"
                    defaultChecked
                  />
                  <RadioField label="Team" name="visibility" value="team" />
                  <RadioField label="Public" name="visibility" value="public" />
                </Fieldset>
              </div>
            </TabPanel>
            <TabPanel name="notifications">
              <div mix={panelStyle}>
                <ToggleField
                  label="Deploy notifications"
                  description="Email the team when a deploy finishes."
                  name="deployEmails"
                  defaultChecked
                />
                <Divider />
                <ToggleField
                  label="Weekly digest"
                  description="A Monday summary of traffic and errors."
                  name="digest"
                />
                <Divider />
                <CheckboxField
                  label="Notify me when I am mentioned"
                  name="mentions"
                  defaultChecked
                />
              </div>
            </TabPanel>
            <TabPanel name="access">
              <div mix={panelStyle}>
                <CheckboxField
                  label="Require single sign-on"
                  name="sso"
                  defaultChecked
                />
                <CheckboxField
                  label="Protect preview deployments"
                  name="previews"
                />
              </div>
            </TabPanel>
          </Tabs>
          <CardFooter>
            <Button type="reset">Cancel</Button>
            <Button type="submit" tone="primary">
              Save changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  },
);

const formStyle = css({ display: "grid", gap: tokens.space.lg });

const panelStyle = css({
  display: "grid",
  gap: tokens.space.lg,
  paddingBlockStart: tokens.space.lg,
});

const gridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: tokens.space.md,
});
