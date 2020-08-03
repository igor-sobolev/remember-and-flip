import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { BOARD_SIZE, BOARD_PREVIEW_DELAY, GAME_REVEAL_DELAY } from '../../constants';
import { Tile } from '../Tile';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const Board: React.FunctionComponent<BoardProps> = (props: BoardProps) => {
  const { boardWidth, disabled, result, board, onFlip = (index: number) => index } = props;
  const [tileSize, setTileSize] = useState(0);
  const [tiles, setTiles] = useState(board);
  const classes = classnames(styles.board, {
    [styles['board--disabled']]: disabled
  });

  useEffect(() => {
    setTileSize(boardWidth / BOARD_SIZE);
  }, [boardWidth]);

  useEffect(() => {
    setTiles(board);
  }, [board]);

  useEffect(() => {
    if (result) {
      tiles.forEach((tile, index) => {
        setTimeout(() => {
          const newTile = { ...tile, flip: true };
          setTiles([...tiles.slice(0, index), newTile, ...tiles.slice(index + 1)]);
        }, GAME_REVEAL_DELAY);
      });
    }
    // eslint-disable-next-line
    // @TODO: refactor may be
  }, [result]);

  return (
    <div className={classes} style={{ width: boardWidth, height: boardWidth }}>
      {tiles.map((tile, index) => (
        <div key={tile.id} onClick={() => onFlip(index)}>
          <Tile size={tileSize} filled={tile.filled} flip={tile.flip} />
        </div>
      ))}
    </div>
  );
};

export default Board;
