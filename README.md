# GenBr - Brazilian Data Generator Extension

[![CI](https://github.com/cicerotcv/br-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/cicerotcv/br-gen/actions/workflows/ci.yml)
[![Version](https://img.shields.io/github/v/release/cicerotcv/br-gen?label=version&color=blue)](https://github.com/cicerotcv/br-gen/releases)
[![License](https://img.shields.io/github/license/cicerotcv/br-gen?color=blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9-F69220?logo=pnpm)](https://pnpm.io/)

A Chrome browser extension for generating Brazilian placeholder data including CPF, CNPJ, emails, phone numbers, and UUIDs. Built with React, TypeScript, and Vite with full internationalization support.

## Features

- **🇧🇷 Brazilian Data Generation**
  - CPF (with/without mask)
  - CNPJ (with/without mask)
  - Email addresses
  - Phone numbers (landline and mobile)
  - UUID v4

- **🌐 Internationalization**
  - English (en)
  - Portuguese Brazil (pt_BR)
  - Automatic language detection based on browser locale

- **⚙️ Configurable Options**
  - Toggle data masking on/off
  - Auto-copy generated values to clipboard
  - History tracking for generated values

- **🎨 Modern UI**
  - Built with Radix UI components
  - Tailwind CSS styling
  - Dark mode support
  - Responsive design

## Installation

### From Release (Recommended)
1. Download the latest `dist.zip` from the [Releases page](../../releases)
2. Extract the ZIP file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extracted folder

### From Source
```bash
# Clone the repository
git clone https://github.com/cicerotcv/br-gen.git
cd br-gen

# Install dependencies
pnpm install

# Build the extension
pnpm build

# Load the dist/ folder in Chrome Extensions
```

## Development

### Prerequisites
- Node.js 20+
- pnpm

### Setup
```bash
# Install dependencies
pnpm install

# Start development server (for UI development)
pnpm dev

# Build for production
pnpm build

# Build and create ZIP for distribution
pnpm build:zip

# Lint code
pnpm lint

# Format code
pnpm prettier:fix
```

### Development Workflow

**Option 1: Web Development Mode**
```bash
pnpm dev
# Opens http://localhost:5173
# Good for UI development with hot reload
```

**Option 2: Extension Development Mode**
```bash
pnpm build
# Load dist/ folder in Chrome Extensions
# Required for testing Chrome-specific features
```

### Project Structure

```
src/
├── components/          # React components
│   ├── generator/       # Data generation components
│   ├── layout/          # Layout components
│   └── settings/        # Settings components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── modules/             # Business logic modules
│   └── generators/      # Data generation algorithms

public/
├── _locales/           # Chrome extension locale files
│   ├── en/
│   └── pt_BR/
└── manifest.json       # Chrome extension manifest
```

## Technologies Used

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI / Shadcn
- **Internationalization**: Chrome i18n API with development fallback
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request to the main branch

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.