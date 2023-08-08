#!/usr/bin/env node
import { program } from 'commander';
// import genDiff from '../src/gendiff.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log('First path:', filepath1);
    console.log('Secons path:', filepath2);
    // console.log(genDiff(filepath1, filepath2));
  });

program.parse();
