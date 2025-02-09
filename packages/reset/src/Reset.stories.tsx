import type { Meta, StoryObj } from '@storybook/react';
import { Reset } from './Reset';

const meta = {
  title: 'Components/Reset',
  component: Reset,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
} satisfies Meta<typeof Reset>;

export default meta;
type Story = StoryObj<typeof meta>;

const ComparisonWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: '1rem', width: '800px' }}>
    <div style={{ flex: 1 }}>
      <h3 style={{ background: '#f0f0f0', padding: '0.5rem' }}>Browser Default</h3>
      {children}
    </div>
    <div style={{ flex: 1 }}>
      <h3 style={{ background: 'lightblue', padding: '0.5rem' }}>With Reset</h3>
      <Reset>{children}</Reset>
    </div>
  </div>
);

// Typography
export const Typography: Story = {
  render: () => (
    <ComparisonWrapper>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <p>
        Regular paragraph with some <strong>bold</strong> and <em>italic</em> text.
      </p>
      <div
        style={{
          background: '#f0f0f0',
          padding: '1rem',
          width: '200px',
          border: '1px solid #ccc',
        }}
      >
        <p>ThisIsAVeryVeryVeryVeryVeryVeryVeryVeryLongStringWithoutSpaces</p>
      </div>
    </ComparisonWrapper>
  ),
};

// Form Elements
export const FormElements: Story = {
  render: () => (
    <ComparisonWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#f0f0f0', padding: '1rem' }}>
          <input type="text" placeholder="Text input" style={{ width: '100%' }} />
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem' }}>
          <textarea placeholder="Textarea" style={{ width: '100%' }} />
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem' }}>
          <select style={{ width: '100%' }}>
            <option>Select option 1</option>
            <option>Select option 2</option>
          </select>
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem' }}>
          <button type="button" style={{ marginRight: '1rem' }}>
            Regular Button
          </button>
          <button type="submit">Submit Button</button>
        </div>
      </div>
    </ComparisonWrapper>
  ),
};

export const Lists: Story = {
  render: () => (
    <ComparisonWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ background: '#f0f0f0', padding: '1rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Unordered List:</strong>
          <ul>
            <li>Unordered list item 1</li>
            <li>Unordered list item 2</li>
            <li>Unordered list item 3</li>
          </ul>
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Ordered List:</strong>
          <ol>
            <li>Ordered list item 1</li>
            <li>Ordered list item 2</li>
            <li>Ordered list item 3</li>
          </ol>
        </div>
      </div>
    </ComparisonWrapper>
  ),
};

export const MediaElements: Story = {
  render: () => (
    <ComparisonWrapper>
      <div>
        <img
          src="https://www.google.com/logos/doodles/2025/lunar-new-year-2025-south-korea-6753651837110589-s.png"
          alt="Placeholder"
        />
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ border: '1px solid #ccc' }}>
          <circle cx="50" cy="50" r="40" fill="#007AFF" />
        </svg>
      </div>
    </ComparisonWrapper>
  ),
};

export const Table: Story = {
  render: () => (
    <ComparisonWrapper>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
          </tr>
          <tr>
            <td>Cell 4</td>
            <td>Cell 5</td>
            <td>Cell 6</td>
          </tr>
        </tbody>
      </table>
    </ComparisonWrapper>
  ),
};

export const Links: Story = {
  render: () => (
    <ComparisonWrapper>
      <div>
        <a href="https://www.google.com" style={{ marginRight: '1rem' }}>
          Regular Link
        </a>
        <a href="https://www.google.com">Underlined Link</a>
      </div>
    </ComparisonWrapper>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <ComparisonWrapper>
      <div>
        <header style={{ padding: '1rem', background: '#f0f0f0' }}>Header</header>
        <nav style={{ padding: '1rem', background: '#e0e0e0' }}>Navigation</nav>
        <main style={{ padding: '1rem', background: '#d0d0d0' }}>Main Content</main>
        <footer style={{ padding: '1rem', background: '#f0f0f0' }}>Footer</footer>
      </div>
    </ComparisonWrapper>
  ),
};
