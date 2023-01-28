import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 2, depth = 1) => {
  const type = typeof value;

  if (type !== 'object') return value.toString(); // для всех кроме объектов
  if (value === null) return null; // для null (т.к. тоже объект) возвращаем null

  const spaces = replacer.repeat(spacesCount * (depth + 1));
  const bracketSpaces = replacer.repeat(spacesCount * depth);

  const result = Object.entries(value).reduce((acc, [entryKey, entryValue]) => {
    const newKey = `${spaces}  ${entryKey.toString()}`;
    const newValue = stringify(entryValue, replacer, spacesCount, depth + 2);
    return [...acc, [`${newKey}: ${newValue}`]];
  }, []);

  return ['{', ...result, `${bracketSpaces}}`].join('\n'); // формируем и возращаем итоговую строку
};

const render = (map, obj1, obj2, depth = 1) => {
  const spaces = ' '.repeat(2 * depth); // 4 - 5 - 6
  const brackets = ' '.repeat(2 * (depth - 1));

  // проходимся по всем элемента и собираемся объект из двух с помощью карты
  const mapEntry = Object.entries(map);
  const sorted = _.sortBy(mapEntry) // сортируем, т.к. итоговый результат должен быть отсортирован
    .reduce((acc, [key, value]) => {
      if (!Array.isArray(value)) {
        // рекурсивная логика
        const arrValue = render(map[key], obj1[key], obj2[key], depth + 2);
        return [...acc, `${spaces}  ${key}: ${arrValue}`];
      }

      const newValue = value.reduce((accValue, valueKey) => {
        switch (valueKey) {
          case 1: // берем значение из первого объекта
            return [
              ...accValue,
              `${spaces}- ${key}: ${stringify(obj1[key], ' ', 2, depth + 1)}`,
            ];
          case 2: // берем значение из второго объекта
            return [
              ...accValue,
              `${spaces}+ ${key}: ${stringify(obj2[key], ' ', 2, depth + 1)}`,
            ];
          case 0: // значения равны, можно взять из любого
            return [
              ...accValue,
              `${spaces}  ${key}: ${stringify(obj1[key], ' ', 2, depth + 1)}`,
            ];
          default:
            throw new Error('unknown');
        }
      }, []);

      // for (const valueKey of value) {
      //   // проходимся по каждому значению из карты
      //
      // }

      return [...acc, ...newValue];
    }, []);

  return ['{', ...sorted, `${brackets}}`].join('\n');
};

export default render;
