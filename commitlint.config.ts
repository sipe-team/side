// https://commitlint.js.org/reference/configuration.html#typescript-configuration
import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  //   parserPreset: '',
  //   formatter: '',
  rules: {
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-max-length': [RuleConfigSeverity.Error, 'always', 50],
    'scope-max-length': [RuleConfigSeverity.Error, 'always', 20],
  },

  prompt: {
    settings: {},
    messages: {},
    questions: {},
  },
};

export default Configuration;
