export const convertToOddEven = (rawArr) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    (rawArr[i] % 2 === 0 ) ? result.push(0) : result.push(1);
  }
  
  return result;
}