import { readFileSync, writeFileSync } from 'fs';
import getStdin from 'get-stdin';
import { CommandModule } from 'yargs';
import { dotenvToYAML } from './lib';

interface Args {
  source?: string;
  destination?: string;
}

const command: CommandModule<Args, Args> = {
  command: '$0 [source] [destination]',
  describe: 'Transform a dotenv file to YAML one',
  builder: (yargs) => {
    return yargs.positional('source', {
      describe: 'The source dotenv file or `-` if the file content is piped to STDIN; defaults to `-` if data is passed to STDIN, `.env` otherwise.',
      type: 'string',
    }).positional('destination', {
      describe: 'The destination YAML file or `-` to pipe the conversion result to STDOUT; `-` if data is passed to STDIN, `[source].yaml` otherwise.',
      type: 'string',
    });
  },
  handler: (argv) => {
    (async (argv) => {
      const raw = await getStdin();
      const stdin = raw.length > 0 ? raw : undefined;

      argv.source = argv.source ?? (stdin ? '-' : '.env');
      argv.destination = argv.destination ?? (stdin ? '-' : `${argv.source}.yaml`);

      const dotenv = stdin ?? readFileSync(argv.source, 'utf-8');
      const yaml = dotenvToYAML(dotenv);

      if (stdin || argv.destination === '-') {
        process.stdout.write(yaml);
      } else {
        writeFileSync(argv.destination, yaml);
      }
    })(argv).catch(error => {
      console.error(error?.message ?? error?.toString() ?? 'Unknown error');
      process.exit(1);
    });
  },
};

export = command;