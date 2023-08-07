#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')

program.parse();

console.log(genDiff(filepath1, filepath2));
