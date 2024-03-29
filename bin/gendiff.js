#!/usr/bin/env node
import { program } from 'commander';
import module from '../src/module.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format') // опция для выбора формата вывода
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const result = module(filepath1, filepath2, format);
    console.log(result);
  })
  .parse(); // запуск программы
