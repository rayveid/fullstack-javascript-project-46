// функция для чтения json-файла и возврата json-объекта
import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';
import * as parseYml from 'js-yaml';

const parse = (filename) => {
  const ext = path.extname(filename); // расширение файла
  const currentDir = process.cwd(); // текущая папка

  const filepath = path.resolve(currentDir, '__fixtures__', filename);
  const data = fs.readFileSync(filepath, 'utf8'); // читаем файл

  // возвращаем данные из файла в нужном формате
  if (ext === '.json') return JSON.parse(data);
  if (ext === '.yaml' || ext === '.yml')
    return parseYml.load(data, { json: true });

  return 'Unknown file format';
};

export default parse;
