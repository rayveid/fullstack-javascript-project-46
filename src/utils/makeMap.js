const checkEquality = (key, value, secondObj) => {
  if (!Object.hasOwn(secondObj, key)) return 'Only first'; // возвращаем 1, т.к. ключ есть только в первом объекте
  if (secondObj[key] === value) return 'Equal values'; // возвращаем 0, т.к. ключ-значение полностью равны
  if (typeof value === 'object' && typeof secondObj[key] === 'object') return 'Object values'; //

  return 'Not equal values';
};

const makeMap = (obj1, obj2) => {
  let equalityMap = {};
  let newValue;

  // строим карту сравнения по первому объекту
  for (const [key, value] of Object.entries(obj1)) {
    const equality = checkEquality(key, value, obj2);

    switch (equality) {
    case 'Only first':
      newValue = {[key]: [1]};
      equalityMap = {...equalityMap, ...newValue}; // только в первом
      break;
    case 'Equal values':
      newValue = {[key]: [0]};
      equalityMap = {...equalityMap, ...newValue}; // одинаковые
      break;
    case 'Not equal values':
      newValue = {[key]: [1,2]};
      equalityMap = {...equalityMap, ...newValue}; // разные значения
      break;
    case 'Object values':
      newValue = {[key]: makeMap(obj1[key], obj2[key])};
      equalityMap = {...equalityMap, ...newValue};
      break;
    default:
      break;
    }
  }

  // собираем оставшиеся ключи из второго объекта
  for (const key of Object.keys(obj2)) {
    if (!Object.hasOwn(equalityMap, key)) {
      equalityMap = {...equalityMap, [key]: [2]}; // только во втором
    }
  }
  // console.log('Non final:')
  // console.log(equalityMap)
  return equalityMap;
};

export default makeMap;