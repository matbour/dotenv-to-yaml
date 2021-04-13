#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import getStdin from 'get-stdin';
import yargs from 'yargs';
import { dotenvToYAML } from './lib';

interface Args {
  source?: string;
  destination?: string;
}

(async () => {
  const raw = await getStdin();
  const stdin = raw.length > 0 ? raw : undefined;

  yargs(process.argv.slice(2))
    .command<Args>('$0 [source] [destination]', 'Transform a dotenv file to YAML one', (yargs) => {
        return yargs.positional('source', {
          describe: 'The source dotenv file or `-` if the file content is piped to STDIN.',
          type: 'string',
          default: stdin ? '-' : '.env',
        }).positional('destination', {
          describe: 'The destination YAML file or `-` to pipe the conversion result to STDOUT.',
          type: 'string',
          default: stdin ? '-' : '.env.yaml',
        });
      }, (argv) => {

        argv.source = argv.source ?? (stdin ? '-' : '.env');
        argv.destination = argv.destination ?? (stdin ? '-' : `${argv.source}.yaml`);

        const dotenv = stdin ?? readFileSync(argv.source, 'utf-8');
        const yaml = dotenvToYAML(dotenv);

        if (stdin || argv.destination === '-') {
          process.stdout.write(yaml);
        } else {
          writeFileSync(argv.destination, yaml);
        }
      },
    ).argv;
})().catch(error => {
  console.error(error?.message ?? error);
  process.exit(1);
});