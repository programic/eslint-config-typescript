import { Linter } from 'eslint';
import Config = Linter.Config;
import ConfigOverride = Linter.ConfigOverride;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config:Config = require('../..');

const expectIsObject = (value: unknown) => {
  expect(value).not.toBeNull();
  expect(typeof value).toBe('object');
  expect(Array.isArray(value)).toBe(false);
};
const expectIsArrayOfLength = (arr: unknown, length: number) => {
  expect(Array.isArray(arr)).toBe(true);
  expect(arr).toHaveLength(length);
};
const getOverrideForJSFiles = (overrides:Array<ConfigOverride>) => {
  return overrides.find((override:ConfigOverride) => {
    return Array.isArray(override.files)
      && override.files.length === 1
      && override.files[0] === '*.js';
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
    expectIsArrayOfLength(config.extends, 2);
    expect(config.extends?.[0]).toBe('@programic/eslint-config-base');
    expect(config.extends?.[1]).toBe('plugin:@typescript-eslint/recommended');
  });

  it('uses the default ESLint parser (Espree) for .js files', () => {
    const overrideForJSFiles = getOverrideForJSFiles(config?.overrides ?? []);

    expectIsObject(overrideForJSFiles);
    expect(overrideForJSFiles?.parser).toBe('espree');
  });

  it('only extends programic-base for .js files', () => {
    const overrideForJSFiles = getOverrideForJSFiles(config?.overrides ?? []);

    expectIsObject(overrideForJSFiles);
    expectIsArrayOfLength(overrideForJSFiles?.extends, 1);
    expect(overrideForJSFiles?.extends?.[0]).toBe('@programic/eslint-config-base');
  });
});
