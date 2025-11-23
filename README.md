# A11y Preflight: Shift-Left Accessibility in Figma

This project explores whether accessibility evaluation during the **design phase** can reduce downstream accessibility issues normally found during development or deployment. The work focuses on developing an early-accessibility-checking Figma plugin and testing its effect on design decisions and usability outcomes.

This project is part of the Junior Independent Study in Computer Science at The College of Wooster.

---

## Purpose

Accessibility is often checked too late in the development process—after UI implementation or right before launch. At that stage, issues are expensive to fix and often ignored, leading to accessibility debt.

This project applies a **Shift-Left approach**, meaning accessibility validation occurs **during the design phase**, not after coding.  
The goal is to support:

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

Each result includes concise WCAG-aligned educational feedback rather than only pass/fail rules.

---

## Project Contents

```text
src/                → Plugin source code (TypeScript)
docs/               → Final paper and presentation
imgs/               → Screenshots and plugin visuals
README.md           → Documentation (this file)
main.pdf/tex        → Final academic paper
bibliography.bib    → References for research
