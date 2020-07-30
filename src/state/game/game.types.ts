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
  FLIP = 'flip'
}

export enum GameGuards {
  HAS_TRIES_REMAINING = 'hasTriesRemaining',
  HAS_GAMES_REMAINING = 'hasGamesRemaining',
  IS_INITIAL_COUNTDOWN = 'isInitialCountDown'
}

export enum GameActions {
  REDUCE_TRIES = 'reduceTries',
  REDUCE_GAMES = 'reduceGames',
  INIT_BOARD = 'initBoard'
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

export type GameEvent = { type: GameEvents.NEXT } | { type: GameEvents.FLIP; index: number };

export interface GameContext {
  gamesElapsed: number;
  board: Tile[];
  triesElapsed: number;
}

export interface Tile {
  id: string;
  filled: boolean;
  flip: boolean;
}
