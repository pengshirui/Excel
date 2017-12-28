import * as React from 'react';
import { Button, ButtonToolbar, Col, FormGroup, Grid, PanelGroup, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { checkPattern, getRawDataWithPattern } from '../util/Pattern.js';
import { compose, withHandlers, withState } from 'recompose';
import { convertStrToArr, getColAsStr } from '../util/Array.js';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
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
    updateData: ({ setData, csv }) => (event) => {
      if (event.target.value > 6) {
        setData("")
      } else {
        const bData = getColAsStr(csv, event.target.value);
        setData(bData);
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
  const { result, resultRawData, args, data, pivot, binaryData, updatePivot, updateArgs, updateData, updateDataByText, submit } = props;
  const disabled = getValidationState(args) === 'error' || getValidationState(data) === 'error' || getValidationState(pivot) === 'error';
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateDataByText} validationState={getValidationState(data)} placeholder="数字用逗号分割" value={data}/>
            <FormGroup>
              <ButtonToolbar block="true">
                <ToggleButtonGroup type="radio" name="options" defaultValue={7} justified={true}>
                  <ToggleButton value={7} onChange={updateData}>手动输入</ToggleButton>
                  <ToggleButton value={0} onChange={updateData}>1号球</ToggleButton>
                  <ToggleButton value={1} onChange={updateData}>2号球</ToggleButton>
                  <ToggleButton value={2} onChange={updateData}>3号球</ToggleButton>
                  <ToggleButton value={3} onChange={updateData}>4号球</ToggleButton>
                  <ToggleButton value={4} onChange={updateData}>5号球</ToggleButton>
                  <ToggleButton value={5} onChange={updateData}>6号球</ToggleButton>
                  <ToggleButton value={6} onChange={updateData}>7号球</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </FormGroup>
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