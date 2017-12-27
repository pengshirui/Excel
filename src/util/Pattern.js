export const checkPattern = (arr, patternArr) => {
  let result = [];
  let num = patternArr.length;
  let firstNum = patternArr[0];
  outer:
  for (let i = 0; i < arr.length - num; i++) {
    for (let j = 0; j < num; j++) {
      if (arr[i + j] != patternArr[j]) {
        continue outer;
      }
    }
    if (i + num < arr.length) {
      if (i === 0 || arr[i - 1] !== firstNum) {
        result.push(arr[i + num]);
        i = i + num - 1;
      }
    }
  }
  return result;
}

export const getRawDataWithPattern = (arr, patternArr, rawData) => {
  let result = [];
  let num = patternArr.length;
  let firstNum = patternArr[0];
  outer:
  for (let i = 0; i < arr.length - num; i++) {
    for (let j = 0; j < num; j++) {
      if (arr[i + j] != patternArr[j]) {
        continue outer;
      }
    }
    if (i + num < arr.length) {
      if (i === 0 || arr[i - 1] !== firstNum) {
        result.push(rawData[i + num]);
        i = i + num - 1;
      }
    }
  }
  return result;
}


