import { Tile } from '../../state/game';

export interface BoardProps {
  boardWidth: number;
  board: Tile[];
  onFlip?: (index: number) => void;
  disabled?: boolean;
}
