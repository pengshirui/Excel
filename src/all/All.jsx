import * as React from 'react';
import { Checkbox, Col, Grid, Panel, PanelGroup, Row } from 'react-bootstrap';
import { compose, withHandlers, withState } from 'recompose';
import { convertStrToArr, separateResultsManullyInput } from '../util/Array';
import { generateResultWithManuInput, generateResults, generateSecondCalculationResult,generateSecondCalculationResultWithManuInput, separateResults } from '../share/Calculate.jsx';
import { BallButtons } from '../share/BallButtons.jsx';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { FunctionButtons } from '../share/FunctionButtons.jsx';
import { ResultData } from '../share/ResultData.jsx';
import { convertToBigSmall } from '../pivot/Convert.js';
import { convertToFirstRoute } from '../firstRoute/Convert.js';
import { convertToOddEven } from '../oddeven/Convert.js';
import { convertToPrimeComposite } from '../prime/Convert.js';
import { convertToSecondRoute } from '../secondRoute/Convert';
import { convertToThreeRoute } from '../threeRoute/Convert';
import { convertToUpDownEven } from '../upDownEven/Convert';
import { convertToZeroRoute } from '../zeroRoute/Convert';
import { withBaseData } from '../share/withData.js';

const enhance = compose(
  withBaseData,
  withState("firstSelection", "setFirstSelection", 0),
  withState("secondSelection", "setSecondSelection", 0),
  withState("checkboxCheckedFirstPattern", "setCheckboxCheckedFirstPattern", false),
  withState("checkboxChecked", "setCheckboxChecked", false),
  withState("checkboxCheckedSecondPattern", "setCheckboxCheckedSecondPattern", false),
  withState("leftMargin", "setLeftMargin", ""),
  withState("rightMargin", "setRightMargin", ""),
  withState("secondLeftMargin", "setSecondLeftMargin", ""),
  withState("secondRightMargin", "setSecondRightMargin", ""),
  withHandlers({
    handleChangeFirstPattern: ({ setCheckboxCheckedFirstPattern }) => (evt) => {
      setCheckboxCheckedFirstPattern(evt.target.checked)
    },
    handleChangeSecondPattern: ({ setCheckboxCheckedSecondPattern }) => (evt) => {
      setCheckboxCheckedSecondPattern(evt.target.checked)
    },
    handleChange: ({ setCheckboxChecked }) => (evt) => {
      setCheckboxChecked(evt.target.checked)
    },
    updateLeftMargin: ({ setLeftMargin }) => (event) => {
      setLeftMargin(event.target.value);
    },
    updateRightMargin: ({ setRightMargin }) => (event) => {
      setRightMargin(event.target.value);
    },
    updateSecondLeftMargin: ({ setSecondLeftMargin }) => (event) => {
      setSecondLeftMargin(event.target.value);
    },
    updateSecondRightMargin: ({ setSecondRightMargin }) => (event) => {
      setSecondRightMargin(event.target.value);
    },
    updateFirstSelectionByBtn: ({ setFirstSelection }) => (event) => {
      setFirstSelection(event.target.value);
    },
    updateSecondSelectionByBtn: ({ setSecondSelection }) => (event) => {
      setSecondSelection(event.target.value);
    },
    updateData: (props) => (event) => {
      const { setData } = props;
      setData(event.target.value);
    },
    updateArgs: ({ setArgs }) => (event) => {
      setArgs(event.target.value);
    },
    updateSecondArgs: ({ setSecondArgs }) => (event) => {
      setSecondArgs(event.target.value);
    },
    submitAll : ({setSecondBData, setSecondBDataZeroArr, setSecondBDataOneArr,setSecondBDataTwoArr, data, args, secondArgs,secondLeftMargin, secondRightMargin, leftMargin, rightMargin, firstSelection, secondSelection, setBinaryData, setPatterns, setSecondZeroArr,setSecondTwoArr, setSecondOneArr, setSecondResults, setSecondResultsRawData, setSecondPatterns, setResultsRawData, setResults, setZerosRawData, setOnesRawData, setTwosRawData, setZero, setOne, setTwo, checkboxCheckedFirstPattern, checkboxCheckedSecondPattern, checkboxChecked})  => () => {
      const dataArr = convertStrToArr(data);
      const {bData} = getBinaryDataBySelectedFunctin(dataArr, firstSelection, leftMargin, rightMargin);
      const { zeroArrInput, oneArrInput, twoArrInput } = separateResultsManullyInput(dataArr, bData);
      const patternArr = convertStrToArr(args);
      const secondPatternArr = convertStrToArr(secondArgs);
      var patternsTemp;
      var resultsTemp;
      var resultRawDataTemp;
      var result;
      // first calculation
      if(!checkboxCheckedFirstPattern) {
        result = generateResults(bData, dataArr);
      }
      else if (checkboxCheckedFirstPattern)
      {
        result = generateResultWithManuInput(bData, patternArr, dataArr);
      }
      // first calculation results
      patternsTemp = result.patternsTemp ;
      resultsTemp = result.resultsTemp;
      resultRawDataTemp = result.resultRawDataTemp;
      
      setZero(zeroArrInput);
      setOne(oneArrInput);
      setTwo(twoArrInput);
      setBinaryData(bData);

      setPatterns(patternsTemp);
      setResults(resultsTemp);
      setResultsRawData(resultRawDataTemp);

      const { zeroArr, oneArr, twoArr } = separateResults(resultsTemp, resultRawDataTemp);
      setZerosRawData(zeroArr);
      setOnesRawData(oneArr);
      setTwosRawData(twoArr);

      // second calculation
      var secondAllResultsArr = [];
      var secondResults = [];
      var secondResultsRawData = [];
      var secondPatterns = [];
      var secondZeroArr = [];
      var secondOneArr = [];
      var secondTwoArr = [];
      var secondBData = [];
      var secondBDataZeroArr = [];
      var secondBDataOneArr = [];
      var secondBDataTwoArr = [];

      if (checkboxChecked && !checkboxCheckedSecondPattern) 
      {
        secondAllResultsArr = generateSecondCalculationResult(result, secondSelection, getBinaryDataBySelectedFunctin, leftMargin, rightMargin);
      } 
      else if (checkboxChecked && checkboxCheckedSecondPattern)
      {
        secondAllResultsArr = generateSecondCalculationResultWithManuInput(result, secondSelection, getBinaryDataBySelectedFunctin, secondLeftMargin, secondRightMargin, secondPatternArr);
      } 
      for(let i = 0; i < secondAllResultsArr.length; i++)
      {
        secondResults.push(secondAllResultsArr[i].secondResults);
        secondResultsRawData.push(secondAllResultsArr[i].secondResultRawData);
        secondPatterns.push(secondAllResultsArr[i].secondPatterns);
        secondZeroArr.push(secondAllResultsArr[i].zeroArr);
        secondOneArr.push(secondAllResultsArr[i].oneArr);
        secondTwoArr.push(secondAllResultsArr[i].twoArr);
        secondBData.push(secondAllResultsArr[i].bData);
        secondBDataZeroArr.push(secondAllResultsArr[i].zeroArrInput);
        secondBDataOneArr.push(secondAllResultsArr[i].oneArrInput);
        secondBDataTwoArr.push(secondAllResultsArr[i].twoArrInput);
      }
      setSecondResults(secondResults);
      setSecondResultsRawData(secondResultsRawData);
      setSecondPatterns(secondPatterns);
      setSecondZeroArr(secondZeroArr);
      setSecondOneArr(secondOneArr);
      setSecondTwoArr(secondTwoArr);
      setSecondBData(secondBData);
      setSecondBDataZeroArr(secondBDataZeroArr);
      setSecondBDataOneArr(secondBDataOneArr);
      setSecondBDataTwoArr(secondBDataTwoArr);
    }
  })
);

