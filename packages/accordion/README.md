# Accordion

A collapsible content component for the Sipe Design System.

## Installation

```bash
pnpm add @sipe-team/accordion
```

## Usage

```tsx
import { Accordion } from '@sipe-team/accordion';

function Example() {
  return (
    <Accordion.Root>
      <AccordionItem>
        <Accordion.Trigger>
          Trigger
        </Accordion.Trigger>
        <Accordion.Content>
          Content
        </Accordion.Content>
      </AccordionItem>
    </Accordion.Root>
  );
}
```

## Features

- Smooth open/close animations
- Accessible by default with correct ARIA attributes
- Customizable styling with vanilla-extract
- TypeScript support
- Using compound component pattern

## Components

### Accordion.Root

The container component for accordion items.

#### Props

| Name     | Type      | Default | Description                                                |
| -------- | --------- | ------- | ---------------------------------------------------------- |
| children | ReactNode | -       | The accordion items to render                              |
| asChild  | boolean   | false   | Change the component to the HTML tag or component supplied |
| className  | string   | -   | Additional CSS class name|
| ...props      | -         | -       | All other props are passed to the underlying div element   |

### Accordion.Item

An individual accordion section with a header and collapsible content.

#### Props

| Name        | Type      | Default | Description                                              |
| ----------- | --------- | ------- | -------------------------------------------------------- |
| children    | ReactNode | -       | The content to display when the accordion item is open   |
| defaultOpen | boolean   | false   | Whether the accordion item should be open by default     |
| className  | string   | -   | Additional CSS class name|
| ...props      | -         | -       | All other props are passed to the underlying div element   |


### Accordion.Trigger

The button that toggles the accordion item.

#### Props

| Name        | Type      | Default | Description                                              |
| ----------- | --------- | ------- | -------------------------------------------------------- |
| children    | ReactNode | -       | TThe content to display in the trigger button|
| className  | string   | -   | Additional CSS class name|
| ...props      | -         | -       | All other props are passed to the underlying div element   |


### Accordion.Content

The collapsible content section.

#### Props

| Name        | Type      | Default | Description                                              |
| ----------- | --------- | ------- | -------------------------------------------------------- |
| children    | ReactNode | -       | The content to display when the accordion item is open   |
| asChild  | boolean   | false   | Change the component to the HTML tag or component supplied |
| className  | string   | -   | Additional CSS class name|
| ...props      | -         | -       | All other props are passed to the underlying div element   |


## Styling

- This component uses vanilla-extract for styling. The styles are defined in `Accordion.css.ts`.
- You can customize the appearance by passing className props to individual components.


## Preview

- Run Storybook to preview Accodion

```bash
pnpm dev:storybook
```
