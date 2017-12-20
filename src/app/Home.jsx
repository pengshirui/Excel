import React from 'react';
import { Button, Col, Grid, Form, FormGroup, Row, Well } from 'react-bootstrap';
import { compose, withState, withHandlers } from 'recompose';

import { readFile } from '../file/FileService.js';
import { FieldGroup } from '../app/FieldGroup.jsx';

const enhance = compose(
  withState('content', 'setContent', []),
  withState('filePath', 'setFilePath', ''),
  withHandlers({
    onChange: props => event => {
      if (event.target.files[0]) {
        props.setFilePath(event.target.files[0].path);
        const content = readFile(event.target.files[0].path);
        props.setContent(content);
      }
    }
  })
)

const Component = (props) => {
  const { content, onChange } = props;
  return (
    <Grid fluid={true}>
      <Form>
        <FormGroup>
          <label>select file</label>
          <input type="file" id="input" accept='.csv' onChange={onChange} />
        </FormGroup>
      </Form>
      <Well bsSize="sm">
        {content}
      </Well>
    </Grid>
  );
}

export const Home = enhance(Component);
