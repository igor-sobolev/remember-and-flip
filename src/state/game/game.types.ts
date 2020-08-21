import { StateNodeConfig } from 'xstate';

export enum GameStates {
  INITIAL = 'initial',
  GAME_INIT = 'gameInit',
  COUNTDOWN = 'countdown',
  GAME = 'game',
  PREVIEW = 'preview',
  RESULT = 'result',
  FINISH = 'finish'
}

export enum GameEvents {
  NEXT = 'next',
  FLIP = 'flip',
  UNFLIP_ALL = 'unflip_all'
}

export enum GameGuards {
  HAS_NO_TRIES_REMAINING = 'hasTriesRemaining',
  HAS_GAMES_REMAINING = 'hasGamesRemaining',
  IS_INITIAL_COUNTDOWN = 'isInitialCountDown',
  HAS_BEEN_PREVIEWED = 'hasBeenPreviewed'
}

export enum GameActions {
  REDUCE_GAMES = 'reduceGames',
  INIT_BOARD = 'initBoard',
  PREVIEW_TILE = 'previewTile',
  CANCEL_PREVIEW_PREVIOUS_TILE = 'cancelPreviewPreviousTile',
  INCREASE_FLIP_INDEX = 'increaseFlipIndex',
  RESET_FLIP_INDEX = 'resetFlipIndex',
  RECORD_PREVIEW_START_TIME = 'recordPreviewStartTime',
  UNFLIP_ALL = 'unflipAll',
  FLIP_EXACT = 'flipExact'
}

export interface GameStateSchema {
  states: {
    [GameStates.INITIAL]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
    [GameStates.GAME_INIT]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
    [GameStates.COUNTDOWN]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
    [GameStates.GAME]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
    [GameStates.PREVIEW]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
    [GameStates.RESULT]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
    [GameStates.FINISH]: StateNodeConfig<GameContext, GameStateSchema, GameEvent>;
  };
}

export type GameEvent =
  | { type: GameEvents.NEXT }
  | { type: GameEvents.UNFLIP_ALL }
  | { type: GameEvents.FLIP; index: number };

export interface GameContext {
  gamesElapsed: number;
  board: Tile[];
  triesElapsed: number;
  flipIndex: number;
  previewStartTime: number;
}

export interface Tile {
  id: string;
  filled: boolean;
  flip: boolean;
}
