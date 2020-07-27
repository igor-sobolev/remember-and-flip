import React, { useRef, useState, useEffect, RefObject } from 'react';

import { BOARD_SIZE } from '../../constants';

import styles from './Board.module.scss';

interface BoardProps {}

const Board: React.FunctionComponent<BoardProps> = () => {
  const boardWrapper: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState(0);

  useEffect(() => {
    setTileSize(Number(boardWrapper?.current?.clientWidth) / BOARD_SIZE);
  }, [boardWrapper]);

  return (
    <div className={styles.board} ref={boardWrapper}>
      size: {tileSize}
    </div>
  );
};

export default Board;
