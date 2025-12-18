# Fintual Design System

A foundational Design System project that provides a unified solution for Fintual's web (React) and mobile (React Native) applications. Built with architectural decisions designed to last, featuring a dynamic color palette for Dark Mode support and distributable as NPM packages.

## 🏗️ Architecture

The Design System is organized as a monorepo with the following structure:

```
fintual/
├── packages/
│   ├── core/              # Core design tokens (colors, themes, types)
│   ├── react/             # React (web) components
│   └── react-native/      # React Native (mobile) components
└── examples/
    ├── web/               # React web example application
    └── mobile/            # React Native mobile example application
```

### Package Structure

- **`@fintual/design-system-core`**: Core utilities including color palettes, theme definitions, and shared types. Platform-agnostic and used by both React and React Native packages.

- **`@fintual/design-system-react`**: React components for web applications. Includes typography components that work seamlessly with React.

- **`@fintual/design-system-react-native`**: React Native components for mobile applications. Includes typography components optimized for mobile platforms.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Build all packages:

```bash
npm run build
```

## 📦 Packages

### Core Package

The core package provides the foundation for the design system:

```typescript
import { createTheme, getColors, ColorMode } from '@fintual/design-system-core';

const theme = createTheme('light'); // or 'dark'
const colors = getColors('light');
```

### React Package (Web)

Install in your React web application:

```bash
npm install @fintual/design-system-react
```

Usage:

```tsx
import { ThemeProvider, Text, Heading } from '@fintual/design-system-react';

function App() {
  return (
    <ThemeProvider mode="light">
      <Heading level={1}>Welcome to Fintual</Heading>
      <Text variant="lg" color="primary">
        This is a primary text
      </Text>
    </ThemeProvider>
  );
}
```

### React Native Package (Mobile)

Install in your React Native application:

```bash
npm install @fintual/design-system-react-native
```

Usage:

```tsx
import { ThemeProvider, Text, Heading } from '@fintual/design-system-react-native';

function App() {
  return (
    <ThemeProvider mode="light">
      <Heading level={1}>Welcome to Fintual</Heading>
      <Text variant="lg" color="primary">
        This is a primary text
      </Text>
    </ThemeProvider>
  );
}
```

## 🎨 Typography Components

The Design System includes comprehensive typography components that standardize text rendering across platforms.

### Text Component

The `Text` component provides flexible text rendering with consistent styling:

**Props:**
- `variant`: `'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'` - Text size variant
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'` - Font weight
- `color`: `'text' | 'textSecondary' | 'textDisabled' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'` - Text color
- `align`: `'left' | 'center' | 'right' | 'justify'` - Text alignment
- `lineHeight`: `'tight' | 'normal' | 'relaxed'` - Line height variant

**Example:**
```tsx
<Text variant="lg" weight="bold" color="primary" align="center">
  Centered bold primary text
</Text>
```

### Heading Component

The `Heading` component provides semantic heading elements:

**Props:**
- `level`: `1 | 2 | 3 | 4 | 5 | 6` - Heading level (h1-h6)
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'` - Font weight
- `color`: `'text' | 'textSecondary' | 'primary' | 'secondary'` - Text color
- `align`: `'left' | 'center' | 'right'` - Text alignment
- `lineHeight`: `'tight' | 'normal' | 'relaxed'` - Line height variant

**Example:**
```tsx
<Heading level={1} color="primary">
  Main Title
</Heading>
```

## 🌓 Dark Mode Support

The Design System includes built-in support for Dark Mode through a dynamic color palette:

```tsx
import { ThemeProvider } from '@fintual/design-system-react';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider mode={mode}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

All components automatically adapt to the current theme mode, ensuring consistent styling across light and dark themes.

## 📱 Example Applications

### Web Example

Run the React web example:

```bash
cd examples/web
npm install
npm run dev
```

The example demonstrates all typography components and theme switching capabilities.

### Mobile Example

Run the React Native mobile example:

```bash
cd examples/mobile
npm install
npm run ios    # For iOS
npm run android # For Android
```

The example demonstrates all typography components optimized for mobile platforms.

## 🏭 Publishing to NPM

Each package can be published independently to NPM:

```bash
cd packages/core
npm publish

cd ../react
npm publish

cd ../react-native
npm publish
```

Make sure to update version numbers in `package.json` before publishing.

## 🛠️ Development

### Building

Build all packages:

```bash
npm run build
```

Build a specific package:

```bash
cd packages/core
npm run build
```

### Cleaning

Clean all build artifacts:

```bash
npm run clean
```

## 📋 Design Decisions

### Monorepo Structure

- **Why**: Enables code sharing between packages while maintaining clear boundaries
- **Benefit**: Single source of truth for design tokens, easier maintenance

### Separate React and React Native Packages

- **Why**: Platform-specific optimizations and API differences
- **Benefit**: Optimal performance and developer experience for each platform

### Core Package Separation

- **Why**: Shared logic (colors, themes) should be platform-agnostic
- **Benefit**: Consistency across platforms, single source of truth for design tokens

### Dynamic Theme System

- **Why**: Future-proofing for Dark Mode and theme customization
- **Benefit**: Easy theme switching, extensible for future theme variations

## 🔮 Future Enhancements

- Additional UI components (Buttons, Cards, Inputs, etc.)
- Animation system
- Accessibility improvements
- Storybook documentation
- Automated visual regression testing
- Theme customization API
- Design token export for design tools

## 📄 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]

