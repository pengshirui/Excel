import * as React from 'react';
import { Col, Glyphicon, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { compose, withHandlers, withState } from 'recompose';
import { ColdWarmHot as ColdWarmHotTab } from '../coldWarmHot/ColdWarmHot.jsx';
import { FirstRoute as FirstRouteTab } from '../firstRoute/FirstRoute.jsx';
import { Home as HomeTab } from '../home/Home.jsx';
import { OddEven as OddEvenTab } from '../oddeven/OddEven.jsx';
import { Origin as OriginTab } from '../origin/Origin.jsx';
import { Pivot as PivotTab } from '../pivot/Pivot.jsx';
import { Prime as PrimeTab } from '../prime/Prime.jsx';
import { SecondRoute as SecondRouteTab } from '../secondRoute/SecondRoute.jsx';
import { ZeroRoute as ZeroRouteTab } from '../zeroRoute/ZeroRoute.jsx';
import { readCsvAs2DArr } from '../util/File.js';

const sideBar = {
  backgroundColor: '#337ab7',
  position: 'fixed',
  top: '0px',
  bottom: '0px',
  left: '0px',
  width: '50px',
};

const inputFile = {
  display: 'none'
}

const content = {
  position: 'absolute',
  left: '50px',
  right: '0',
  overflowX: 'hidden',

}

const tab = {
  overflowX: 'hidden',
};

const margin = {
  marginTop: '15px'
}


const enhance = compose(
  withState('data', 'setData', []),
  withState('filePath', 'setFilePath', ''),
  withHandlers({
    onChange: props => event => {
      if (event.target.files[0]) {
        props.setFilePath(event.target.files[0].path);
        const twoDArr = readCsvAs2DArr(event.target.files[0].path);
        props.setData(twoDArr);
      }
    },
    onClick: () => event => {
      event.target.value = null;
    }
  })
)

const component = (props) => {
  const { data, filePath, onChange, onClick } = props;
  return (
    <Grid fluid={true}>
      <div style={sideBar}>
        <label className="btn btn-lg btn-primary btn-block">
          <Glyphicon glyph="file" />
          <input type="file" style={inputFile} accept='.csv' onChange={onChange} onClick={onClick} />
        </label>      
      </div>
      <div style={content}>
        <Tab.Container id="tabs-with-dropdown" defaultActiveKey={0}>
          <Row className="clearfix">
            <Col sm={12}>
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
              <Tab.Content animation style={margin}>
                <Tab.Pane eventKey={0}>
                  <HomeTab data={data} path={filePath}/>
                </Tab.Pane>
                <Tab.Pane eventKey={1}>
                  <PivotTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                  <PrimeTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={3}>
                  <OddEvenTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={4}>
                  <OriginTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={5}>
                  <ZeroRouteTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={6}>
                  <FirstRouteTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={7}>
                  <SecondRouteTab data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey={8}>
                  <ColdWarmHotTab data={data} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Grid>
  );
}

export const App = enhance(component);