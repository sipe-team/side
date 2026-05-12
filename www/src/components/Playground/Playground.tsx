import { useMemo, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import BrowserOnly from '@docusaurus/BrowserOnly';

import { ControlsPanel } from './ControlsPanel';
import { generateCode, initialDefaults } from './generateCode';
import { PropTable } from './PropTable';
import { type ComponentRegistryKey, componentRegistry } from './registry';

type PlaygroundProps = {
  component: string;
};

type RegistryEntry = (typeof componentRegistry)[ComponentRegistryKey];

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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <LiveProvider code={code} scope={entry.scope as Record<string, unknown>}>
        <div className="grid grid-cols-2 border-b border-gray-200">
          <div className="border-r border-gray-200">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200 uppercase tracking-wider">
              Editor
            </div>
            <LiveEditor className="text-sm" />
          </div>
          <div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200 uppercase tracking-wider">
              Preview
            </div>
            <div className="p-6 flex items-center justify-center">
              <LivePreview />
            </div>
            <LiveError className="text-red-500 text-xs p-2" />
          </div>
        </div>
        <ControlsPanel
          propsSchema={entry.props as Parameters<typeof ControlsPanel>[0]['propsSchema']}
          values={controlValues}
          onChange={(name, value) => setControlValues((prev) => ({ ...prev, [name]: value }))}
        />
      </LiveProvider>
      <div className="p-4 border-t border-gray-100">
        <strong className="block mb-3 text-sm">Props</strong>
        <PropTable propsSchema={entry.props as Parameters<typeof PropTable>[0]['propsSchema']} />
      </div>
    </div>
  );
}

export function Playground({ component }: PlaygroundProps) {
  const entry = componentRegistry[component as ComponentRegistryKey];

  if (!entry) {
    return (
      <div className="p-4 text-red-500 border border-red-500 rounded">
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
