/**
 * I Typed manually since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet.
 */

declare module 'eslint-plugin-react-hooks' {
  export const configs: {
    recommended: {
      rules: {
        'rules-of-hooks': Linter.RuleEntry;
        'exhaustive-deps': Linter.RuleEntry;
      };
    };
  };
  export const rules: Record<string, Rule.RuleModule>;
}
