import * as React from 'react';
import { Col, Grid, PanelGroup, Row } from 'react-bootstrap';
import { compose, withHandlers } from 'recompose';
import { convertStrToArr, separateResultsManullyInput} from '../util/Array';
import { generateResultWithManuInput, generateResults, separateResults} from '../share/Calculate.jsx';
import { BallButtons } from '../share/BallButtons.jsx';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { ResultData } from '../share/ResultData.jsx';
import { convertToOddEven } from '../oddeven/Convert';
import { withBaseData } from '../share/withData';


const enhance = compose(
  withBaseData,
  withHandlers({
    updateData: (props) => (event) => {
      const {setData} = props;
      setData(event.target.value);
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({data, setBinaryData, setPatterns, setResultsRawData, setResults, setZerosRawData, setOnesRawData, setTwosRawData , setZero, setOne, setTwo }) => () => {
      // get the binary data
      const dataArr = convertStrToArr(data);
      const bData = convertToOddEven(dataArr);
      const {zeroArrInput, oneArrInput, twoArrInput} = separateResultsManullyInput(dataArr, bData);
      setZero(zeroArrInput);
      setOne(oneArrInput);
      setTwo(twoArrInput);
      setBinaryData(bData);
      const {patternsTemp, resultsTemp, resultRawDataTemp} = generateResults(bData, dataArr); 
      const {zeroArr, oneArr, twoArr} = separateResults(resultsTemp, resultRawDataTemp);
      setPatterns(patternsTemp);
      setResults(resultsTemp);
      setResultsRawData(resultRawDataTemp);
      setZerosRawData(zeroArr);
      setOnesRawData(oneArr);
      setTwosRawData(twoArr);
    },
    submitUseManullayInputPattern: ({data, setBinaryData, args, setPatterns, setResultsRawData, setResults, setZerosRawData, setOnesRawData, setTwosRawData}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToOddEven(dataArr);
      setBinaryData(bData);
      const {patternsTemp, resultsTemp, resultRawDataTemp} = generateResultWithManuInput(bData, patternArr, dataArr);
      const {zeroArr, oneArr, twoArr} = separateResults(resultsTemp, resultRawDataTemp);
      setPatterns(patternsTemp);
      setResults(resultsTemp);
      setResultsRawData(resultRawDataTemp);
      setZerosRawData(zeroArr);
      setOnesRawData(oneArr);
      setTwosRawData(twoArr);
    }
  })
);

const getValidationState = (args) => {
  const regex = /^\d+(,\d+)*$/;
  if (!regex.test(args)) {
    return 'error';
  } else {
    return 'success';
  }
}

const component = (props) => {
  const {csv, setData, args, data, binaryData, updateArgs, updateData, submit, submitUseManullayInputPattern, patterns, results, resultsRawData, zerosRawData, onesRawData, one, zero, two } = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(data);
  const disabledForManualInput = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} placeholder="数字用逗号分割" value={data} />  
            <BallButtons csv={csv} setData={setData}/>
            <PanelGroup>
              <BallData b={binaryData} one={one} two={two} zero={zero} header="二进制数据 （偶数为0，奇数为1）" eventKey={0} bsStyle="success"/>
            </PanelGroup>
            <CalculateButton onClick={submit} disabled={disabled} />
            <br></br>
            <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} placeholder="数字用逗号分割" />
            <CalculateButton onClick={submitUseManullayInputPattern} disabled={disabledForManualInput} />
          </form>
        </Col>
        <Col xs={6}>
          <PanelGroup>
            {resultsRawData && resultsRawData.length > 0 && resultsRawData.map((r, k) => (
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第"+(k+1)+"次奇偶结果"} eventKey={0} bsStyle="primary" key={k} 
                zeroRawData = {zerosRawData[k]} oneRawData = {onesRawData[k]}/>
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const OddEven = enhance(component);