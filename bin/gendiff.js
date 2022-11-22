#!/usr/bin/env node
import { Command } from 'commander';
import compareJson from '../src/compareJson';

const genDiff = new Command();

genDiff
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>');

// опция для выбора формата вывода
genDiff.option('-f, --format <type>', 'output format');

// запуск программы
genDiff.parse();

export default { genDiff };
