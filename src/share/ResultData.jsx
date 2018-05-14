import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

const wStyle = {
  width: '100%',
  overflowX: 'auto',
};


export const ResultData = (props) => {
  const { pattern, resultData, resultRawData, header, eventKey, bsStyle } = props;
  const contentPattern = pattern ? pattern.join() : undefined;
  const content = resultData ? resultData.join() : undefined;
  const contentRaw = resultRawData ? resultRawData.join() : undefined;
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
    </Panel>
  );
}
