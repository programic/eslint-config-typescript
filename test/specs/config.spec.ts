import { Linter } from 'eslint';
import Config = Linter.Config;
import ConfigOverride = Linter.ConfigOverride;

/* eslint-disable-next-line max-len */
/* eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const config: Config = require('../..');

const expectIsObject = (value: unknown): void => {
  expect(value).not.toBeNull();
  expect(typeof value).toBe('object');
  expect(Array.isArray(value)).toBe(false);
};
const expectIsArrayOfLength = (givenArray: unknown, length: number): void => {
  expect(Array.isArray(givenArray)).toBe(true);
  expect(givenArray).toHaveLength(length);
};
const getOverrideForJsFiles = (
  overrides: ConfigOverride[],
): Linter.ConfigOverride<Linter.RulesRecord> | undefined => {
  return overrides.find((override: ConfigOverride) => {
    return Array.isArray(override.files)
      && override.files.length === 1
      && override.files[0] === '*.js';
  });
};
const getOverrideForTsFiles = (
  overrides: ConfigOverride[],
): Linter.ConfigOverride<Linter.RulesRecord> | undefined => {
  return overrides.find((override: ConfigOverride) => {
    return Array.isArray(override.files)
      && override.files.length === 2
      && override.files[0] === '*.ts'
      && override.files[1] === '*.tsx';
  });
};

describe('valid config', () => {
  // eslint-disable-next-line jest/expect-expect
  it('is an object', () => {
    expectIsObject(config);
  });

  it('uses the @typescript-eslint plugin', () => {
    expectIsArrayOfLength(config.plugins, 1);
    expect(config.plugins?.[0]).toBe('@typescript-eslint');
  });

  it('only extends programic-base and plugin:@typescript-eslint/recommended', () => {
    const overrideForTsFiles = getOverrideForTsFiles(config?.overrides ?? []);

    expectIsArrayOfLength(overrideForTsFiles?.extends, 2);
    expect(overrideForTsFiles?.extends?.[0]).toBe('@programic/eslint-config-base');
    expect(overrideForTsFiles?.extends?.[1]).toBe('plugin:@typescript-eslint/recommended');
    expect(overrideForTsFiles?.parserOptions).toHaveProperty('project');
  });

  it('uses the default ESLint parser (Espree) for .js files', () => {
    const overrideForJsFiles = getOverrideForJsFiles(config?.overrides ?? []);

    expectIsObject(overrideForJsFiles);
    expect(overrideForJsFiles?.parser).toBe('espree');
  });

  it('only extends programic-base for .js files', () => {
    const overrideForJsFiles = getOverrideForJsFiles(config?.overrides ?? []);

    expectIsObject(overrideForJsFiles);
    expectIsArrayOfLength(overrideForJsFiles?.extends, 1);
    expect(overrideForJsFiles?.extends?.[0]).toBe('@programic/eslint-config-base');
  });
});
