#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const commander = new Command();
commander
  .description('Compares two configuration files and shows diffrence.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv);

// console.log('Works!');
console.log(commander.opts());

