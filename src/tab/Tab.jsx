import React from 'react';
import { Button, ControlLabel, Grid, PanelGroup, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { compose, withState, withHandlers } from 'recompose';

import { BallData } from '../home/BallData.jsx';
import { convertStrToArr, convertToBigSmall, checkPattern } from '../data/PatternService.js';
import { FieldGroup } from '../tab/FieldGroup.jsx';


const enhance = compose(
  withState("data", "setData", ""),
  withState("args", "setArgs", ""),
  withState("result", "setResult", ""),
  withHandlers({
    updateData: (props) => (event) => {
      const {setData} = props;
      setData(event.target.value);
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({data, args, setResult}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const covertedDataArr = convertToBigSmall(dataArr, 3);
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
  const {header, result, args, data, updateArgs, updateData, submit} = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <form>
        <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)}/>
        <FieldGroup label="参数" onChange={updateArgs} validationState={getValidationState(args)}/>       
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