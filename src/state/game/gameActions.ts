import { assign, AssignAction } from 'xstate';

import { BOARD_SIZE } from '../../constants';

import { GameContext, GameEvent, Tile } from './game.types';
import { uuid } from '../../components/utils';

export const reduceGames: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => ({
  ...context,
  gamesElapsed: context.gamesElapsed > 0 ? context?.gamesElapsed - 1 : 0
}));

export const initBoard: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  const [board, rightTileNumber] = generateBoard();

  return {
    ...context,
    board,
    triesElapsed: rightTileNumber
  };
});

export const unflipAll: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  const { board } = context;

  return {
    ...context,
    board: board.map((tile: Tile) => ({
      ...tile,
      flip: false
    }))
  };
});

export const flipExact: AssignAction<GameContext, GameEvent> = assign((context: GameContext, event: GameEvent) => {
  const { board } = context;
  const { index } = event as { index: number };

  if (board[index].flip) return context;

  const newTile: Tile = {
    ...board[index],
    flip: true
  };
  const flippedInBoard = [...board.slice(0, index), newTile, ...board.slice(index + 1)];

  return {
    ...context,
    board: flippedInBoard,
    triesElapsed: context.triesElapsed > 0 ? context?.triesElapsed - 1 : 0
  };
});

export const previewTile: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  const { board, flipIndex } = context;

  if (flipIndex === Math.pow(BOARD_SIZE, 2)) return context;

  const newTile: Tile = {
    ...board[flipIndex],
    flip: true
  };
  const flippedInBoard = [...board.slice(0, flipIndex), newTile, ...board.slice(flipIndex + 1)];

  return {
    ...context,
    board: flippedInBoard
  };
});

export const cancelPreviewPreviousTile: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  const { board, flipIndex } = context;

  if (flipIndex === 0) return context;

  const newTile: Tile = {
    ...board[flipIndex - 1],
    flip: false
  };
  const flippedInBoard = [...board.slice(0, flipIndex - 1), newTile, ...board.slice(flipIndex)];

  return {
    ...context,
    board: flippedInBoard
  };
});

export const increaseFlipIndex: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  const { flipIndex } = context;

  return {
    ...context,
    flipIndex: flipIndex < Math.pow(BOARD_SIZE, 2) ? flipIndex + 1 : flipIndex
  };
});

export const resetFlipIndex: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  return {
    ...context,
    flipIndex: 0
  };
});

export const recordPreviewStartTime: AssignAction<GameContext, GameEvent> = assign((context: GameContext) => {
  return {
    ...context,
    previewStartTime: Date.now()
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
