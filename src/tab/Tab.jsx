import React from 'react';
import { Button, Grid, PanelGroup, FormGroup } from 'react-bootstrap';
import { compose, withState, withHandlers } from 'recompose';

import { BallData } from '../home/BallData.jsx';
import { convertStrToArr, convertToBigSmall, checkPattern } from '../data/PatternService.js';
import { FieldGroup } from '../tab/FieldGroup.jsx';


const enhance = compose(
  withState("data", "setData", ""),
  withState("args", "setArgs", ""),
  withState("pivot", "setPivot", ""),
  withState("result", "setResult", ""),
  withHandlers({
    updateData: (props) => (event) => {
      const {setData} = props;
      setData(event.target.value);
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    updatePivot: ({setPivot}) => (event) => {
      setPivot(event.target.value);
    },
    submit: ({data, args, setResult, pivot}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const covertedDataArr = convertToBigSmall(dataArr, parseInt(pivot));
      const result = checkPattern(covertedDataArr, patternArr);
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
  const {header, result, args, data, pivot, updatePivot, updateArgs, updateData, submit} = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <form>
        <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} tip="数字用逗号分割" />
        <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} tip="数字用逗号分割"/> 
        <FieldGroup label="分隔值" onChange={updatePivot} type="number" validationState={getValidationState(pivot)} />       
        <FormGroup>
          <Button onClick={submit} block={true} bsStyle="primary" disabled={disabled}>计算</Button>
        </FormGroup>
        <PanelGroup>
          <BallData b={result} header={header} eventKey={0}/>
        </PanelGroup>
      </form>
    </Grid>
  );
}

export const Tab = enhance(component);