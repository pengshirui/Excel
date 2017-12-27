export const convertToZeroRoute = (rawArr) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    (rawArr[i] % 3 == 0) ? result.push(1) : result.push(0);
  }
  return result;
}