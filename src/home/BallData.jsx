import React from 'react';
import { Panel, SafeAnchor } from 'react-bootstrap';

const wStyle = {
  width: '100%',
  overflowX: 'scroll',
};

export const BallData = (props) => {
  const { b, header, eventKey } = props;
  const content = b ? b.join() : undefined;
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle="danger">
      <SafeAnchor>
        <div style={wStyle}>{content}</div>
      </SafeAnchor>
    </Panel>
  );
}
