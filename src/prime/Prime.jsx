import * as React from 'react';
import { Col, Grid, PanelGroup, Row } from 'react-bootstrap';
import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';
import { compose, withHandlers } from 'recompose';
import { BallButtons } from '../share/BallButtons.jsx';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { ResultData } from '../share/ResultData.jsx';
import { convertStrToArr } from '../util/Array';
import { convertToPrimeComposite } from '../prime/Convert';
import { generateResults} from '../share/Calculate.jsx';
import { withBaseData } from '../share/withData';

const enhance = compose(
  withBaseData,
  withHandlers({
    updateData: (props) => (event) => {
      const { setData } = props;
      setData(event.target.value);
    },
    updateArgs: ({ setArgs }) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({ data, setBinaryData, patterns, results, resultsRawData }) => () => {  
      // get the binary data
      const dataArr = convertStrToArr(data);
      const bData = convertToPrimeComposite(dataArr);
      setBinaryData(bData);
      generateResults(bData, dataArr, patterns, results, resultsRawData); 
    },
    submitUseManullayInputPattern: ({data, setBinaryData, args, patterns, resultsRawData, results}) => () => {
      // clear all arrays
      results.length = 0;
      resultsRawData.length = 0;
      patterns.length = 0;
      
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToPrimeComposite(dataArr);
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
  const { args, data, binaryData, updateArgs, updateData, submit, submitUseManullayInputPattern, setData, csv, patterns, results, resultsRawData } = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(data);
  const disabledForManualInput = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} placeholder="数字用逗号分割" value={data} />
            <BallButtons setData={setData} csv={csv} />
            <PanelGroup>
              <BallData b={binaryData} header="二进制数据 （质数为0，合数为1）" eventKey={0} bsStyle="success" />
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
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第"+(k+1)+"次质合结果"} eventKey={0} bsStyle="primary" key={k} />
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const Prime = enhance(component);