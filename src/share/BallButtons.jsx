import * as React from 'react';
import { ButtonToolbar, FormGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { getColAsStr } from '../util/Array.js';
import { withHandlers } from 'recompose';

const enhance = withHandlers({
  updateDataByBtn: ({ setData, csv }) => (event) => {
    if (event.target.value > 6) {
      setData("")
    } else {
      const bData = getColAsStr(csv, event.target.value);
      setData(bData);
    }
  },
});

const component = (props) => {
  const { updateDataByBtn } = props;
  return (
    <FormGroup>
      <ButtonToolbar block="true">
        <ToggleButtonGroup type="radio" name="options" defaultValue={0} justified={true}>
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
  )
}

export const BallButtons = enhance(component);