# Contributing Guide

Welcome! This project is intentionally simple: pure HTML, CSS, and JavaScript. No frameworks or build tools. Perfect for learning open-source workflow.

## Ground rules

- Keep changes in HTML/CSS/JS only.
- Prefer small, focused pull requests.
- Write clear commit messages and PR descriptions.
- Keep designs accessible (labels for inputs, good contrast, keyboard support).

## Typical workflow

1. Fork the repo on GitHub.
2. Clone your fork locally.
3. Create a branch:
   - `feat/<short-name>` for features
   - `fix/<short-name>` for bug fixes
   - `docs/<short-name>` for documentation
4. Make your change:
   - Edit `index.html`, `styles.css`, or `app.js`.
   - Open `index.html` in your browser to test.
5. Commit and push your branch.
6. Open a Pull Request to the main repo. Link any related issue and explain what you changed.

## Code style

- Plain, readable JavaScript. Avoid clever one-liners.
- Use meaningful names and early returns for clarity.
- Keep CSS organized and prefer variables (see `:root` in `styles.css`).
- Ensure the UI works on mobile and desktop.

## Ideas for your first PR

- Dark mode toggle (store preference in `localStorage`)
- Edit a todo by clicking its text
- Filter todos: `All | Active | Completed`
- Improve keyboard support (Enter/Space on controls, focus outlines)
- Empty state UI and helpful tips
- README improvements or translations

Thanks for contributing!
