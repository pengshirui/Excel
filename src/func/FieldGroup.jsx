import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}
