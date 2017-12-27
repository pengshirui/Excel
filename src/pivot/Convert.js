export const convertToBigSmall = (rawArr, pivot) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    (rawArr[i] >= pivot) ? result.push(1) : result.push(0);
  }
  return result;
}