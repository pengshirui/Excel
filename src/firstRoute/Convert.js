export const convertToFirstRoute = (rawArr) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    (rawArr[i] % 3 == 1) ? result.push(1) : result.push(0);
  }
  return result;
}