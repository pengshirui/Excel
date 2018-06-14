import * as React from 'react';
import { Panel } from 'react-bootstrap';

const wStyle = {
  width: '100%',
  overflowX: 'auto',
};

const zeroStyle = {
  color: 'green',
  overflowX: 'auto',
};

export const ResultData = (props) => {
  const { pattern, resultData, resultRawData, header, eventKey, bsStyle, zeroRawData, oneRawData, twoRawData } = props;
  const contentPattern = pattern ? pattern.join() : undefined;
  const content = resultData ? resultData.join() : undefined;
  const contentRaw = resultRawData ? resultRawData.join() : undefined;
  const contentZero = zeroRawData ? zeroRawData.join() : undefined;
  const contextOne = oneRawData ? oneRawData.join() : undefined;
  const contextTwo = twoRawData ? twoRawData.join() : undefined;
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle={bsStyle} defaultExpanded={true} >
      <div >模板</div>
      <div style={wStyle}>{contentPattern}</div>
      <div></div>
      <div >结果</div>
      <div style={wStyle}>{content}</div>
      <div></div>
      <div>结果对应原始数据</div>
      <div style={wStyle}>{contentRaw}</div>
      <div >所有0对应原始数据</div>
      <div style={zeroStyle}>{contentZero}</div>
      <div >所有1对应原始数据</div>
      <div style={zeroStyle}>{contextOne}</div>
      <div >所有2对应原始数据</div>
      <div style={zeroStyle}>{contextTwo}</div>
    </Panel>
  );
}
