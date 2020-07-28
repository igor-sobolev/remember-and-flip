import React, { useRef, useState, useEffect, RefObject } from 'react';

import { BOARD_SIZE } from '../../constants';
import { useScreenSize } from '../../hooks/useScreenSize';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const Board: React.FunctionComponent<BoardProps> = () => {
  const boardWrapper: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState(0);
  const [screenWidth] = useScreenSize();

  useEffect(() => {
    setTileSize(Number(boardWrapper?.current?.clientWidth) / BOARD_SIZE);
  }, [boardWrapper, screenWidth]);

  return (
    <div className={styles.board} ref={boardWrapper}>
      size: {tileSize}
    </div>
  );
};

export default Board;
