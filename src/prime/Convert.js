export const convertToPrimeComposite = (rawArr) => {
  let result = [];
  for (let i = 0; i < rawArr.length; i++) {
    isPrime(rawArr[i]) ? result.push(0) : result.push(1);
  }
  
  return result;
}

export const isPrime = (num) => {
  if (num == 0) return false;
  if (num == 1) return true;
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}