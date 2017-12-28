import * as React from 'react';
import { Button, Col, FormGroup, Grid, PanelGroup, Row } from 'react-bootstrap';
import { checkPattern, convertStrToArr} from '../util/Pattern.js';
import { compose, withHandlers, withState } from 'recompose';
import { BallData } from '../share/BallData.jsx';
import { FieldGroup } from '../share/FieldGroup.jsx';

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
      const result = checkPattern(dataArr, patternArr);
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
  const {result, resultRawData, args, data, binaryData, updateArgs, updateData, submit} = props;
  const regex = /^\d+(,\d+)*$/;
  const disabled = !regex.test(args) || !regex.test(data);
  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={6}>
          <form>
            <FieldGroup label="数据" onChange={updateData} validationState={getValidationState(data)} placeholder="数字用逗号分割" />  
            <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} placeholder="数字用逗号分割"/>      
            <FormGroup>
              <Button onClick={submit} block={true} bsStyle="primary" disabled={disabled}>计算</Button>
            </FormGroup>
          </form>
        </Col>
        <Col xs={6}>
          <PanelGroup>
            <BallData b={result} header="结果" eventKey={0} bsStyle="primary"/>
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const Origin = enhance(component);