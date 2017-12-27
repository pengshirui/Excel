import * as React from 'react';
import { Col, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { FirstRoute as FirstRouteTab } from '../firstRoute/FirstRoute.jsx';
import { Tab as FuncTab } from '../share/Tab.jsx';
import { Home as HomeTab } from '../home/Home.jsx';
import { OddEven as OddEvenTab } from '../oddeven/OddEven.jsx';
import { Origin as OriginTab } from '../origin/Origin.jsx';
import { Pivot as PivotTab } from '../pivot/Pivot.jsx';
import { Prime as PrimeTab } from '../prime/Prime.jsx';
import { SecondRoute as SecondRouteTab } from '../secondRoute/SecondRoute.jsx';
import { ZeroRoute as ZeroRouteTab } from '../zeroRoute/ZeroRoute.jsx';


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
              <NavItem eventKey={3} >奇偶</NavItem>
              <NavItem eventKey={4} >原始</NavItem>
              <NavItem eventKey={5} >零路</NavItem>
              <NavItem eventKey={6} >一路</NavItem>
              <NavItem eventKey={7} >二路</NavItem>
              <NavItem eventKey={8} >冷温热</NavItem>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey={0}>
                <HomeTab />
              </Tab.Pane>
              <Tab.Pane eventKey={1}>
                <PivotTab />
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                <PrimeTab />
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                <OddEvenTab />
              </Tab.Pane>
              <Tab.Pane eventKey={4}>
                <OriginTab />
              </Tab.Pane>
              <Tab.Pane eventKey={5}>
                <ZeroRouteTab />
              </Tab.Pane>
              <Tab.Pane eventKey={6}>
                <FirstRouteTab />
              </Tab.Pane>
              <Tab.Pane eventKey={7}>
                <SecondRouteTab />
              </Tab.Pane>
              <Tab.Pane eventKey={8}>
                <SecondRouteTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Grid>
  );
}
