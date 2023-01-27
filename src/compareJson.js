import render from './formatters/render.js'
import makeMap from './makeMap.js'
import renderPlain from './formatters/renderPlain.js';

// функция принимает на вход 2 json-объекта
const compareJson = (obj1, obj2, format = 'stylish') => {
    const equalityMap = makeMap(obj1, obj2);

    switch (format) {
        case 'plain':
            return renderPlain(equalityMap, obj1, obj2);
        case 'json':
            return JSON.stringify(equalityMap);
        default:
            return render(equalityMap, obj1, obj2);
    }
};

export default compareJson;