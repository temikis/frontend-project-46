import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();
  const result = keys.map((key) => {
    let stateLine;
    if (!Object.hasOwn(obj1, key)) {
      stateLine = { state: 'added', key, value: obj2[key] };
    } else if (!Object.hasOwn(obj2, key)) {
      stateLine = { state: 'deleted', key, value: obj1[key] };
    } else if (obj1[key] === obj2[key]) {
      stateLine = { state: 'unchanged', key, value: obj1[key] };
    } else if ((obj1[key] instanceof Object) && (obj2[key] instanceof Object)) {
      stateLine = { state: 'compare', key, value: getDifference(obj1[key], obj2[key]) };
    } else {
      stateLine = { state: 'updated', key, value: [obj1[key], obj2[key]] };
    }
    return stateLine;
  });

  return result;
};

export default getDifference;
