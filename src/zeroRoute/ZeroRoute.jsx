import * as React from 'react';
import { checkPattern, convertStrToArr, getRawDataWithPattern} from '../util/Pattern.js';
import { Col, Grid, PanelGroup, Row } from 'react-bootstrap';
import { compose, withHandlers } from 'recompose';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { convertToZeroRoute } from '../zeroRoute/Convert.js';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { withBaseData } from '../share/withData';

const enhance = compose(
  withBaseData,
  withHandlers({
    updateData: (props) => (event) => {
      const {setData} = props;
      setData(event.target.value);
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({data, args, setBinaryData, setResultRawData, setResult}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToZeroRoute(dataArr);
      setBinaryData(bData);
      const result = checkPattern(bData, patternArr);
      const bRawData = getRawDataWithPattern(bData, patternArr, dataArr);
      setResultRawData(bRawData);
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
            <PanelGroup>
              <BallData b={binaryData} header="二进制数据 （零路为1，其他为0）" eventKey={0} bsStyle="success"/>
            </PanelGroup>
            <FieldGroup label="模板" onChange={updateArgs} validationState={getValidationState(args)} placeholder="数字用逗号分割"/>      
            <CalculateButton onClick={submit} disabled={disabled} />
          </form>
        </Col>
        <Col xs={6}>
          <PanelGroup>
            <BallData b={result} header="结果" eventKey={0} bsStyle="primary"/>
            <BallData b={resultRawData} header="结果对应原始数据" eventKey={0} bsStyle="primary"/>
          </PanelGroup>
        </Col>
      </Row>
    </Grid>
  );
}

export const ZeroRoute = enhance(component);