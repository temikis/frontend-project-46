import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();
  const result = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { state: 'added', key, value: obj2[key] };
    } if (!Object.hasOwn(obj2, key)) {
      return { state: 'deleted', key, value: obj1[key] };
    } if (obj1[key] === obj2[key]) {
      return { state: 'unchanged', key, value: obj1[key] };
    } if ((obj1[key] instanceof Object) && (obj2[key] instanceof Object)) {
      return { state: 'compare', key, value: getDifference(obj1[key], obj2[key]) };
    }
    return {
      state: 'updated', key, value1: obj1[key], value2: obj2[key],
    };
  });

  return result;
};

export default getDifference;
