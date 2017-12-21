import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export const FieldGroup = ({ id, label, validationState, ...props }) => {
  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      <FormControl.Feedback />
      <HelpBlock>数字用逗号分割</HelpBlock>
    </FormGroup>
  );
}
