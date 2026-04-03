# Secure Password Genie 🔐

A fast, secure, and fully client-side password generator built with React and Vite. All passwords are generated locally in your browser — nothing is ever sent to a server.

## Features

- Customizable password length (8–64 characters)
- Toggle uppercase, lowercase, numbers, and special characters
- Exclude visually similar characters (e.g. `0`, `O`, `l`, `1`)
- Password strength indicator
- Password history — quickly revisit recently generated passwords
- Animated scramble effect on generation
- One-click clipboard copy
- Keyboard shortcut: press **Space** on the main page to generate a new password

## Getting Started

**Requirements:** Node.js ≥ 18 and npm installed — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone https://github.com/birajdarushi/secure-password-genie.git

# Navigate into the project directory
cd secure-password-genie

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Tech Stack

- [Vite](https://vitejs.dev/) — lightning-fast build tool
- [React](https://react.dev/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — accessible component primitives
- [TypeScript](https://www.typescriptlang.org/) — type-safe development

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
