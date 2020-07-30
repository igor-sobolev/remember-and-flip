import { assign, AssignAction } from 'xstate';

import { BOARD_SIZE } from '../../constants';

import { GameContext, GameEvent, Tile } from './game.types';
import { uuid } from '../../components/utils';

export const reduceGames: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => ({
  ...context,
  gamesElapsed: context.gamesElapsed > 0 ? context?.gamesElapsed - 1 : 0
}));

export const reduceTries: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => ({
  ...context,
  triesElapsed: context.triesElapsed > 0 ? context?.triesElapsed - 1 : 0
}));

export const initBoard: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  const [board, rightTileNumber] = generateBoard();

  return {
    ...context,
    board,
    triesElapsed: rightTileNumber
  };
});

function generateBoard(): [Tile[], number] {
  const board: Tile[] = [];
  let filledNumber = 0;

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const filled = Math.random() < 0.5;
      board.push({
        id: uuid(),
        filled,
        flip: false
      });
      if (filled) filledNumber++;
    }
  }

  return [board, filledNumber];
}
