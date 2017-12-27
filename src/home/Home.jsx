import * as React from 'react';
import { Grid, Panel, PanelGroup } from 'react-bootstrap';
import { BallData } from '../share/BallData.jsx';
import { getCol } from '../util/Array.js';

export const Home = (props) => {
  const { csv, path } = props;
  const b1 = getCol(csv, 0);
  const b2 = getCol(csv, 1);
  const b3 = getCol(csv, 2);
  const b4 = getCol(csv, 3);
  const b5 = getCol(csv, 4);
  const b6 = getCol(csv, 5);
  const b7 = getCol(csv, 6);
  return (
    <Grid fluid={true}>
      <PanelGroup>
        <Panel collapsible={false} header="原文件路径" eventKey={0} defaultExpanded={true} >
          <div>{path}</div>
        </Panel>
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
