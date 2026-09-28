import { clientEntry } from 'remix/ui'
import type { Handle } from 'remix/ui'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'remix/ui/accordion'

import { cardStyle, cardTitleStyle } from '../../ui/public/styles.ts'

export const Faq = clientEntry(import.meta.url, function Faq(_handle: Handle) {
  return () => (
    <section mix={cardStyle} aria-labelledby="faq-title">
      <h3 mix={cardTitleStyle} id="faq-title">
        Common questions
      </h3>
      <Accordion defaultValue="react">
        <AccordionItem value="react">
          <AccordionTrigger>Is this React?</AccordionTrigger>
          <AccordionContent>
            No. Components are setup functions that return a render function. State lives in local
            variables and handle.update() schedules a render.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bundler">
          <AccordionTrigger>Do I need a bundler?</AccordionTrigger>
          <AccordionContent>
            No. The asset server compiles TypeScript on request and serves ES modules with an import
            map.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styles">
          <AccordionTrigger>How are components styled?</AccordionTrigger>
          <AccordionContent>
            With the css() mixin inside the mix prop. Rules land in the rmx cascade layer and every
            color uses light-dark().
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
})
