#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [format]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => (
    console.log(genDiff(firstConfig, secondConfig, program.format))))
  .parse(process.argv);
