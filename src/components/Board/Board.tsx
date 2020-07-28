import React, { useRef, useState, useEffect, RefObject } from 'react';
import { useMachine } from '@xstate/react';

import { BOARD_SIZE } from '../../constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import { boardMachine, BoardEvents } from '../../state/board';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const Board: React.FunctionComponent<BoardProps> = () => {
  const boardWrapper: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState(0);
  const [screenWidth] = useScreenSize();
  const [state, send, service] = useMachine(boardMachine);
  service.onTransition((state) => console.log(state.value));

  useEffect(() => {
    setTileSize(Number(boardWrapper?.current?.clientWidth) / BOARD_SIZE);
  }, [boardWrapper, screenWidth]);

  return (
    <div className={styles.board} ref={boardWrapper}>
      <div style={{ width: '100%' }}>size: {tileSize}</div>
      <div style={{ width: '100%' }}>state: {state.value}</div>
      <button onClick={() => send({ type: BoardEvents.NEXT })}>next</button>
    </div>
  );
};

export default Board;