const getBinaryDataBySelectedFunctin = (dataArr, firstSelection, leftMargin, rightMargin) => {
  var selectionNum = parseInt(firstSelection);
  var bData;
  if (selectionNum == 0) {
    bData = convertToBigSmall(dataArr, parseInt(leftMargin), parseInt(rightMargin));
  } else {
    var selectedFunction = getFunctionBySelection(selectionNum);
    bData = selectedFunction(dataArr);
  }
  return {bData};
}


var getFunctionBySelection = (selection) => {
  switch (selection) {
    case 0:
      return convertToBigSmall;
    case 1:
      return convertToPrimeComposite;
    case 2:
      return convertToOddEven;
    case 4:
      return convertToThreeRoute;
    case 5:
      return convertToZeroRoute;
    case 6:
      return convertToFirstRoute;
    case 7:
      return convertToSecondRoute;
    case 8:
      return convertToUpDownEven;
    default:
      return null;
  }
}

const getValidationState = (args) => {
  const regex = /^\d+(,\d+)*$/;
  if (!regex.test(args)) {
    return 'error';
  } else {
    return 'success';
  }
}

const disabled = (
  data,
  args, 
  secondArgs, 
  firstSelection, 
  secondSelection, 
  checkboxChecked,
  checkboxCheckedFirstPattern, 
  checkboxCheckedSecondPattern,
  leftMargin,
  rightMargin,
  secondLeftMargin,
  secondRightMargin) => {
  const regex = /^\d+(,\d+)*$/;
  if (!regex.test(data)) return true;
  if (checkboxCheckedFirstPattern){
    if (!regex.test(args)) return true;
  }
  if (checkboxCheckedSecondPattern){
    if (!regex.test(secondArgs)) return true;
  }
  if (firstSelection == 0) {
    if (!regex.test(leftMargin) || !regex.test(rightMargin)) return true;
  }
  if (checkboxChecked && secondSelection == 0) {
    if (!regex.test(secondLeftMargin) || !regex.test(secondRightMargin)) return true;
  }
  if (firstSelection == 3)
  {
    return true;
  }
  if (checkboxChecked && secondSelection == 3)
  {
    return true;
  }
  return false;
}

