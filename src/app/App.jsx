import React from 'react';
import { Col, Row, Grid, Tab, Nav, NavItem } from 'react-bootstrap';

import { Tab as FuncTab } from '../tab/Tab.jsx';
import { Home } from '../home/Home.jsx';
import { convertToBigSmall } from '../data/PatternService.js';

const style = {
  overflowX: 'hidden',
};

const margin = {
  marginBottom: '15px' 
}

export const App = () => {
  return (
    <Grid fluid={true}>
      <Tab.Container id="tabs-with-dropdown" defaultActiveKey={0} style={style}>
        <Row className="clearfix">
          <Col sm={12} style={margin}>
            <Nav bsStyle="tabs" justified={true}>
              <NavItem eventKey={0} >文件</NavItem>
              <NavItem eventKey={1} >大小</NavItem>
              <NavItem eventKey={2} >质和</NavItem>
              <NavItem eventKey={3} >3</NavItem>
              <NavItem eventKey={4} >4</NavItem>
              <NavItem eventKey={5} >5</NavItem>
              <NavItem eventKey={6} >6</NavItem>
              <NavItem eventKey={7} >7</NavItem>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey={0}>
                <Home />
              </Tab.Pane>
              <Tab.Pane eventKey={1}>
                <FuncTab header="大小" convert={convertToBigSmall} />
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                <FuncTab header="质和" convert={convertToBigSmall}/>
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                <FuncTab />
              </Tab.Pane>
              <Tab.Pane eventKey={4}>
                <FuncTab />
              </Tab.Pane>
              <Tab.Pane eventKey={5}>
                <FuncTab />
              </Tab.Pane>
              <Tab.Pane eventKey={6}>
                <FuncTab />
              </Tab.Pane>
              <Tab.Pane eventKey={7}>
                <FuncTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Grid>
  );
}
