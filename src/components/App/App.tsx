import * as React from 'react';

import { Board } from '../Board';

import { AppProps } from './App.types';
import styles from './App.module.scss';

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={styles.app}>
      <Board />
    </div>
  );
};

export default App;
