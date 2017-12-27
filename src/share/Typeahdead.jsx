import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Typeahead as T } from 'react-bootstrap-typeahead';
import { convertTwoDArrToOptions } from '../util/Array.js';

const enhance = compose(
  withState("checkBox", "setCheckBox", false),
  withHandlers({
    updateCheckBox: ({ checkBox, setCheckBox }) => () => {
      setCheckBox(!checkBox);
    }
  })
)

const component = (props) => {
  const { csv, checkBox, label, validationState, updateCheckBox, onSelectChange, onInputChange, placeholder } = props;
  const options = convertTwoDArrToOptions(csv);
  let input;
  if (checkBox) {
    input = (
      <FormControl onChange={onInputChange} placeholder={placeholder} />
    )
  } else {
    input = (
      <T
        align="justify"
        multiple={false}
        options={options}
        labelKey="label"
        emptyLabel="未导入csv文件或者未找到匹配"
        onChange={onSelectChange}
        placeholder={placeholder}
      />
    )
  }
  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      {input}
      <FormControl.Feedback />
      <Checkbox onClick={updateCheckBox}>手动输入数据</Checkbox>
    </FormGroup>
  )
}

export const Typeahead = enhance(component);