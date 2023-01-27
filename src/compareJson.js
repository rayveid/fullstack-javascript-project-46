import renderMap from './renderMap.js'
import makeMap from './makeMap.js'

// функция принимает на вход 2 json-объекта
const compareJson = (obj1, obj2) => {
    const equalityMap = makeMap(obj1, obj2);
    return renderMap(equalityMap, obj1, obj2);
};

export default compareJson;