# Contributing to Secure Password Genie

Thank you for considering contributing! Here are some guidelines to help you get started.

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Create a new branch for your change: `git checkout -b feat/your-feature-name`

## Reporting Bugs

- Search existing issues before opening a new one.
- Include steps to reproduce, expected behaviour, and actual behaviour.
- Attach screenshots or screen recordings where helpful.

## Submitting a Pull Request

1. Keep PRs focused — one feature or fix per PR.
2. Write clear commit messages in the imperative mood (`fix: ...`, `feat: ...`, `docs: ...`).
3. Ensure `npm run lint` passes before submitting.
4. Add or update tests when adding new behaviour.
5. Reference related issues with `Fixes #<issue-number>` in the PR description.

## Code Style

- Follow the existing ESLint configuration (`eslint.config.js`).
- Use Tailwind CSS utility classes for styling — avoid custom CSS where possible.
- Prefer named exports for components.

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|--------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code changes that are neither a fix nor a feature |
| `chore` | Build process or tooling changes |

## Code of Conduct

Please be respectful and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
