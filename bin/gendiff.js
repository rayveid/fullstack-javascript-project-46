#!/usr/bin/env node
import { Command } from 'commander';
import compareJson from '../src/compareJson.js';
import parseJson from '../src/parseJson.js';

const genDiff = new Command();

// функция для поиска отличий
const findDiff = (filepath1, filepath2) => {
    // console.log('Filepaths: ',filepath1, filepath2)

    const json1 = parseJson(filepath1);
    const json2 = parseJson(filepath2);
    const diff = compareJson(json1, json2);

    console.log(JSON.parse(diff));
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
