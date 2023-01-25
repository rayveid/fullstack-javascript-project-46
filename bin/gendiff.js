#!/usr/bin/env node
import { Command } from 'commander';
import compareJson from '../src/compareJson.js';
import parse from '../src/parsers.js';

const genDiff = new Command();

// функция для поиска отличий
const findDiff = (filepath1, filepath2) => {

    const data1 = parse(filepath1);
    const data2 = parse(filepath2);

    const diff = compareJson(data1, data2);
    console.log(diff);
}

genDiff
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format') // опция для выбора формата вывода
    .action(findDiff)

// запуск программы
genDiff.parse();

export default { genDiff };
