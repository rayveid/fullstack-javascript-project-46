const renderMap = (map, obj1, obj2, depth = 1) => {
    const spaces = (' ').repeat(2 * depth);
    const brackets = (' ').repeat(2 * (depth - 1));

    // проходимся по всем элемента и собираемся объект из двух с помощью карты
    const mapEntry = Object
        .entries(map)
        .sort() // сортируем, т.к. итоговый результат должен быть отсортирован
        .reduce((acc, [key, value]) => {


            if (!Array.isArray(value)) { // рекурсивная логика
                const arrValue = renderMap(map[key], obj1[key], obj2[key], depth + 1);
                return [...acc, `${brackets}  ${key}: ${arrValue}`]
            }

            let newValue = [];

            for (const valueKey of value) { // проходися по каждому значению из карты

                switch (valueKey) {
                    case 1:
                        newValue = [...newValue, `${spaces}- ${key}: ${obj1[key]}`];
                        break;
                    case 2:
                        newValue = [...newValue, `${spaces}+ ${key}: ${obj2[key]}`];
                        break;
                    case 0:
                        newValue = [...newValue, `${spaces}  ${key}: ${obj1[key]}`];
                        break;
                    default:
                        break;
                }
            }
            return [...acc, ...newValue];
        }, [])

    // console.log(mapEntry)

    return ['{', ...mapEntry, `${brackets}}`].join('\n');
}

export default renderMap;