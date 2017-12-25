export const convertCsvTo2DArray = (content) => {
  try {
    return content ? content.split("\n").map(function (row) { return row.split(","); }) : [];
  } catch (e) {
    print(e);
    return [];
  }
}

export const convertStrToArr = (str) => {
  let arr = str ? str.split(",") : [];
  let numArr = arr.map(Number)
  return numArr;
}

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

export const convertToBigSmall = (rawArr, pivot) => {
	let result = [];
	for (let i = 0; i < rawArr.length; i++) {
		(rawArr[i] >= pivot) ? result.push(1) : result.push(0);
	}
	return result;
}

export const convertPrimeNum = (rawArr) => {

}


