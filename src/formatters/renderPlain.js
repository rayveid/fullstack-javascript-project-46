import _ from 'lodash';

const getString = (path, action, value1 = '', value2 = '') => {
  const toString = (value) => {
    const type = typeof value;

    if (type === 'string') return `'${value}'`; // строку возвращаем в одинарных кавычках
    if (value === null) return null;
    if (type === 'object') return '[complex value]';

    return value.toString();
  };

  const strValue1 = toString(value1);
  const strValue2 = toString(value2);

  switch (action) {
    case 'updated':
      return `Property '${path}' was updated. From ${strValue1} to ${strValue2}`;
    case 'removed':
      return `Property '${path}' was removed`;
    case 'added':
      return `Property '${path}' was added with value: ${strValue2}`;
    default:
      return 'Unknown action';
  }
};

const renderPlain = (map, obj1, obj2, path = '') => {
  const mapEntry = Object.entries(map);
  const sorted = _.sortBy(mapEntry).reduce((acc, [key, value]) => {
    const currPath = `${path}${key}`;

    if (!Array.isArray(value)) {
      // рекурсивная логика для вложенных объектов
      const arrValue = renderPlain(
        map[key],
        obj1[key],
        obj2[key],
        `${currPath}.`,
      );
      return [...acc, arrValue];
    }

    // дальше необходимо проанализировать значение массива,
    // если значения у ключа 2 - ключ был обновлен
    if (value.length === 2)
      return [...acc, getString(currPath, 'updated', obj1[key], obj2[key])];

    // если 1 - то 3 варианта - одинаковые значения (скипаем), удален или добавлен
    switch (value[0]) {
      case 1:
        return [...acc, getString(currPath, 'removed')];
      case 2:
        return [...acc, getString(currPath, 'added', obj2[1], obj2[key])];
      default:
        return [...acc];
    }
  }, []);

  return sorted.join('\n');
};

export default renderPlain;
