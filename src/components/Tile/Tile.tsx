import React from 'react';
import classnames from 'classnames';
import ReactCardFlip from 'react-card-flip';

import { TileProps, TileCardProps } from './Tile.types';

import styles from './Tile.module.scss';

const TileCard: React.FunctionComponent<TileCardProps> = ({ options, className }: TileCardProps) => (
  <div className={className} style={options}></div>
);

const Tile: React.FunctionComponent<TileProps> = (props: TileProps) => {
  const { filled, size, spacing = 2, isFlipped = false } = props;
  const withFlip = classnames(styles.tile, {
    [styles['tile--filled']]: filled,
    [styles['tile--wrong']]: !filled
  });
  const options = { width: size - spacing * 2, height: size - spacing * 2, margin: spacing };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <TileCard className={styles.tile} options={options} />
      <TileCard className={withFlip} options={options} />
    </ReactCardFlip>
  );
};

export default Tile;
