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

const headCell = 'border-b border-gray-200 px-4 py-2.5 text-left text-sm font-medium text-gray-500';
const bodyCell = 'border-b border-gray-100 px-4 py-3 align-top';
const chip = 'inline-block break-words rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px] leading-5';

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
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th scope="col" className={headCell}>
            Name
          </th>
          <th scope="col" className={headCell}>
            Type
          </th>
          <th scope="col" className={headCell}>
            Default
          </th>
          <th scope="col" className={headCell}>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {propsSchema.map((prop) => (
          <tr key={prop.name} className="hover:bg-gray-50">
            <td className={bodyCell}>
              <code className={`${chip} text-gray-900`}>{prop.name}</code>
            </td>
            <td className={bodyCell}>
              <code className={`${chip} text-gray-700`}>{renderType(prop)}</code>
            </td>
            <td className={bodyCell}>
              <code className={`${chip} text-gray-700`}>{renderDefault(prop)}</code>
            </td>
            <td className={`${bodyCell} text-gray-600`}>{prop.description || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
