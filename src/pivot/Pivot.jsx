import * as React from 'react';
import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';
import { Col, Grid, PanelGroup, Row } from 'react-bootstrap';
import { compose, withHandlers, withState } from 'recompose';
import { BallButtons } from '../share/BallButtons.jsx';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { convertStrToArr } from '../util/Array.js';
import { convertToBigSmall } from '../pivot/Convert.js';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { generateResults} from '../share/Calculate.jsx';
import { ResultData } from '../share/ResultData.jsx';
import { withBaseData } from '../share/withData';

const getValidationState = (args) => {
  const regex = /^\d+(,\d+)*$/;
  if (!regex.test(args)) {
    return 'error';
  } else {
    return 'success';
  }
}

const enhance = compose(
  withBaseData,
  withState("leftMargin", "setLeftMargin", ""),
  withState("rightMargin", "setRightMargin", ""),
  withHandlers({
    updateData: ({setData}) => (event) => {
      setData(event.target.value);
    },
    updateArgs: ({ setArgs }) => (event) => {
      setArgs(event.target.value);
    },
    updateLeftMargin: ({ setLeftMargin }) => (event) => {
      setLeftMargin(event.target.value);
    },
    updateRightMargin: ({ setRightMargin }) => (event) => {
      setRightMargin(event.target.value);
    },
    submit: ({ data, setBinaryData, patterns, results, resultsRawData, leftMargin, rightMargin}) => () => {  
      // get the binary data
      const dataArr = convertStrToArr(data);
      const bData = convertToBigSmall(dataArr, parseInt(leftMargin), parseInt(rightMargin));
      setBinaryData(bData);
      generateResults(bData, dataArr, patterns, results, resultsRawData); 
    },
    submitUseManullayInputPattern: ({data, setBinaryData, args, patterns, resultsRawData, results, leftMargin, rightMargin}) => () => {
      // clear all arrays
      results.length = 0;
      resultsRawData.length = 0;
      patterns.length = 0;
      
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToBigSmall(dataArr, parseInt(leftMargin), parseInt(rightMargin));
      setBinaryData(bData);
      const result = checkPattern(bData, patternArr);
      const bRawData = getRawDataWithPattern(bData, patternArr, dataArr);
      patterns.push(patternArr);
      resultsRawData.push(bRawData);
      results.push(result);   
    }
  })
);

const component = (props) => {
  const { csv, args, data, leftMargin, rightMargin, binaryData, updateLeftMargin, updateRightMargin, updateArgs, updateData, setData, submit, submitUseManullayInputPattern, patterns, results, resultsRawData } = props;
  const disabled = getValidationState(data) === 'error' || getValidationState(leftMargin) === 'error'|| getValidationState(rightMargin) === 'error';
  const disabledForManualInput = getValidationState(args) === 'error' || getValidationState(data) === 'error' || getValidationState(leftMargin) === 'error'|| getValidationState(rightMargin) === 'error';
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} placeholder="数字用逗号分割" value={data}/>
            <BallButtons setData={setData} csv={csv} />
            <FieldGroup label="左边界值" onChange={updateLeftMargin} type="number" validationState={getValidationState(leftMargin)} placeholder="数字" />
            <FieldGroup label="右边界值" onChange={updateRightMargin} type="number" validationState={getValidationState(rightMargin)} placeholder="数字" />
            <PanelGroup>
              <BallData b={binaryData} header="二进制数据（左右边界值之内（包括左右边界值）为0，在左右边界值之外为1）" eventKey={0} bsStyle="success" />
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
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第"+(k+1)+"次大小结果"} eventKey={0} bsStyle="primary" key={k} />
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const Pivot = enhance(component);