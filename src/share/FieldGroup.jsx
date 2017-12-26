import * as React from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

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
