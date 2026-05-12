import { unquote } from './generateCode';

type PropDescriptor = {
  name: string;
  type: { name: string; value?: string[] };
  defaultValue: { value: string } | null;
  required: boolean;
  description: string;
};

type PropTableProps = {
  propsSchema: readonly PropDescriptor[];
};

function renderType(prop: PropDescriptor): string {
  if (prop.type.name === 'enum' && prop.type.value) {
    return prop.type.value.map((v) => `"${unquote(v)}"`).join(' | ');
  }
  return prop.type.name;
}

function renderDefault(prop: PropDescriptor): string {
  if (prop.defaultValue === null) return '-';
  return unquote(prop.defaultValue.value);
}

export function PropTable({ propsSchema }: PropTableProps) {
  return (
    <table className="w-full border-collapse text-sm mt-6">
      <thead>
        <tr>
          <th className="text-left px-3 py-2 border-b-2 border-gray-100 font-semibold">Name</th>
          <th className="text-left px-3 py-2 border-b-2 border-gray-100 font-semibold">Type</th>
          <th className="text-left px-3 py-2 border-b-2 border-gray-100 font-semibold">Default</th>
          <th className="text-left px-3 py-2 border-b-2 border-gray-100 font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        {propsSchema.map((prop) => (
          <tr key={prop.name}>
            <td className="px-3 py-2 border-b border-gray-100 align-top">
              <code className="font-mono text-[13px]">{prop.name}</code>
            </td>
            <td className="px-3 py-2 border-b border-gray-100 align-top">
              <code className="font-mono text-[13px]">{renderType(prop)}</code>
            </td>
            <td className="px-3 py-2 border-b border-gray-100 align-top">
              <code className="font-mono text-[13px]">{renderDefault(prop)}</code>
            </td>
            <td className="px-3 py-2 border-b border-gray-100 align-top">{prop.description || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
