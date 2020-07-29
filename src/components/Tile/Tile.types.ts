export interface TileProps {
  filled: boolean;
  size: number;
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
