import * as React from 'react';
import styles from './App.module.scss';
import { Board } from '../Board';

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={styles.app}>
      <Board />
    </div>
  );
};

export default App;
