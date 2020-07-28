import { StateNodeConfig } from 'xstate';

export enum BoardStates {
  INITIAL = 'initial',
  COUNTDOWN = 'countdown',
  GAME = 'game',
  PREVIEW = 'preview',
  RESULT = 'result',
  FINISH = 'finish'
}

export enum BoardEvents {
  NEXT = 'next'
}

export enum BoardGuards {
  HAS_TRIES_REMAINING = 'hasTriesRemaining',
  IS_INITIAL_COUNTDOWN = 'isInitialCountDown'
}

export enum BoardActions {
  REDUCE_TRIES = 'reduceTries'
}

export interface BoardStateSchema {
  states: {
    [BoardStates.INITIAL]: StateNodeConfig<BoardContext, BoardStateSchema, BoardEvent>;
    [BoardStates.COUNTDOWN]: StateNodeConfig<BoardContext, BoardStateSchema, BoardEvent>;
    [BoardStates.GAME]: StateNodeConfig<BoardContext, BoardStateSchema, BoardEvent>;
    [BoardStates.PREVIEW]: StateNodeConfig<BoardContext, BoardStateSchema, BoardEvent>;
    [BoardStates.RESULT]: StateNodeConfig<BoardContext, BoardStateSchema, BoardEvent>;
    [BoardStates.FINISH]: StateNodeConfig<BoardContext, BoardStateSchema, BoardEvent>;
  };
}

export type BoardEvent = { type: BoardEvents.NEXT };

export interface BoardContext {
  elapsed: number;
}
