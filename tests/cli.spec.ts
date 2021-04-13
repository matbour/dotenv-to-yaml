import { spawnSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '..');
const cli = join(root, 'dist', 'cli.js');
const datasets = join(root, 'tests', 'datasets');
const args = join(datasets, 'args');
const cases = join(datasets, 'cases');

describe('dotenv-to-yaml cli', () => {
  beforeAll(() => {
    // Compile the cli
    // execSync('npm run build');
  });

  it.each([
    [[], '.env.yaml'],
    [['.env'], '.env.yaml'],
    [['test.env'], 'test.env.yaml'],
  ])('should parse convert args %p to %p', (argv, name) => {
    const output = join(args, name);

    if (existsSync(output)) {
      unlinkSync(output);
    }

    spawnSync(cli, argv, { cwd: args });
    expect(existsSync(output)).toBeTruthy();
  });

  it.each(readdirSync(cases).filter(name => name.endsWith('.env')))('should convert %p from STDIN', (file) => {
    const dotenv = readFileSync(join(cases, file), { encoding: 'utf-8' });
    const yaml = readFileSync(join(cases, `${file}.yaml`), { encoding: 'utf-8' });

    const { stdout } = spawnSync(cli, [], { input: dotenv });
    expect(stdout.toString().trim()).toBe(yaml.trim());
  });
});