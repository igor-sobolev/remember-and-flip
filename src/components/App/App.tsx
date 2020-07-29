import * as React from 'react';

import { GameContainer } from '../GameContainer';

import { AppProps } from './App.types';
import styles from './App.module.scss';

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={styles.app}>
      <GameContainer />
    </div>
  );
};

export default App;
