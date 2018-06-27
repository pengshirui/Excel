import * as React from 'react';
import { Panel } from 'react-bootstrap';

const wStyle = {
  width: '100%',
  overflowX: 'auto',
};

const rStyle = {
  width: '100%',
  overflowX: 'auto',
  color:'green',
};


export const BallData = (props) => {
  const { b, header, eventKey, bsStyle, one, two, zero} = props;
  const content = b ? b.join() : undefined;
  //const {zero, one, two} = separateResultsManullyInput(data, b);
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle={bsStyle} defaultExpanded={true} >
      <div style={wStyle}>{content}</div>
      <div>所有0对应原始数据</div>
      <div style={rStyle}>{zero}</div>
      <div>所有1对应原始数据</div>
      <div style={rStyle}>{one}</div>
      <div>所有2对应原始数据</div>
      <div style={rStyle}>{two}</div>
    </Panel>
  );
}

export const OriginalData = (props) => {
  const { b, header, eventKey, bsStyle } = props;
  const content = b ? b.join() : undefined;
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle={bsStyle} defaultExpanded={true} >
      <div style={wStyle}>{content}</div>
    </Panel>
  );
}

