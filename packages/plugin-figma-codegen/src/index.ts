if (figma.editorType !== 'dev' || figma.mode !== 'codegen') {
  figma.closePlugin();
}

figma.codegen.on('generate', async ({ node }) => {
  const ComponentName = node.name;

  if (node.type === 'INSTANCE') {
    const props = node.componentProperties;
    const result = Object.entries(props).map(([name, { value }]) => `${name}="${value}"`);

    return [
      {
        title: ComponentName,
        language: 'TYPESCRIPT',
        code: `<${ComponentName} ${result.join(' ')} />`,
      },
    ];
  }

  return [];
});
