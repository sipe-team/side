import { Fragment } from 'react';

import { unquote } from './generateCode';

type PropDescriptor = {
  name: string;
  type: { name: string; value?: string[] };
  defaultValue: { value: string } | null;
  required: boolean;
  description: string;
};

type ControlsPanelProps = {
  propsSchema: readonly PropDescriptor[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
};

const fieldClass =
  'rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:border-gray-400';

const checkboxClass = 'h-4 w-4 accent-[var(--side-color-accent-default,#ffb24d)]';

function isBooleanEnum(type: PropDescriptor['type']): boolean {
  return (
    type.name === 'enum' &&
    type.value?.length === 2 &&
    type.value.every((v) => unquote(v) === 'true' || unquote(v) === 'false')
  );
}

function isControllable(prop: PropDescriptor): boolean {
  const { type } = prop;
  return (type.name === 'enum' && !!type.value) || type.name === 'boolean' || type.name === 'string';
}

export function ControlsPanel({ propsSchema, values, onChange }: ControlsPanelProps) {
  const controls = propsSchema.filter(isControllable);

  return (
    <div className="border-t border-gray-200">
      <div className="px-4 py-2.5 text-sm font-medium text-gray-500">Controls</div>
      {controls.length === 0 ? (
        <p className="px-4 pb-4 text-sm text-gray-400">No adjustable props</p>
      ) : (
        <div className="grid grid-cols-[7rem_1fr] items-center gap-x-4 gap-y-3 px-4 pb-4 text-sm">
          {controls.map((prop) => {
            const { name, type } = prop;
            const id = `ctrl-${name}`;
            const checked = values[name] === 'true';

            let control: JSX.Element;
            if (isBooleanEnum(type) || type.name === 'boolean') {
              control = (
                <input
                  id={id}
                  type="checkbox"
                  className={checkboxClass}
                  checked={checked}
                  onChange={(e) => onChange(name, e.target.checked ? 'true' : 'false')}
                />
              );
            } else if (type.name === 'enum' && type.value) {
              control = (
                <select
                  id={id}
                  className={`${fieldClass} w-full max-w-xs`}
                  value={values[name] ?? ''}
                  onChange={(e) => onChange(name, e.target.value)}
                >
                  {type.value.map((v) => {
                    const clean = unquote(v);
                    return (
                      <option key={clean} value={clean}>
                        {clean}
                      </option>
                    );
                  })}
                </select>
              );
            } else {
              control = (
                <input
                  id={id}
                  type="text"
                  className={`${fieldClass} w-full max-w-xs`}
                  value={values[name] ?? ''}
                  onChange={(e) => onChange(name, e.target.value)}
                />
              );
            }

            return (
              <Fragment key={name}>
                <label htmlFor={id} className="truncate font-medium text-gray-700">
                  {name}
                </label>
                {control}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
