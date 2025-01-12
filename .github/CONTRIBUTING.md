# Contributing to Sipe Design System

Welcome to our project! We want to make contributing to this project as easy and transparent as possible.
This document provides a clear guide on **how to contribute to Side(Sipe Design System)**.
We've outlined the process to ensure contributing is as easy and transparent as possible.

### What is Side?
Side refers to the Sipe Design System, our primary UI component library aimed at creating consistent and reusable interfaces.

---

## Getting Started

### Fork and Clone the Repository
First, fork the [repository](https://github.com/sipe-team/3-2_side) and then clone it locally:
```sh
git clone https://github.com/your-username/3-2_side.git
```

### Install Dependencies
Install the necessary dependencies:
```sh
pnpm install
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
Run the following command to view your components at `http://localhost:6006`:
```sh
pnpm dev:storybook
```

---

## How to Propose Changes
Before proposing changes, please **open an issue** to discuss the bug or feature.

### Create a Pull Request

1. **Create a Branch**  
   Follow the branch naming convention: `<CATEGORY>/<ISSUENUMBER>-<SUBJECT>` (`ISSUENUMBER` is optional)
   ```sh
   git checkout -b your-branch
    ```

    | **Category** | **Description**                                     |
    |--------------|-----------------------------------------------------|
    | **feat**     | Developing a new feature                            |
    | **fix**      | Fixing a bug                                        |
    | **hotfix**   | Emergency fixes for immediate release               |
    | **chore**    | Maintenance tasks or minor updates                  |
    | **refactor** | Code refactoring without functional changes         |
    | **release**  | Preparing for a new release version                 |
    | **test**     | Writing or modifying test cases                     |
    | **docs**     | Documentation updates or additions                  |
    | **ci**       | CI/CD pipeline updates                              |
    | **build**    | Changes to the build system or dependencies         |

2. **Commit Changes**  
   Write meaningful commit messages using the [Conventional Commits](https://www.conventionalcommits.org/) format:
   ```sh
   git commit -m "<type>(<scope>): <subject>"
   ```
   We recommend following the Conventional Commits standard for clear and consistent commit messages. Below is the suggested structure:
 
   | Element      | Requirement  | Description                                                                                                                                                            |
   |--------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | `<type>`     | **Required** | Describes the purpose of the commit. Examples: `feat`, `fix`, `docs`, `style`, `refactor`, `test`.                                                                     |
   | `<scope>`    | **Optional** | Specifies the affected module, file, or functionality. Limited to **20 characters** (e.g., `auth`, `header`).                                                          |
   | `<subject>`  | **Required** | A concise summary of the changes:<br/> - Starts with a lowercase letter.<br/> - Avoid ending with a period (`.`).<br/> - Limited to **50 characters**. - Written in **English**. |



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
