export const convertToUpDownEven = (rawArr) => {
  let result = [];
  result.push(1);
  for (let i = 1; i < rawArr.length; i++) {
    if (rawArr[i] - rawArr[i - 1] > 0) {
      result.push(2);
    } else if (rawArr[i] - rawArr[i - 1] == 0) {
      result.push(1);
    } else {
      result.push(0);
    }
  }
  return result;
}