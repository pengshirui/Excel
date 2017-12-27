import * as React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export const FieldGroup = ({ label, validationState, ...props }) => {
  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      <FormControl.Feedback />
    </FormGroup>
  );
}
