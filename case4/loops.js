// 配列の要素を2倍にする
function doubleArray(arr) {
  const result = [];
  let i = 0;
  while (i < arr.length) {
    result.push(arr[i] * 2);
    i++;
  }
  return result;
}

// 配列の合計を計算する
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
  }
  return sum;
}
// 配列の重複を削除する
function uniqueArray(arr) {
  const seen = {};
  const result = [];
  for (let i = 0; i < arr.length; i++)
    if (!seen[arr[i]]) {
      seen[arr[i]] = true;
      result.push(arr[i]);
    }
  return result;
}
