import * as React from 'react';
import { Button, FormGroup, Grid, PanelGroup } from 'react-bootstrap';
import { checkPattern, convertStrToArr, convertToBigSmall } from '../data/PatternService.js';
import { compose, withHandlers, withState } from 'recompose';
import { BallData } from '../share/BallData.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';

const enhance = compose(
  withState("data", "setData", ""),
  withState("binaryData", "setBinaryData", ""),
  withState("args", "setArgs", ""),
  withState("pivot", "setPivot", ""),
  withState("result", "setResult", ""),
  withHandlers({
    updateData: ({setData}) => (event) => {
      setData(event.target.value);
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    updatePivot: ({setPivot}) => (event) => {
      setPivot(event.target.value);
    },
    submit: ({data, args, setResult, setBinaryData, pivot}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToBigSmall(dataArr, parseInt(pivot));
      setBinaryData(bData);
      const result = checkPattern(bData, patternArr);
      // add aglorithm here
      setResult(result);
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
  const {result, args, data, pivot, binaryData, updatePivot, updateArgs, updateData, submit} = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <form>
        <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} tip="数字用逗号分割" />
        <PanelGroup>
          <BallData b={binaryData} header="二进制数据" eventKey={0} bsStyle="success"/>
        </PanelGroup>
        <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} tip="数字用逗号分割"/> 
        <FieldGroup label="分隔值" onChange={updatePivot} type="number" validationState={getValidationState(pivot)} />       
        <FormGroup>
          <Button onClick={submit} block={true} bsStyle="primary" disabled={disabled}>计算</Button>
        </FormGroup>
        <PanelGroup>
          <BallData b={result} header="结果" eventKey={0} bsStyle="success"/>
        </PanelGroup>
      </form>
    </Grid>
  );
}

export const Pivot = enhance(component);