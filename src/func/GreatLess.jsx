import React from 'react';
import { Grid, PanelGroup } from 'react-bootstrap';

import { BallData } from '../home/BallData.jsx';
import { FieldGroup } from '../func/FieldGroup.jsx';

export const GreateLess = () => {
  return (
    <Grid fluid={true}>
      <FieldGroup label="data"/>
      <FieldGroup label="args"/>
      <PanelGroup>
        <BallData header="greateless" eventKey={0}/>
      </PanelGroup>
    </Grid>
  );
}
