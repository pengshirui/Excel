import React from 'react';
import { Col, Row, Grid, Tab, Nav, NavItem } from 'react-bootstrap';

import { Function } from '../func/Function.jsx';
import { Home } from '../home/Home.jsx';

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
              <NavItem eventKey={0}>主页</NavItem>
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
                <Function header="大小"/>
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                <Function header="质和"/>
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                <Function />
              </Tab.Pane>
              <Tab.Pane eventKey={4}>
                <Function />
              </Tab.Pane>
              <Tab.Pane eventKey={5}>
                <Function />
              </Tab.Pane>
              <Tab.Pane eventKey={6}>
                <Function />
              </Tab.Pane>
              <Tab.Pane eventKey={7}>
                <Function />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Grid>
  );
}
