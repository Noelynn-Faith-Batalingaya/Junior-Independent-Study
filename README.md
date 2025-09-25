# Shift-Left Accessibility for UX/UI: A Figma Preflight vs. Code-Time Checks (Pilot)
This project tests whether a quick design-time accessibility preflight in Figma can catch issues earlier than fixing them after the site is built. I will design two screens (Home + Register), run a 5-item preflight, then build the same screens in code and test with keyboard, VoiceOver, Lighthouse, and axe.

## Feature Calendar

| **Feature / Task** | **Due date** | **Notes** |
| --- | --- | --- |
| [Set Up Figma File (Pages & Structure)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/1) | 9/18/25 | Create pages: 00 Foundations, 10 Components, 20 Screens, 90 A11y Annotations |
| [Define Design Tokens (Color, Type, Spacing, Focus)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/2) | 9/25/25 | Add tokens frame; document contrast and focus-ring spec |
| [Build Button Component (5 States)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/3) | 10/3/25 | Default / Hover / **Focus** / Active / Disabled |
| [Build Text Input Component (4 States)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/4) | 10/15/25 | Error shows red border + error line; others hide error line |
| [Compose Home Screen (Landmarks + Skip Link)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/5) | 10/17/25 | Header / Nav / Main / Footer; visible skip link at top |
| [Compose Register Screen (Labels, Hints, Errors)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/6) | 10/30/25 | Labels above inputs; hint text; error placement |
| [Annotate & Run Design Preflight (Log to CSV)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/7) | 11/13/25 | Focus order, headings, roles/names; log issues + minutes |
| [Implement Site Shell (index/register/styles/app)](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/8) | 11/30/25 | Semantic HTML + skip link + basic CSS/JS |


## Stretch (if time permits)| [Code A11y Pass: Semantics, Keyboard, Focus](https://github.com/Noelynn-Faith-Batalingaya/Junior-Independent-Study/issues/9)| Labels/`aria-describedby`, `:focus-visible`, no traps |

| **Feature / Task (Stretch)** | **Due date** | **Notes** |
| --- | --- | --- |
| Table Pattern (caption + `scope`) | if time permits | Accessible table with caption and header cells (`scope="col/row"`) |
| Alt-Text Mini Guide | if time permits | 6–8 examples (good vs. poor) for your UI images |
| Reduced Motion + Dark Tokens | if time permits | `prefers-reduced-motion` CSS + dark theme color tokens |
| Automation (Pa11y / jest-axe) | if time permits | Local script to catch regressions quickly |
