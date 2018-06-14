import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';

export const generateResults = (bData, dataArr) => {
  const patternsTemp = [];
  const resultsTemp = [];
  const resultRawDataTemp = [];
  for (let index = bData.length - 1; index >= 1; index--) {
    const {patternArr, index} = getPatternFromBinaryData(bData, index);
    const result = checkPattern(bData, patternArr);
    if (result === null || result.length === 0) {
      break;
    }         
    const bRawData = getRawDataWithPattern(bData, patternArr, dataArr); 
    patternsTemp.push(patternArr);
    resultRawDataTemp.push(bRawData);
    resultsTemp.push(result);         
  }
  return {patternsTemp, resultsTemp, resultRawDataTemp}
}

export const generateResultWithManuInput = (bData, patternArr, dataArr) => {
  const result = checkPattern(bData, patternArr);
  const bRawData = getRawDataWithPattern(bData, patternArr, dataArr);
  const patternsTemp = [];
  const resultsTemp = [];
  const resultRawDataTemp = [];
  patternsTemp.push(patternArr);
  resultsTemp.push(result);
  resultRawDataTemp.push(bRawData);
  return {patternsTemp, resultsTemp, resultRawDataTemp};
}

export const separateResults = (results, resultsRawData) => {
  const zeroArr = [];
  const oneArr = [];
  const twoArr = [];
  for (let index = 0; index < results.length; index++) {
    const zero = [];
    const one = [];
    const two = [];
    const result = results[index];
    const resultRawData = resultsRawData[index];
    for (let j = 0; j < result.length; j++) {
      if (result[j] === 0) {
        zero.push(resultRawData[j]);
      } else if (result[j] === 1) {
        one.push(resultRawData[j]);
      } else if (result[j] === 2) {
        two.push(resultRawData[j]);
      }
    }
    zeroArr.push(zero);
    oneArr.push(one);
    twoArr.push(two);
  }
  return {zeroArr, oneArr, twoArr};
}

export const getPatternFromBinaryData = (bData, index) => {
  for (; index >= 1; index--) {
    if (bData[index] === bData[index - 1]) {
      continue;
    } else {
      let patternArr = bData.slice(index, bData.length);
      return {patternArr, index};
    }
  }
}
  
  