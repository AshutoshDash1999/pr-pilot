# PR Pilot

A Tauri + React + TypeScript application with comprehensive code quality tools.

## Code Quality & Development Tools

This project is configured with a comprehensive set of tools to ensure code quality, consistent style, and automated checks:

### 🚀 **Code Quality Tools**

- **ESLint** - JavaScript/TypeScript linting with React-specific rules
- **Prettier** - Code formatting and style consistency
- **TypeScript** - Static type checking with strict configuration
- **Husky** - Git hooks for pre-commit and commit-msg validation
- **lint-staged** - Run linters only on staged files
- **Commitlint** - Enforce conventional commit message format

### 📝 **Available Scripts**

```bash
# Code quality checks
pnpm lint              # Run ESLint on source files
pnpm lint:fix          # Run ESLint with auto-fix
pnpm format            # Format code with Prettier
pnpm format:check      # Check if code is properly formatted
pnpm type-check        # Run TypeScript type checking
pnpm quality           # Run all quality checks (lint + format + type-check)

# Development
pnpm dev               # Start development server
pnpm build             # Build for production
pnpm preview           # Preview production build
pnpm tauri             # Tauri commands
```

### 🔧 **Git Hooks**

The following Git hooks are automatically configured:

- **pre-commit**: Runs lint-staged to check and fix code quality issues
- **commit-msg**: Validates commit messages using conventional commit format

### 📋 **Conventional Commits**

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
type(scope): description

Examples:
feat: add new user authentication
fix(auth): resolve login validation issue
docs: update API documentation
style: format code according to style guide
refactor: restructure user management module
test: add unit tests for auth service
chore: update dependencies
```

### 🎨 **Code Style**

- **Prettier**: Automatic code formatting on save
- **ESLint**: Code quality rules and best practices
- **TypeScript**: Strict type checking enabled
- **React**: Hooks rules and accessibility guidelines

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
