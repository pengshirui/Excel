import React from 'react';
import { Grid, Form, FormGroup, PanelGroup } from 'react-bootstrap';
import { compose, withState, withHandlers } from 'recompose';

import { convertCsvTo2DArray, readFile, getCol } from '../data/FileService.js';
import { BallData } from '../home/BallData.jsx';

const enhance = compose(
  withState('b1', 'setB1', []),
  withState('b2', 'setB2', []),
  withState('b3', 'setB3', []),
  withState('b4', 'setB4', []),
  withState('b5', 'setB5', []),
  withState('b6', 'setB6', []),
  withState('b7', 'setB7', []),
  withState('filePath', 'setFilePath', ''),
  withHandlers({
    onChange: props => event => {
      if (event.target.files[0]) {
        props.setFilePath(event.target.files[0].path);
        const content = readFile(event.target.files[0].path);
        const twoDArr = convertCsvTo2DArray(content);
        const col0 = getCol(twoDArr, 0);
        const col1 = getCol(twoDArr, 1);
        const col2 = getCol(twoDArr, 2);
        const col3 = getCol(twoDArr, 3);
        const col4 = getCol(twoDArr, 4);
        const col5 = getCol(twoDArr, 5);
        const col6 = getCol(twoDArr, 6);
        props.setB1(col0);
        props.setB2(col1);
        props.setB3(col2);
        props.setB4(col3);
        props.setB5(col4);
        props.setB6(col5);
        props.setB7(col6);
      }
    },
    onClick: () => event => {
      event.target.value = null;
    }
  })
)

const Component = (props) => {
  const { b1, b2, b3, b4, b5, b6, b7, onChange, onClick } = props;
  return (
    <Grid fluid={true}>
      <Form>
        <FormGroup>
          <label>选择文件</label>
          <input type="file" id="input" accept='.csv' onChange={onChange} onClick={onClick}/>
        </FormGroup>
      </Form>
      <PanelGroup>
        <BallData b={b1} header="1号球" eventKey={1}/>
        <BallData b={b2} header="2号球" eventKey={2}/>
        <BallData b={b3} header="3号球" eventKey={3}/>
        <BallData b={b4} header="4号球" eventKey={4}/>
        <BallData b={b5} header="5号球" eventKey={5}/>
        <BallData b={b6} header="6号球" eventKey={6}/>
        <BallData b={b7} header="7号球" eventKey={7} bsStyle="primary"/>
      </PanelGroup>
    </Grid>
  )
};

export const Home = enhance(Component);
