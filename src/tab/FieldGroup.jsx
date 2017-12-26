import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export const FieldGroup = ({ tip, label, validationState, ...props }) => {
  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      <FormControl.Feedback />
      {tip && <HelpBlock>{tip}</HelpBlock>}
    </FormGroup>
  );
}
