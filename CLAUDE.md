# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QOF Target Forecast is a dashboard application for forecasting NHS Quality and Outcomes Framework (QOF) targets. It helps GP practices visualize and track their QOF performance across various clinical and public health domains.

## Development Commands

All commands should be run from the `qof-dashboard-react` directory:

```bash
cd qof-dashboard-react

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Architecture

**Tech Stack:** React 18 with Vite 6, TypeScript (strict), TailwindCSS, React Router v6

### Key Directories

- `qof-dashboard-react/src/pages/` - Route pages (Dashboard, Summary, Indicators)
- `qof-dashboard-react/src/components/` - React components (Header, HeroSection, IndicatorsTargetCards, IndicatorsHypertensionSummary, IndicatorsMergedSummary, IndicatorsContent)
- `qof-dashboard-react/src/hooks/` - Custom hooks for shared state and data logic
- `qof-dashboard-react/src/data/` - TypeScript data modules (forecastData, indicatorsData, conditionMappings, targetMappings)
- `qof-dashboard-react/src/styles/main.css` - Custom CSS including circular progress indicators and progress bar styles

### Custom Hooks

- `useForecastData.ts` - Provides forecast percentages and estimated values per condition (current, withPlanner, withSuvera)
- `useIndicatorsData.ts` - Provides QOF indicator data, summary breakdowns, and financial year progress calculations

### Data Flow

Clinical conditions (hypertension, diabetes, COPD, etc.) are tracked with QOF target codes (e.g., HYP008, DM017). Each condition has:
- Completion percentages broken down by: complete, incomplete, exceptionInvited, exceptionClinical
- Forecasting data showing current achievement vs projected achievement
- Financial year progress tracking (April 1 - March 31)

### Page Structure

- **Dashboard (`/`)** - Main view with condition cards, HeroSection forecast, and expandable condition details using IndicatorsMergedSummary
- **Summary (`/summary`)** - QOF performance overview table with all 54 QOF targets
- **Indicators (`/indicators`)** - Detailed indicator views with target cards

### Component Patterns

- Condition selection uses multi-select toggle pattern storing expanded conditions in useState array
- Progress visualization uses both circular SVG indicators and horizontal stacked bar charts
- Target achievement thresholds displayed as dashed lines at 40% (minimum) and 77-85% (max achievement)
- IndicatorsHypertensionSummary shows stacked bar charts with threshold markers for conditions with targetDetails
- IndicatorsTargetCards shows detailed view with Exception Reporting Analysis and Resource Planning sections

### TypeScript Configuration

The project uses strict TypeScript with additional checks enabled:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`

### ESLint Configuration

Uses typescript-eslint with strict type-checked rules and React hooks plugin.

## Legacy Version

The original Nuxt 4/Vue 3 implementation is preserved in `qof-dashboard-legacy/` for reference. This version is no longer actively developed.
