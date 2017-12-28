import * as React from 'react';
import { Button, FormGroup } from 'react-bootstrap';

export const CalculateButton = (props) => {
  const { onClick, disabled } = props;
  return (
    <FormGroup>
      <Button onClick={onClick} block={true} disabled={disabled} bsStyle="success">计算</Button>
    </FormGroup>
  );
}
