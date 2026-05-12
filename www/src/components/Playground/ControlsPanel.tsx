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

export function ControlsPanel({ propsSchema, values, onChange }: ControlsPanelProps) {
  return (
    <div className="p-4 border-t border-gray-100">
      <strong className="block mb-3 text-sm">Controls</strong>
      {propsSchema.map((prop) => {
        const { name, type } = prop;

        if (type.name === 'enum' && type.value) {
          const isBoolean =
            type.value.length === 2 && type.value.every((v) => unquote(v) === 'true' || unquote(v) === 'false');

          if (isBoolean) {
            return (
              <label key={name} className="flex items-center gap-2 mb-3 text-sm" htmlFor={`ctrl-${name}`}>
                <span className="min-w-[80px] font-medium">{name}</span>
                <input
                  id={`ctrl-${name}`}
                  type="checkbox"
                  checked={values[name] === 'true'}
                  onChange={(e) => onChange(name, e.target.checked ? 'true' : 'false')}
                />
              </label>
            );
          }

          return (
            <label key={name} className="flex items-center gap-2 mb-3 text-sm" htmlFor={`ctrl-${name}`}>
              <span className="min-w-[80px] font-medium">{name}</span>
              <select id={`ctrl-${name}`} value={values[name] ?? ''} onChange={(e) => onChange(name, e.target.value)}>
                {type.value.map((v) => {
                  const clean = unquote(v);
                  return (
                    <option key={clean} value={clean}>
                      {clean}
                    </option>
                  );
                })}
              </select>
            </label>
          );
        }

        if (type.name === 'boolean') {
          return (
            <label key={name} className="flex items-center gap-2 mb-3 text-sm" htmlFor={`ctrl-${name}`}>
              <span className="min-w-[80px] font-medium">{name}</span>
              <input
                id={`ctrl-${name}`}
                type="checkbox"
                checked={values[name] === 'true'}
                onChange={(e) => onChange(name, e.target.checked ? 'true' : 'false')}
              />
            </label>
          );
        }

        if (type.name === 'string') {
          return (
            <label key={name} className="flex items-center gap-2 mb-3 text-sm" htmlFor={`ctrl-${name}`}>
              <span className="min-w-[80px] font-medium">{name}</span>
              <input
                id={`ctrl-${name}`}
                type="text"
                value={values[name] ?? ''}
                onChange={(e) => onChange(name, e.target.value)}
              />
            </label>
          );
        }

        return null;
      })}
    </div>
  );
}
