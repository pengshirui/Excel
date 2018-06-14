import * as React from 'react';
import { Col, Grid, PanelGroup, Row } from 'react-bootstrap';
import { compose, withHandlers } from 'recompose';
import { generateResults, generateResultWithManuInput, separateResults} from '../share/Calculate.jsx';
import { BallButtons } from '../share/BallButtons.jsx';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { convertStrToArr } from '../util/Array';
import { convertToUpDownEven } from '../upDownEven/Convert.js';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { ResultData } from '../share/ResultData.jsx';
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
    submit: ({data, setBinaryData, setPatterns, setResultsRawData, setResults, setZerosRawData, setOnesRawData, setTwosRawData  }) => () => {
      // get the binary data
      const dataArr = convertStrToArr(data);
      const bData = convertToUpDownEven(dataArr);
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
      const bData = convertToUpDownEven(dataArr);
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
  const {args, data, binaryData, updateArgs, updateData, submit, submitUseManullayInputPattern, setData, csv, patterns, results, resultsRawData,  zerosRawData, onesRawData, twosRawData} = props;
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
              <BallData b={binaryData} header="二进制数据 （降是0，平是1，升是2）" eventKey={0} bsStyle="success" />
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
              <ResultData pattern={patterns[k]} resultData={results[k]} resultRawData={r} header={"第"+(k+1)+"次升降平结果"} eventKey={0} bsStyle="primary" key={k} 
                zeroRawData = {zerosRawData[k]} oneRawData = {onesRawData[k]} twoRawData = {twosRawData[k]}/>
            ))}
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const UpDownEven = enhance(component);