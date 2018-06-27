import * as React from 'react';
import { ButtonToolbar, Col, FormGroup, Grid, PanelGroup, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { compose, withHandlers, withState } from 'recompose';
import { convertStrToArr, getColAsStr, separateResultsManullyInput } from '../util/Array';
import { generateResultWithManuInput, generateResults, separateResults} from '../share/Calculate.jsx';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { ResultData } from '../share/ResultData.jsx';
import { convertToColdWarmHot } from '../coldWarmHot/Convert.js';
import { withBaseData } from '../share/withData';


const enhance = compose(
  withBaseData,
  withState("ballNumber", "setBallNumber", 0),
  withHandlers({
    updateDataByBtn: ({ setData, setBallNumber, csv }) => (event) => {
      const bData = getColAsStr(csv, event.target.value);
      setData(bData);
      setBallNumber(event.target.value);
    },
    updateArgs: ({ setArgs }) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({ballNumber, csv,data, setBinaryData, setPatterns, setResultsRawData, setResults, setZerosRawData, setOnesRawData, setTwosRawData, setZero, setOne, setTwo  }) => () => {
      // get the binary data
      const dataArr = convertStrToArr(data);
      const bData = convertToColdWarmHot(ballNumber, csv);
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
    submitUseManullayInputPattern: ({ballNumber, csv, data, setBinaryData, args, setPatterns, setResultsRawData, setResults, setZerosRawData, setOnesRawData, setTwosRawData}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToColdWarmHot(ballNumber, csv);
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
  const {args, data, binaryData, updateArgs, updateDataByBtn, submit, submitUseManullayInputPattern,  patterns, results, resultsRawData, zerosRawData, onesRawData, twosRawData, one, two, zero } = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(data);
  const disabledForManualInput = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" disabled={true} value={data} />
            <FormGroup>
              <ButtonToolbar block="true">
                <ToggleButtonGroup type="radio" name="options" defaultValue={0} justified={true}>
                  <ToggleButton value={0} onChange={updateDataByBtn}>1号球</ToggleButton>
                  <ToggleButton value={1} onChange={updateDataByBtn}>2号球</ToggleButton>
                  <ToggleButton value={2} onChange={updateDataByBtn}>3号球</ToggleButton>
                  <ToggleButton value={3} onChange={updateDataByBtn}>4号球</ToggleButton>
                  <ToggleButton value={4} onChange={updateDataByBtn}>5号球</ToggleButton>
                  <ToggleButton value={5} onChange={updateDataByBtn}>6号球</ToggleButton>
                  {/* <ToggleButton value={6} onChange={updateDataByBtn}>7号球</ToggleButton> */}
                </ToggleButtonGroup>
              </ButtonToolbar>
            </FormGroup>
            <PanelGroup>
              <BallData b={binaryData} one={one} two={two} zero={zero} header="二进制数据 (冷为0，温为1，热为2）" eventKey={0} bsStyle="success" />
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
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第"+(k+1)+"次冷温热结果"} eventKey={0} bsStyle="primary" key={k} 
                zeroRawData = {zerosRawData[k]} oneRawData = {onesRawData[k]} twoRawData = {twosRawData[k]}/>
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const ColdWarmHot = enhance(component);