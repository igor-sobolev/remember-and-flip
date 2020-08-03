import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { BOARD_SIZE } from '../../constants';
import { Tile } from '../Tile';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const Board: React.FunctionComponent<BoardProps> = (props: BoardProps) => {
  const { boardWidth, disabled, board, onFlip = (index: number) => index } = props;
  const [tileSize, setTileSize] = useState(0);
  const classes = classnames(styles.board, {
    [styles['board--disabled']]: disabled
  });

  useEffect(() => {
    setTileSize(boardWidth / BOARD_SIZE);
  }, [boardWidth]);

  return (
    <div className={classes} style={{ width: boardWidth, height: boardWidth }}>
      {board.map((tile, index) => (
        <div key={tile.id} onClick={() => onFlip(index)}>
          <Tile size={tileSize} filled={tile.filled} isFlipped={tile.flip} />
        </div>
      ))}
    </div>
  );
};

export default Board;
