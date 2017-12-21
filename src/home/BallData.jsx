import React from 'react';
import { Panel } from 'react-bootstrap';

const wStyle = {
  width: '100%',
  overflowX: 'scroll',
};

export const BallData = (props) => {
  const { b, header, eventKey, bsStyle } = props;
  const content = b ? b.join() : undefined;
  const stytle = bsStyle ? bsStyle : "danger";
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle={stytle}>
      <div style={wStyle}>{content}</div>
    </Panel>
  );
}
