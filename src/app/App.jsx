import React, { PureComponent } from 'react';
import { compose, withState } from 'recompose';

import { readFile } from '../file/FileService.js';

const a =  readFile();
const enhance = compose(
  withState('content', 'setContent', a)
)

const Component = (props) => {
  const { content } = props;
  return (
    <div>
      <input type="file" id="input" accept='.csv'/>
      <p>
        {content}
      </p>
    </div>
  );
}

const App = enhance(Component);
export default App;