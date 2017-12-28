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
  withState("pivot", "setPivot", ""),
  withHandlers({
    updateData: ({setData}) => (event) => {
      setData(event.target.value);
    },
    updateArgs: ({ setArgs }) => (event) => {
      setArgs(event.target.value);
    },
    updatePivot: ({ setPivot }) => (event) => {
      setPivot(event.target.value);
    },
    submit: ({ data, args, setResult, setBinaryData, setResultRawData, pivot }) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToBigSmall(dataArr, parseInt(pivot));
      const result = checkPattern(bData, patternArr);
      const bRawData = getRawDataWithPattern(bData, patternArr, dataArr);
      setBinaryData(bData);
      setResultRawData(bRawData);
      setResult(result);
    }
  })
);

const component = (props) => {
  const { csv, result, resultRawData, args, data, pivot, binaryData, updatePivot, updateArgs, updateData, setData, submit } = props;
  const disabled = getValidationState(args) === 'error' || getValidationState(data) === 'error' || getValidationState(pivot) === 'error';
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} placeholder="数字用逗号分割" value={data}/>
            <BallButtons setData={setData} csv={csv} />
            <FieldGroup label="分隔值" onChange={updatePivot} type="number" validationState={getValidationState(pivot)} placeholder="数字" />
            <PanelGroup>
              <BallData b={binaryData} header="二进制数据（大于等于分隔值为1，小于分隔值为0）" eventKey={0} bsStyle="success" />
            </PanelGroup>
            <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} placeholder="数字用逗号分割" />
            <CalculateButton onClick={submit} disabled={disabled} />
          </form>
        </Col>
        <Col xs={6}>
          <PanelGroup>
            <BallData b={result} header="结果" eventKey={0} bsStyle="primary" />
            <BallData b={resultRawData} header="结果对应原始数据" eventKey={0} bsStyle="primary" />
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const Pivot = enhance(component);