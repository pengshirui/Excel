import * as React from 'react';
import { Button, ButtonToolbar, Col, FormGroup, Grid, PanelGroup, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { checkPattern, getRawDataWithPattern} from '../util/Pattern.js';
import { compose, withHandlers } from 'recompose';
import { convertStrToArr, getColAsStr } from '../util/Array';
import { BallData } from '../share/BallData.jsx';
import { CalculateButton } from '../share/CalculateButton.jsx';
import { convertToOddEven } from '../oddeven/Convert';
import { FieldGroup } from '../share/FieldGroup.jsx';
import { withBaseData } from '../share/withData';


const enhance = compose(
  withBaseData,
  withHandlers({
    updateData: (props) => (event) => {
      const {setData} = props;
      setData(event.target.value);
    },
    updateDataByBtn: ({ setData, csv }) => (event) => {
      if (event.target.value > 6) {
        setData("")
      } else {
        const bData = getColAsStr(csv, event.target.value);
        setData(bData);
      }
    },
    updateArgs: ({setArgs}) => (event) => {
      setArgs(event.target.value);
    },
    submit: ({data, args, setBinaryData, setResultRawData, setResult}) => () => {
      const dataArr = convertStrToArr(data);
      const patternArr = convertStrToArr(args);
      const bData = convertToOddEven(dataArr);
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
            <FormGroup>
              <ButtonToolbar block="true">
                <ToggleButtonGroup type="radio" name="options" defaultValue={7} justified={true}>
                  <ToggleButton value={7} onChange={updateDataByBtn}>手动输入</ToggleButton>
                  <ToggleButton value={0} onChange={updateDataByBtn}>1号球</ToggleButton>
                  <ToggleButton value={1} onChange={updateDataByBtn}>2号球</ToggleButton>
                  <ToggleButton value={2} onChange={updateDataByBtn}>3号球</ToggleButton>
                  <ToggleButton value={3} onChange={updateDataByBtn}>4号球</ToggleButton>
                  <ToggleButton value={4} onChange={updateDataByBtn}>5号球</ToggleButton>
                  <ToggleButton value={5} onChange={updateDataByBtn}>6号球</ToggleButton>
                  <ToggleButton value={6} onChange={updateDataByBtn}>7号球</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </FormGroup>
            <PanelGroup>
              <BallData b={binaryData} header="二进制数据 （偶数为0，奇数为1）" eventKey={0} bsStyle="success"/>
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

export const OddEven = enhance(component);