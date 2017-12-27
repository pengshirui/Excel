import * as React from 'react';
import { ControlLabel, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { Typeahead as T } from 'react-bootstrap-typeahead';
import { convertTwoDArrToOptions } from '../util/Array.js';

export const Typeahead = (props) => {
  const { csv, label, validationState, ...rest } = props;
  const options = convertTwoDArrToOptions(csv);
  return (
    <FormGroup validationState={validationState} style={formGroup}>
      <ControlLabel>{label}</ControlLabel>
      <T
        align="justify"
        multiple={false}
        options={options}
        labelKey="label"
        emptyLabel="未导入csv文件或者未找到匹配"
        {...rest}
      />
      <FormControl.Feedback />
    </FormGroup>
  )
}