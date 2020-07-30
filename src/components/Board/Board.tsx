import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { BOARD_SIZE, BOARD_PREVIEW_DELAY } from '../../constants';
import { Tile } from '../Tile';
import { uuid } from '../utils';

import { BoardProps } from './Board.types';
import styles from './Board.module.scss';

const Board: React.FunctionComponent<BoardProps> = (props: BoardProps) => {
  const { boardSize, disabled, preview } = props;
  const [tileSize, setTileSize] = useState(0);
  const [tiles, setTiles] = useState([
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: false, flip: false, id: uuid() },
    { filled: false, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: false, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() },
    { filled: true, flip: false, id: uuid() }
  ]);
  const classes = classnames(styles.board, {
    [styles['board--disabled']]: disabled
  });

  useEffect(() => {
    setTileSize(boardSize / BOARD_SIZE);
  }, [boardSize]);

  useEffect(() => {
    if (preview) {
      const revertFlipDelay = BOARD_PREVIEW_DELAY / tiles.length;
      console.log(revertFlipDelay);
      tiles.forEach((tile, index) => {
        setTimeout(() => {
          const newTile = { ...tile, flip: true };
          setTiles([...tiles.slice(0, index), newTile, ...tiles.slice(index + 1)]);
        }, revertFlipDelay * index);
        setTimeout(() => {
          const newTile = { ...tile, flip: false };
          setTiles([...tiles.slice(0, index), newTile, ...tiles.slice(index + 1)]);
        }, revertFlipDelay * (index + 1));
      });
    }
  }, [preview, setTiles]);

  return (
    <div className={classes} style={{ width: boardSize, height: boardSize }}>
      {tiles.map((tile) => (
        <Tile key={tile.id} size={tileSize} filled={tile.filled} flip={tile.flip} />
      ))}
    </div>
  );
};

export default Board;
