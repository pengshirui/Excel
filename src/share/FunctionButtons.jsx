import * as React from 'react';
import { ButtonToolbar, FormGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export const FunctionButtons = (props) => {
  const { updateSelectionByBtn } = props;
  return (
    <FormGroup>
      <ButtonToolbar block="true">
        <ToggleButtonGroup type="radio" name="options" justified={true} defaultValue={0}>
          <ToggleButton value={0} onChange={updateSelectionByBtn}>大小</ToggleButton>       
          <ToggleButton value={1} onChange={updateSelectionByBtn}>质合</ToggleButton>
          <ToggleButton value={2} onChange={updateSelectionByBtn}>奇偶</ToggleButton>
          <ToggleButton value={3} onChange={updateSelectionByBtn}>原始</ToggleButton>
          <ToggleButton value={4} onChange={updateSelectionByBtn}>012路</ToggleButton>
          <ToggleButton value={5} onChange={updateSelectionByBtn}>0路</ToggleButton>
          <ToggleButton value={6} onChange={updateSelectionByBtn}>1路</ToggleButton>
          <ToggleButton value={7} onChange={updateSelectionByBtn}>2路</ToggleButton>
          <ToggleButton value={8} onChange={updateSelectionByBtn}>升降平</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </FormGroup>
  )
}
