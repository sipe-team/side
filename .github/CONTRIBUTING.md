# Contributing to Sipe Design System

Welcome to our project! We want to make contributing to this project as easy and transparent as possible.
This document provides a clear guide on **how to contribute to Sipe Design System**.
We've outlined the process to ensure contributing is as easy and transparent as possible.

---

## Getting Started

### Fork and Clone the Repository
First, fork the repository and then clone it locally:
```sh
git clone https://github.com/your-username/3-2_side.git
```

### Install Dependencies
Install the necessary dependencies:
```sh
pnpm install
```

### Run Development Server
Run the development server to verify the setup:
```sh
pnpm dev
```

---

## Developing

### Create New Components
Use the CLI to create new components. The generated components will be placed under the `packages/` directory:
```sh
pnpm create:component
```

- **Naming Convention:** Use kebab-case for component names (e.g., `my-button`).
- **Styling:** Prioritize using predefined styles from the `tokens` package.

### Testing
We use **Vitest** for testing.  
All new features or changes must include **relevant test cases**.
```sh
pnpm test
```

### Storybook
We use **Storybook** for visual testing of components.  
All components must include Storybook documentation.  
Run the following command to view your components at `localhost:6006`:
```sh
pnpm dev:storybook
```

---

## How to Propose Changes
Before proposing changes, please **open an issue** to discuss the bug or feature.

### Create a Pull Request

1. **Create a Branch**  
   Follow the branch naming convention: `<type>/<subject>`
   ```sh
   git checkout -b feat/your-feature
   ```

2. **Commit Changes**  
   Write meaningful commit messages:
   ```sh
   git commit -m "feat: description"
   ```

3. **Push Changes**  
   Push the branch to your forked repository:
   ```sh
   git push -u origin HEAD
   ```

4. **Submit Pull Request (PR)**
   - Follow the PR template.
   - Provide a detailed description of your changes.

### Code Review & Feedback
- Address feedback from reviewers promptly.
- Push additional commits directly to the PR branch.

---

## Issue Reporting

We use **GitHub Issues** to track and manage problems and discussions.  
Please register your issue so we can discuss and decide on the next steps.

### Bug Reporting
- Check if a similar issue already exists.
- Clearly describe **reproduction steps**, **expected results**, and **actual results**.

### Feature Suggestions
- Describe the purpose and expected outcome of the feature in detail.  
