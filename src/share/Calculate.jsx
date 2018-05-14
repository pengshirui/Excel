import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';

export const generateResults = (bData, dataArr, patterns, results, resultsRawData) => {
  // clear all results arrays
  results.length = 0;
  resultsRawData.length = 0;
  patterns.length = 0;
  for (let index = bData.length - 1; index >= 1; index--) {
    const {patternArr, index} = getPatternFromBinaryData(bData, index);
    const result = checkPattern(bData, patternArr);
    if (result === null || result.length === 0) {
      break;
    }         
    const bRawData = getRawDataWithPattern(bData, patternArr, dataArr); 
    patterns.push(patternArr);
    resultsRawData.push(bRawData);
    results.push(result);         
  }
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
  
  