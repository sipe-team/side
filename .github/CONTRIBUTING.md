# Contributing to Sipe Design System

Welcome to our project!
We want to make contributing to **Side (Sipe Design System)** as straightforward and transparent as possible.
This document provides a clear guide to help you get started and contribute effectively.

### What is Side?
Side refers to the Sipe Design System, our primary UI component library aimed at creating consistent and reusable interfaces.

---

## Getting Started

### Fork and Clone the Repository
First, fork the [repository](https://github.com/sipe-team/side) and then clone it locally:
```bash
git clone https://github.com/your-username/side.git
```

### Setup Toolchain with mise
We use **mise** to unify the local Node.js and pnpm versions.

Install tools first:
```bash
mise install
```

If you see a trust warning, run this once and retry:
```bash
mise trust
```
Run this only for repositories you trust.

Add the activation command for your shell:

zsh:
```zsh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

bash:
```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
```

PowerShell:
```powershell
echo 'mise activate pwsh | Out-String | Invoke-Expression' >> ~/.config/powershell/Microsoft.PowerShell_profile.ps1
```

Then install dependencies:

```bash
pnpm install
```

If you use VS Code or Cursor, we recommend these extensions:
- `hverlin.mise-vscode` for mise integration
- `tombi-toml.tombi` for `mise.toml` syntax highlighting and completion

---

## Developing

### Create New Components
Use the CLI to create new components. The generated components will be placed under the `packages/` directory:
```bash
pnpm create:component
```

- **Naming Convention:** Use kebab-case for component names (e.g., `my-button`).
- **Styling:** Prioritize using predefined styles from the `tokens` package.

### Testing
We use **Vitest** for testing.  
All new features or changes must include **relevant test cases**.

```bash
pnpm test
```
**Minimum Testing Requirements:**
- Cover all primary use cases.
- Ensure edge cases are tested.

### Storybook
We use **Storybook** for visual testing of components.  
All components must include Storybook documentation.  
Run the following command to view your components at `http://localhost:6006`:
```bash
pnpm dev:storybook
```

---

## How to Propose Changes
Before proposing changes, please **open an issue** to discuss the bug or feature.

### Create a Pull Request

1. **Create a Branch**  
   Follow the branch naming convention: `<CATEGORY>/<SUBJECT>-<USERNAME>`
   - `USERNAME` is required (at least one hyphen must be present)
   ```bash
   git checkout -b feature/button-john
    ```

    | **Category**  | **Description**                                     |
    |---------------|-----------------------------------------------------|
    | **feature**   | Developing a new feature                            |
    | **fix**       | Fixing a bug                                        |
    | **docs**      | Documentation updates or additions                  |
    | **style**     | Code style changes (formatting, no logic change)    |
    | **refactor**  | Code refactoring without functional changes         |
    | **test**      | Writing or modifying test cases                     |
    | **deploy**    | Deployment-related changes                          |
    | **chore**     | Maintenance tasks or minor updates                  |
    | **settings**  | Configuration or settings changes                   |

2. **Commit Changes**  
   Write meaningful commit messages using the [Conventional Commits](https://www.conventionalcommits.org/) format:
   ```bash
   git commit -m "<type>(<scope>): <subject>"
   ```
   We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard with [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional):

   | Element      | Requirement  | Description                                                                                                                                                                    |
   |--------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | `<type>`     | **Required** | Describes the purpose of the commit: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`                                             |
   | `<scope>`    | **Optional** | Specifies the affected module, file, or functionality (e.g., `auth`, `header`).                                                                                                |
   | `<subject>`  | **Required** | A concise summary of the changes<br/> - Starts with a lowercase letter<br/> - Avoid ending with a period (.)<br/> - Cannot be empty                                           |



3. **Push Changes**  
   Push the branch to your forked repository:
   ```bash
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
