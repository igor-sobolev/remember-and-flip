import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { BOARD_SIZE } from '../../constants';
import { Tile } from '../Tile';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const Board: React.FunctionComponent<BoardProps> = (props: BoardProps) => {
  const { boardSize, disabled } = props;
  const [tileSize, setTileSize] = useState(0);
  const tiles = [
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: false },
    { filled: false },
    { filled: true },
    { filled: false },
    { filled: true },
    { filled: true },
    { filled: true }
  ];
  const classes = classnames(styles.board, {
    [styles['board--disabled']]: disabled
  });

  useEffect(() => {
    setTileSize(boardSize / BOARD_SIZE);
  }, [boardSize]);

  return (
    <div className={classes} style={{ width: boardSize, height: boardSize }}>
      {tiles.map((tile, index) => (
        <Tile key={index} size={tileSize} filled={tile.filled} />
      ))}
    </div>
  );
};

export default Board;
