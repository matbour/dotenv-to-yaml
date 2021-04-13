#!/usr/bin/env node
import yargs from 'yargs';
import command from './command';

yargs(process.argv.slice(2))
  .command(command).argv;