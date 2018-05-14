export const convertToBigSmall = (rawArr, leftMargin, rightMargin) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    (rawArr[i] >= leftMargin && rawArr[i] <= rightMargin) ? result.push(0) : result.push(1);
  }
  return result;
}