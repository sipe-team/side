# Contributing to Sipe Design System

We love your input! We want to make contributing to this project as easy and transparent as possible. This document outlines the process for contributing to our component library.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/3-1_sds.git`
3. Install dependencies: `pnpm install`

## Creating a New Component

1. Copy the [.templates/component](.templates/component) folder to `packages/your-component-name`
2. Follow the test-driven development process:
   - Write test cases first in `src/Component.test.tsx`
   - Implement the component to pass the tests
   - Create stories in Storybook for documentation
3. Run the test suite: `pnpm test`