import * as React from 'react';
import { ControlLabel, FormGroup, Grid, PanelGroup } from 'react-bootstrap';
import { compose, withHandlers, withState } from 'recompose';
import { getCol, readCsvAs2DArr } from '../data/FileService.js';
import { BallData } from '../share/BallData.jsx';

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
        const twoDArr = readCsvAs2DArr(props.filePath);
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
      <form>
        <FormGroup>
          <ControlLabel>选择文件</ControlLabel>
          <input className="form-control" type="file" id="input" accept='.csv' onChange={onChange} onClick={onClick} />
        </FormGroup>
      </form>
      <PanelGroup>
        <BallData b={b1} header="1号球" eventKey={1} bsStyle="success" />
        <BallData b={b2} header="2号球" eventKey={2} bsStyle="success" />
        <BallData b={b3} header="3号球" eventKey={3} bsStyle="success" />
        <BallData b={b4} header="4号球" eventKey={4} bsStyle="success" />
        <BallData b={b5} header="5号球" eventKey={5} bsStyle="success" />
        <BallData b={b6} header="6号球" eventKey={6} bsStyle="success" />
        <BallData b={b7} header="7号球" eventKey={7} bsStyle="primary"/>
      </PanelGroup>
    </Grid>
  )
};

export const Home = enhance(Component);
