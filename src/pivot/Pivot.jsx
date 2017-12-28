import * as React from 'react';
import { Button, Checkbox, Col, FormGroup, Grid, PanelGroup, Row } from 'react-bootstrap';
import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';
import { compose, withHandlers, withState } from 'recompose';
import { BallData } from '../share/BallData.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { Typeahead } from '../share/Typeahdead.jsx';
import { convertStrToArr } from '../util/Array.js';
import { convertToBigSmall } from '../pivot/Convert.js';
import { convertTwoDArrToOptions } from '../util/Array.js';

const getValidationState = (args) => {
  const regex = /^\d+(,\d+)*$/;
  if (!regex.test(args)) {
    return 'error';
  } else {
    return 'success';
  }
}

const enhance = compose(
  withState("data", "setData", ""),
  withState("binaryData", "setBinaryData", ""),
  withState("args", "setArgs", ""),
  withState("pivot", "setPivot", ""),
  withState("result", "setResult", ""),
  withState("resultRawData", "setResultRawData", ""),
  withHandlers({
    updateData: ({ setData }) => (selected) => {
      if (selected && selected[0] && selected[0].id) {
        setData(selected[0].id);
      }
    },
    updateDataByText: ({ setData }) => (event) => {
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
  const { result, resultRawData, args, data, pivot, csv, binaryData, updatePivot, updateArgs, updateData, updateDataByText, submit } = props;
  const disabled = getValidationState(args) === 'error' || getValidationState(data) === 'error';
  const options = convertTwoDArrToOptions(csv);
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <Typeahead
              options={options}
              label="数据"
              placeholder="预选或者数字用逗号分割"
              onSelectChange={updateData}
              onInputChange={updateDataByText}
              validationState={getValidationState(data)}
              data={data}
            />
            <FieldGroup label="分隔值" onChange={updatePivot} type="number" validationState={getValidationState(pivot)} placeholder="数字" />
            <PanelGroup>
              <BallData b={binaryData} header="二进制数据（大于分隔值为1，小于分隔值为0）" eventKey={0} bsStyle="success" />
            </PanelGroup>
            <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} placeholder="数字用逗号分割" />
            <FormGroup>
              <Button onClick={submit} block={true} bsStyle="primary" disabled={disabled}>计算</Button>
            </FormGroup>
          </form>
        </Col>
        <Col xs={6}>
          <PanelGroup>
            <BallData b={result} header="结果" eventKey={0} bsStyle="success" />
            <BallData b={resultRawData} header="结果对应原始数据" eventKey={0} bsStyle="success" />
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const Pivot = enhance(component);