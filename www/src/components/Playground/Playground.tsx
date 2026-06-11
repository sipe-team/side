import { useMemo, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import BrowserOnly from '@docusaurus/BrowserOnly';
import { themes } from 'prism-react-renderer';

import { ControlsPanel } from './ControlsPanel';
import { generateCode, initialDefaults } from './generateCode';
import { PropTable } from './PropTable';
import { type ComponentRegistryKey, componentRegistry } from './registry';

type PlaygroundProps = {
  component: string;
};

type RegistryEntry = (typeof componentRegistry)[ComponentRegistryKey];

const sectionLabel = 'px-4 py-2.5 text-sm font-medium text-gray-500';

// A dark "stage" with a soft center spotlight and a faint dot grid, so the
// component reads as placed on a surface rather than floating in a black void.
const stageStyle: React.CSSProperties = {
  backgroundColor: 'var(--side-color-background-base, #111111)',
  backgroundImage:
    'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,255,255,0.10), rgba(255,255,255,0) 70%), radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.5px)',
  backgroundSize: '100% 100%, 18px 18px',
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 motion-reduce:transition-none"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function PlaygroundInner({ entry, componentKey }: { entry: RegistryEntry; componentKey: string }) {
  const componentName = componentKey.charAt(0).toUpperCase() + componentKey.slice(1);

  const [controlValues, setControlValues] = useState<Record<string, string>>(() =>
    initialDefaults(entry.props as Parameters<typeof initialDefaults>[0]),
  );

  const code = useMemo(
    () => generateCode(componentName, controlValues, entry.defaultChildren),
    [componentName, controlValues, entry.defaultChildren],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <LiveProvider code={code} scope={entry.scope as Record<string, unknown>} theme={themes.vsDark}>
        {/* Preview: a dark stage so the component renders on its intended token background */}
        <div>
          <div className={sectionLabel}>Preview</div>
          <div className="flex min-h-[200px] items-center justify-center px-6 py-12" style={stageStyle}>
            <LivePreview />
          </div>
        </div>

        {/* Code: always visible alongside the preview so control edits update both at once */}
        <div className="border-t border-gray-200">
          <div className="flex items-center justify-between py-2.5 pl-4 pr-2">
            <span className="text-sm font-medium text-gray-500">Code</span>
            <CopyButton code={code} />
          </div>
          <LiveEditor className="font-mono text-sm" style={{ padding: 16 }} />
        </div>

        <LiveError className="border-t border-red-100 bg-red-50 p-3 font-mono text-xs text-red-600" />

        {/* Controls */}
        <ControlsPanel
          propsSchema={entry.props as Parameters<typeof ControlsPanel>[0]['propsSchema']}
          values={controlValues}
          onChange={(name, value) => setControlValues((prev) => ({ ...prev, [name]: value }))}
        />
      </LiveProvider>

      {/* Props */}
      <div className="border-t border-gray-200">
        <div className={sectionLabel}>Props</div>
        <PropTable propsSchema={entry.props as Parameters<typeof PropTable>[0]['propsSchema']} />
      </div>
    </div>
  );
}

export function Playground({ component }: PlaygroundProps) {
  const entry = componentRegistry[component as ComponentRegistryKey];

  if (!entry) {
    return (
      <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-600">
        Unknown component: &quot;{component}&quot;. Available: {Object.keys(componentRegistry).join(', ')}
      </div>
    );
  }

  return (
    <BrowserOnly fallback={<div>Loading playground...</div>}>
      {() => <PlaygroundInner entry={entry} componentKey={component} />}
    </BrowserOnly>
  );
}
