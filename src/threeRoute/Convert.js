export const convertToThreeRoute = (rawArr) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    if (rawArr[i] % 3 === 0) {
      result.push(0);
    }
    else if (rawArr[i] % 3 === 1) {
      result.push(1);
    }
    else result.push(2);
  }
  return result;
}