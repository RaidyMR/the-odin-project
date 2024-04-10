function mergeSort(array) {
    if (array.length <= 1) return array;

    const n = Math.floor(array.length / 2);
    const prev = array.slice(0, n);
    const next = array.slice(n);

  return merge(mergeSort(prev), mergeSort(next));
}

function merge(prev, next) {
  let result = [];
  let prevI = 0;
  let nextI = 0;

  while (prevI < prev.length && nextI < next.length) {
    if (prev[prevI] <= next[nextI]) {
      result.push(prev[prevI++]);
    } else {
      result.push(next[nextI++]);
    }
  }

  return result.concat(prev.slice(prevI)).concat(next.slice(nextI));
}

const ex1 = [3, 2, 1, 13, 8, 5, 0, 1];
const ex2 = [105, 79, 100, 110];

console.log('Example 1:');
console.log('before: ', ex1);
console.log('after: ', mergeSort(ex1));

console.log('Example 2:');
console.log('before: ', ex2);
console.log('after: ', mergeSort(ex2));