const component = (props) => {
  const { 
    args,
    secondArgs,
    data, 
    checkboxCheckedFirstPattern, 
    checkboxChecked, 
    checkboxCheckedSecondPattern, 
    handleChange, 
    handleChangeFirstPattern, 
    handleChangeSecondPattern, 
    binaryData, 
    updateArgs, 
    updateData, 
    submitAll, 
    setData, 
    csv, 
    patterns, 
    results, 
    resultsRawData, 
    zerosRawData, 
    onesRawData, 
    twosRawData, 
    one, 
    two, 
    zero, 
    secondBData,
    secondBDataZeroArr,
    secondBDataOneArr,
    secondBDataTwoArr,
    updateFirstSelectionByBtn, 
    updateSecondSelectionByBtn, 
    secondResultsRawData,  
    secondPatterns, 
    secondResults, 
    secondZeroArr, 
    secondOneArr, 
    secondTwoArr,
    firstSelection,
    secondSelection,
    updateLeftMargin,
    updateRightMargin,
    leftMargin, 
    rightMargin,
    secondLeftMargin,
    secondRightMargin,
    updateSecondLeftMargin,
    updateSecondRightMargin,
    updateSecondArgs
  } = props;
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} placeholder="数字用逗号分割" value={data} />
            <BallButtons setData={setData} csv={csv} />
            <br></br>
            <Panel bsStyle="success">
              <FunctionButtons updateSelectionByBtn={updateFirstSelectionByBtn} />
              {
                (firstSelection == 0) && 
                <div>
                  <FieldGroup label="左边界值" onChange={updateLeftMargin} type="number" validationState={getValidationState(leftMargin)} value={leftMargin} placeholder="数字" />
                  <FieldGroup label="右边界值" onChange={updateRightMargin} type="number" validationState={getValidationState(rightMargin)} value={rightMargin} placeholder="数字" />
                </div>
              }
              <br></br>
              <Checkbox checked={checkboxCheckedFirstPattern}
                onChange={handleChangeFirstPattern}>用模板进行计算
              </Checkbox>
              {
                checkboxCheckedFirstPattern &&
                <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} placeholder="数字用逗号分割" />
              }
            </Panel>
            <br></br>
            <Checkbox checked={checkboxChecked}
              onChange={handleChange}>用上面结果再进行计算
            </Checkbox>
            {checkboxChecked &&
              <Panel bsStyle="success">
                <FunctionButtons updateSelectionByBtn={updateSecondSelectionByBtn} />
                {
                  (secondSelection == 0) && 
                  <div>
                    <FieldGroup label="左边界值" onChange={updateSecondLeftMargin} type="number" validationState={getValidationState(secondLeftMargin)} value={secondLeftMargin} placeholder="数字" />
                    <FieldGroup label="右边界值" onChange={updateSecondRightMargin} type="number" validationState={getValidationState(secondRightMargin)} value={secondRightMargin} placeholder="数字" />
                  </div>
                }
                <br></br>
                <Checkbox checked={checkboxCheckedSecondPattern}
                  onChange={handleChangeSecondPattern}>用模板进行计算
                </Checkbox>
                {
                  checkboxCheckedSecondPattern && <FieldGroup label="模板" onChange={updateSecondArgs} validationState={getValidationState(secondArgs)} placeholder="数字用逗号分割" />
                }
              </Panel>
            }
            <CalculateButton onClick={submitAll} disabled={disabled(
              data,
              args, 
              secondArgs, 
              firstSelection, 
              secondSelection, 
              checkboxChecked,
              checkboxCheckedFirstPattern, 
              checkboxCheckedSecondPattern,
              leftMargin,
              rightMargin,
              secondLeftMargin,
              secondRightMargin)}/>
          </form>
        </Col>
        <Col xs={6}>
          <PanelGroup>
            <BallData b={binaryData} one={one} two={two} zero={zero} header="二进制数据" eventKey={0} bsStyle="success" />
          </PanelGroup>
          <PanelGroup>
            {resultsRawData && resultsRawData.length > 0 && resultsRawData.map((r, k) => (
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第" + (k + 1) + "次结果"} eventKey={0} bsStyle="primary" key={k}
                zeroRawData={zerosRawData[k]} oneRawData={onesRawData[k]} twoRawData = {twosRawData[k]}
                secondResultsRawData = {secondResultsRawData[k]} secondPatterns = {secondPatterns[k]} secondResults = {secondResults[k]} 
                secondZeroArr = {secondZeroArr[k]} secondOneArr = {secondOneArr[k]} secondTwoArr = {secondTwoArr[k]}
                secondBData = {secondBData[k]} secondBDataZeroArr = {secondBDataZeroArr[k]} secondBDataOneArr = {secondBDataOneArr[k]} secondBDataTwoArr = {secondBDataTwoArr[k]}/>
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const All = enhance(component);