import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { BOARD_SIZE } from '../../constants';
import { Tile } from '../Tile';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const DATA_QA = 'Board';

const Board: React.FunctionComponent<BoardProps> = (props: BoardProps) => {
  const { boardWidth, disabled, board, onFlip } = props;
  const [tileSize, setTileSize] = useState<number>(0);
  const classes = classnames(styles.board, {
    [styles['board--disabled']]: disabled
  });

  useEffect(() => {
    setTileSize(boardWidth / BOARD_SIZE);
  }, [boardWidth]);

  return (
    <div className={classes} style={{ width: boardWidth, height: boardWidth }}>
      {board.map((tile, index) => (
        <div key={tile.id} onClick={() => onFlip && onFlip(index)} data-qa={`${DATA_QA}_tile_wrapper`}>
          <Tile size={tileSize} isFilled={tile.filled} isFlipped={tile.flip} />
        </div>
      ))}
    </div>
  );
};

export default Board;
