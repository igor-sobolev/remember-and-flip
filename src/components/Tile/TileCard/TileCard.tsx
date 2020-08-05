import React from 'react';

import { TileCardProps } from './TileCard.types';

const TileCard: React.FunctionComponent<TileCardProps> = ({ options, className }: TileCardProps) => (
  <div className={className} style={options}></div>
);

export default TileCard;
