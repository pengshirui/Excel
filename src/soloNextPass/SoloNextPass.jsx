import * as React from 'react';
import { ButtonToolbar, Col, FormGroup, Grid, PanelGroup, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';
import { compose, withHandlers, withState } from 'recompose';
import { convertStrToArr, getColAsStr } from '../util/Array';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { convertToSoloNextPass } from '../soloNextPass/Convert.js';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { generateResults} from '../share/Calculate.jsx';
import { ResultData } from '../share/ResultData.jsx';
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
    submit: ({ ballNumber, csv, data, setBinaryData, patterns, results, resultsRawData }) => () => {  
      // get the binary data
      const dataArr = convertStrToArr(data);
      const bData = convertToSoloNextPass(ballNumber, csv);
      setBinaryData(bData);
      generateResults(bData, dataArr, patterns, results, resultsRawData); 
    }, 
    submitUseManullayInputPattern: ({ballNumber, csv, data, setBinaryData, args, patterns, resultsRawData, results}) => () => {
      // clear all arrays
      results.length = 0;
      resultsRawData.length = 0;
      patterns.length = 0;
      
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToSoloNextPass(ballNumber, csv);
      setBinaryData(bData);
      const result = checkPattern(bData, patternArr);
      const bRawData = getRawDataWithPattern(bData, patternArr, dataArr);
      patterns.push(patternArr);
      resultsRawData.push(bRawData);
      results.push(result);   
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
  const {args, data, binaryData, updateArgs, updateDataByBtn, submit, submitUseManullayInputPattern,  patterns, results, resultsRawData } = props;
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
              <BallData b={binaryData} header="二进制数据 (孤为0，邻为1，传为2）" eventKey={0} bsStyle="success" />
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
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第"+(k+1)+"次孤邻传结果"} eventKey={0} bsStyle="primary" key={k} />
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const SoloNextPass = enhance(component);