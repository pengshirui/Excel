import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import React from 'react';

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
