export function unquote(s: string): string {
  return s.replace(/^"|"$/g, '');
}

type PropDescriptor = {
  name: string;
  type: { name: string; value?: string[] };
  defaultValue: { value: string } | null;
  required: boolean;
  description: string;
};

export function initialDefaults(props: readonly PropDescriptor[]): Record<string, string> {
  return Object.fromEntries(
    props.map((p) => [p.name, p.defaultValue?.value ?? (p.type.name === 'boolean' ? 'false' : '')]),
  );
}

export function generateCode(name: string, values: Record<string, string>, children?: string): string {
  const attrs = Object.entries(values)
    .map(([k, v]) => {
      const clean = unquote(v);
      if (clean === '' || clean === 'false') return '';
      if (clean === 'true') return k;
      return `${k}="${clean}"`;
    })
    .filter(Boolean)
    .join(' ');
  return `<${name}${attrs ? ` ${attrs}` : ''}>${children ?? ''}</${name}>`;
}
