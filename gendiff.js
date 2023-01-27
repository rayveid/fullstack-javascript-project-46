#!/usr/bin/env node
import { program } from 'commander';
import compareJson from './src/compareJson.js';
import parse from './src/parsers.js';

// функция для поиска отличий
const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);

    const formatName = program.opts().format || format; // формат берем или из CLI, или из переданных
    const diff = compareJson(data1, data2, formatName)

    console.log(diff); // выводим ответ в консоль
    return diff; // и возвращаем из функции
}

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish') // опция для выбора формата вывода
    .action(genDiff);

// запуск программы
program.parse(process.argv);

export default genDiff;
