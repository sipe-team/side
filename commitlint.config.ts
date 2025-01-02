const englishOnly = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>_-]+$/;

// https://commitlint.js.org/reference/configuration.html#typescript-configuration
import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  //   parserPreset: '',
  //   formatter: '',
  // https://commitlint.js.org/reference/plugins.html#working-with-plugins
  plugins: [
    {
      rules: {
        'subject-english-only': ({ subject }) => {
          if (!subject) return [true, ''];
          const valid = englishOnly.test(subject);
          return [valid, 'Commit subject must contain only English characters'];
        },
      },
    },
  ],
  rules: {
    // https://commitlint.js.org/reference/rules.html
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-max-length': [RuleConfigSeverity.Error, 'always', 50],
    'scope-max-length': [RuleConfigSeverity.Error, 'always', 20],

    // custom rules
    'subject-english-only': [RuleConfigSeverity.Error, 'always'],
  },

  prompt: {
    settings: {},
    messages: {},
    questions: {},
  },
};

export default Configuration;
