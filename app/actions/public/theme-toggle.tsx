import { clientEntry, on } from 'remix/ui'
import type { Handle } from 'remix/ui'
import button from 'remix/ui/button'

type Scheme = 'light' | 'dark'

function currentScheme(): Scheme {
  let explicit = document.documentElement.style.colorScheme
  if (explicit === 'light' || explicit === 'dark') return explicit
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ThemeToggle = clientEntry(import.meta.url, function ThemeToggle(handle: Handle) {
  return () => (
    <button
      aria-label="Toggle light and dark theme"
      mix={[
        button({ tone: 'ghost' }),
        on('click', () => {
          let next: Scheme = currentScheme() === 'dark' ? 'light' : 'dark'
          document.documentElement.style.colorScheme = next
          localStorage.setItem('color-scheme', next)
          void handle.update()
        }),
      ]}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5" />
        <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
      </svg>
      Theme
    </button>
  )
})
