// функция для чтения json-файла и возврата json-объекта
import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';

const parseJson = (filename) => {
    const currentDir = process.cwd(); // текущая папка
    const filepath = path.resolve(currentDir, '__fixtures__', filename);
    // console.log('Path from func: ', filepath)
    const data = fs.readFileSync(filepath, 'utf8'); // читаем файл

    return JSON.parse(data); // возвращаем данные из файла в json-формате
}

export default parseJson;