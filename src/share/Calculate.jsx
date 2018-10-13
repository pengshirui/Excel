import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';
import {separateResultsManullyInput} from '../util/Array.js';

export const generateResults = (bData, dataArr) => {
  const patternsTemp = [];
  const resultsTemp = [];
  const resultRawDataTemp = [];
  for (let index = bData.length - 1; index >= 1; index--) {
    const {patternArr, index} = getPatternFromBinaryData(bData, index);
    if (patternArr == null || index == null)
    {
      break;
    }
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

export const generateSecondCalculationResult = (result, secondSelection, getBinaryDataBySelectedFunctin, leftMargin, rightMargin) => {
  var secondAllResults = [];
  var resultsAsInputArr = result.resultRawDataTemp;
  for (let index = 0; index < resultsAsInputArr.length; index++)
  {
    var dataArr = resultsAsInputArr[index];
    const {bData} = getBinaryDataBySelectedFunctin(dataArr, secondSelection, leftMargin, rightMargin);
    const { zeroArrInput, oneArrInput, twoArrInput } = separateResultsManullyInput(dataArr, bData);

    const secondResultsArray = generateResults(bData, dataArr);
    const secondPatterns = secondResultsArray.patternsTemp;
    const secondResults = secondResultsArray.resultsTemp;
    const secondResultRawData = secondResultsArray.resultRawDataTemp;
    const { zeroArr, oneArr, twoArr } = separateResults(secondResults, secondResultRawData);
    
    secondAllResults.push({secondResults, secondPatterns, secondResultRawData, zeroArr, oneArr, twoArr, bData, zeroArrInput, oneArrInput, twoArrInput});
  }
  return secondAllResults;
}

export const generateSecondCalculationResultWithManuInput = (result, secondSelection, getBinaryDataBySelectedFunctin, leftMargin, rightMargin, secondPatternArr) => {
  var secondAllResults = [];
  var resultsAsInputArr = result.resultRawDataTemp;
  for (let index = 0; index < resultsAsInputArr.length; index++)
  {
    var dataArr = resultsAsInputArr[index];
    const {bData} = getBinaryDataBySelectedFunctin(dataArr, secondSelection, leftMargin, rightMargin);
    const secondResultsArray = generateResultWithManuInput(bData, secondPatternArr, dataArr);
    const secondPatterns = secondResultsArray.patternsTemp;
    const secondResults = secondResultsArray.resultsTemp;
    const secondResultRawData = secondResultsArray.resultRawDataTemp;
    const { zeroArr, oneArr, twoArr } = separateResults(secondResults, secondResultRawData);
    
    secondAllResults.push({secondResults, secondPatterns, secondResultRawData, zeroArr, oneArr, twoArr});
  }
  return secondAllResults;
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
  return {};
}
  
  