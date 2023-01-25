const mapping = {
    1: '-', // значение есть только в первом файле ИЛИ они разные со вторым
    2: '+', // значение есть только во втором файле ИЛИ они разные с первым
    3: ' ', // значения есть в обоих файлах && равны
}

// функция принимает на вход 2 json-объекта
const compareJson = (obj1, obj2) => {

    // создаем ентрис из объектов, для корректной сортировки добавляем вторым значением
    // в массив номер объекта
    const obj1Entries = Object.entries(obj1).map(([key, value]) => [key, 1, value]);
    const obj2Entries = Object.entries(obj2).map(([key, value]) => [key, 2, value]);

    // объединяем массивы и сортируем
    const entries = [...obj1Entries, ...obj2Entries]
        .sort() // сортируем
        .reduce((acc, [key, obj, value]) => {
            if (acc.length === 0) return [...acc, [key, obj, value]];  // если акк пустой или значения ключей не совпадают, сразу возвращаем его с новыми значениями
            const prevItem = acc[acc.length - 1]; // достаем предыдущий элемент из акка
            const [prevKey, , prevValue] = prevItem; // достаем значения из предыдущего
            if (prevKey !== key) return [...acc, [key, obj, value]]; // если значения ключей  не совпадают, возвращаем его с новыми значениями
            if (prevValue !== value) return [...acc, [key, obj, value]];  // если значения value не совпадают, возвращаем его с новыми значениями
            const newPrevItem = [key, 3, value]; // обновляем предыдущее значения
            const newAcc = acc.slice(0, acc.length - 1); // удаляем последнее значение из акка
            return [...newAcc, newPrevItem]
        }, [])
        .reduce((result, [key, obj, value]) => {
            const newProp = { [`${mapping[obj]} ${key}`]: value } // формируем новое свойство
            return { ...result, ...newProp }; // добавляем его в результатт
        }, {})

    // редусим массив, собираем итоговый результат
    return JSON.stringify(entries)
};

export default compareJson;