# A11y Preflight: Shift-Left Accessibility in Figma

This project explores whether accessibility evaluation during the **design phase** can reduce downstream accessibility issues normally found during development or deployment. The work focuses on developing an early-accessibility-checking Figma plugin and testing its effect on design decisions and usability outcomes.

This project is part of the Junior Independent Study in Computer Science at The College of Wooster.

---

## Purpose

Accessibility is often checked too late in the development process—after UI implementation or right before launch. At that stage, issues are expensive to fix and often ignored, leading to accessibility debt.

This project applies a **Shift-Left approach**, meaning accessibility validation occurs **during the design phase**, not after coding. The goal is to support:

- Earlier accessibility awareness  
- Reduced rework  
- More inclusive UX/UI outcomes  
- Improved accessibility literacy among student designers  

---

## Research Question

> Does running accessibility checks in Figma during the design stage reduce downstream accessibility issues compared to code-level evaluation alone?

---

## Features

The **A11y Preflight** plugin evaluates:

- Color contrast  
- Missing or insufficient alt text  
- Touch target sizing  
- Keyboard focus visibility  
- Color-dependent meaning  

Each result includes concise WCAG-aligned educational guidance rather than only pass/fail rules.

---

## Project Contents

- `src/` — Plugin source code (TypeScript)  
- `docs/` — Final paper and presentation slides  
- `imgs/` — Screenshots and plugin UI visuals  
- `README.md` — Documentation (this file)  
- `main.pdf/tex` — Final academic paper  
- `bibliography.bib` — Academic citations and sources  

---

## How to Run the Plugin (Development Mode)

1. Clone or download this repository.  
2. Open Figma → **Plugins → Development → Import plugin from manifest…**  
3. Select the `manifest.json` file inside the `src/` directory.  
4. Select one or more elements on a Figma canvas.  
5. Run **“A11y Preflight”** from the Development plugins list.  

The plugin will display results in a sidebar UI and can export a JSON report.

---

## Project Timeline & Feature Completion

| Feature / Task | Due Date | Status | Notes |
|----------------|----------|--------|-------|
| Set up Figma file structure | 9/18/25 | ✔ | Pages + annotation layout |
| Define design tokens | 9/25/25 | ✔ | Color, typography, spacing |
| Build button + input components | 10/3–10/15 | ✔ | Includes hover + focus states |
| Create UI screens (Home + Register) | 10/17–10/30 | ✔ | Completed and annotated |
| Run accessibility preflight | 11/13/25 | ✔ | Logged to CSV |
| Implement HTML site shell | 11/30/25 | ✔ | Semantic HTML + a11y |

---

## Future Work

- Expand checks to include additional WCAG 2.2 rules  
- Add automated suggestions and correction features  
- Support downloadable PDF accessibility reports  
- Publish plugin to the **Figma Community**  
- Integrate code-based accessibility testing (axe-core, jest-axe)  
- Continue iteration as part of Senior Independent Study  

---

## Citation

