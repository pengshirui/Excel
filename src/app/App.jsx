import React, { PureComponent } from 'react';
import { compose, withState } from 'recompose';

import { readFile } from '../file/FileService.js';

const content = readFile();
const list = convertCsvTo2DArray(content);

const enhance = compose(
  withState('content', 'setContent', list)
)

const Component = (props) => {
  const { content } = props;
  const entry = content.map((element, j) => {
    (<div key={j}>{element}</div>);
  });
  return (
    <div>
      <input type="file" id="input" accept='.csv' />
      <p>
        {entry}
      </p>
    </div>
  );
}

const App = enhance(Component);
export default App;