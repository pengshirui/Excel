import React from 'react';
import { Button, Grid, PanelGroup, FormGroup } from 'react-bootstrap';
import { compose, withState, withHandlers } from 'recompose';

import { BallData } from '../home/BallData.jsx';
import { convertStrToArr } from '../data/FileService.js';
import { FieldGroup } from '../func/FieldGroup.jsx';
import { isEmptyStr } from '../util/Guard.js';

const enhance = compose(
  withState("content", "setContent", ""),
  withState("args", "setArgs", ""),
  withState("result", "setResult", ""),
  withHandlers({
    updateContent: ({setContent}) => (event) => {
      setContent(event.target.value);
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({content, args, setResult}) => () => {
      const arr = convertStrToArr(args);
      // add aglorithm here
      setResult(arr);
    }
  })
);

const component = (props) => {
  const {header, result, args, content, updateArgs, updateContent, submit} = props;
  const regex = /^\d+(,\d+)*$/
  const disabled = !regex.test(args) || !regex.test(content);
  return (
    <Grid fluid={true}>
      <FieldGroup label="数据" onChange={updateContent}/>
      <FieldGroup label="参数" onChange={updateArgs}/>
      <FormGroup>
        <Button onClick={submit} block={true} bsStyle="primary" disabled={disabled}>计算</Button>
      </FormGroup>
      <PanelGroup>
        <BallData b={result} header={header} eventKey={0}/>
      </PanelGroup>
    </Grid>
  );
}

export const Function = enhance(component);