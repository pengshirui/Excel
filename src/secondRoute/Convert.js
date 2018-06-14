export const convertToSecondRoute = (rawArr) => {
  let result = [];
  for (let i = 1; i < rawArr.length; i++) {
    (rawArr[i] % 3 == 2) ? result.push(1) : result.push(0);
  }
  return result;
}