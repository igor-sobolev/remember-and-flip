import React from 'react';
import classnames from 'classnames';
import ReactCardFlip from 'react-card-flip';

import { TileCard } from './TileCard';
import { TileProps } from './Tile.types';

import styles from './Tile.module.scss';

const Tile: React.FunctionComponent<TileProps> = (props: TileProps) => {
  const { isFilled, size, spacing = 2, isFlipped } = props;
  const classesWithFlip = classnames(styles.tile, {
    [styles['tile--filled']]: isFilled,
    [styles['tile--wrong']]: !isFilled
  });
  const options = { width: size - spacing * 2, height: size - spacing * 2, margin: spacing };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <TileCard className={styles.tile} options={options} />
      <TileCard className={classesWithFlip} options={options} />
    </ReactCardFlip>
  );
};

export default Tile;
