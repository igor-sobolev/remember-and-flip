export interface TileProps {
  filled: boolean;
  size: number;
  isFlipped: boolean;
  spacing?: number;
}

export interface TileCardProps {
  options: {
    width: number;
    height: number;
    margin: number;
  };
  className: string;
}
