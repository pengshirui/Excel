import { Panel } from 'react-bootstrap';
import React from 'react';

const wStyle = {
  width: '100%',
  overflowX: 'auto',
};

export const BallData = (props) => {
  const { b, header, eventKey, bsStyle } = props;
  const content = b ? b.join() : undefined;
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle={bsStyle}>
      <div style={wStyle}>{content}</div>
    </Panel>
  );
}
