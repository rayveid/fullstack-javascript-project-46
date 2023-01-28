const checkEquality = (key, value, secondObj) => {
  // возвращаем 1, т.к. ключ есть только в первом объекте
  if (!Object.hasOwn(secondObj, key)) return 'Only first';

  // возвращаем 0, т.к. ключ-значение полностью равны
  if (secondObj[key] === value) return 'Equal values';
  if (typeof value === 'object' && typeof secondObj[key] === 'object')
    return 'Object values'; //

  return 'Not equal values';
};

const makeMap = (obj1, obj2) => {
  // строим карту сравнения по первому объекту
  const equalityMap = Object.entries(obj1).reduce((acc, [key, value]) => {
    const equality = checkEquality(key, value, obj2);

    switch (equality) {
      case 'Only first':
        return { ...acc, ...{ [key]: [1] } }; // только в первом
      case 'Equal values':
        return { ...acc, ...{ [key]: [0] } }; // одинаковые
      case 'Not equal values':
        return { ...acc, ...{ [key]: [1, 2] } }; // разные значения
      case 'Object values': // для объектов рекурсивно вызываем построение карты
        return { ...acc, ...{ [key]: makeMap(obj1[key], obj2[key]) } };
      default:
        throw new Error('Unknown equality');
    }
  }, {});

  // собираем оставшиеся ключи
  const leftKeys = Object.keys(obj2).reduce((acc, key) => {
    if (!Object.hasOwn(equalityMap, key)) {
      // если в текущей карте нет ключа,
      return { ...acc, [key]: [2] }; // значит добавляем его с параметров 2
    }

    return acc; // если нет, возвращаем в текущем виде
  }, {});

  // собираем оставшиеся ключи из второго объекта
  return { ...equalityMap, ...leftKeys };
};

export default makeMap;
