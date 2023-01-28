import parse from './utils/parsers.js';
import makeMap from './utils/makeMap.js';
import renderPlain from './formatters/renderPlain.js';
import render from './formatters/render.js';

const module = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const equalityMap = makeMap(data1, data2);
  let formatted;

  switch (format) {
  case 'plain':
    formatted = renderPlain(equalityMap, data1, data2);
    break;
  case 'json':
    formatted = JSON.stringify(equalityMap);
    break;
  default:
    formatted =  render(equalityMap, data1, data2);
    break;
  }

  return formatted;
};

export default module;