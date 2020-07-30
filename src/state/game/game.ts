import { Machine } from 'xstate';

import {
  FINAL_STATE,
  GAME_MACHINE_ID,
  NUMBER_OF_TRIES,
  BOARD_COUNTDOWN_DELAY,
  GAME_RESULT_DELAY,
  BOARD_PREVIEW_DELAY,
  GAME_INIT_DELAY
} from '../../constants';

import { GameStates, GameStateSchema, GameEvent, GameContext, GameEvents, GameActions, GameGuards } from './game.types';
import { hasTriesRemaining, isInitialCountdown, hasGamesRemaining } from './gameGuards';
import { reduceTries, reduceGames, initBoard } from './gameActions';

const conditionalTransition = (target: string, cond: string, actions: string[] = []) => ({
  target,
  cond,
  actions
});

const directTransition = (target: string) => ({ target });

export const gameMachine = Machine<GameContext, GameStateSchema, GameEvent>(
  {
    key: GAME_MACHINE_ID,
    initial: GameStates.INITIAL,
    context: {
      gamesElapsed: NUMBER_OF_TRIES,
      board: [],
      triesElapsed: 0
    },
    states: {
      [GameStates.INITIAL]: {
        on: {
          [GameEvents.NEXT]: directTransition(GameStates.GAME_INIT)
        }
      },
      [GameStates.GAME_INIT]: {
        entry: [GameActions.INIT_BOARD],
        after: {
          GAME_INIT_DELAY: directTransition(GameStates.COUNTDOWN)
        }
      },
      [GameStates.COUNTDOWN]: {
        after: {
          BOARD_COUNTDOWN_DELAY: [
            conditionalTransition(GameStates.PREVIEW, GameGuards.IS_INITIAL_COUNTDOWN),
            directTransition(GameStates.GAME)
          ]
        }
      },
      [GameStates.GAME]: {
        entry: [GameActions.REDUCE_TRIES],
        on: {
          [GameEvents.FLIP]: [
            conditionalTransition(GameStates.GAME, GameGuards.HAS_TRIES_REMAINING),
            directTransition(GameStates.RESULT)
          ]
        }
      },
      [GameStates.PREVIEW]: {
        after: {
          BOARD_PREVIEW_DELAY: directTransition(GameStates.COUNTDOWN)
        }
      },
      [GameStates.RESULT]: {
        exit: [GameActions.REDUCE_TRIES],
        after: {
          GAME_RESULT_DELAY: [
            conditionalTransition(GameStates.GAME_INIT, GameGuards.HAS_GAMES_REMAINING),
            directTransition(GameStates.FINISH)
          ]
        }
      },
      [GameStates.FINISH]: {
        type: FINAL_STATE
      }
    }
  },
  {
    guards: {
      [GameGuards.HAS_GAMES_REMAINING]: hasGamesRemaining,
      [GameGuards.HAS_TRIES_REMAINING]: hasTriesRemaining,
      [GameGuards.IS_INITIAL_COUNTDOWN]: isInitialCountdown
    },
    actions: {
      [GameActions.REDUCE_GAMES]: reduceGames,
      [GameActions.REDUCE_TRIES]: reduceTries,
      [GameActions.INIT_BOARD]: initBoard
    },
    delays: {
      BOARD_COUNTDOWN_DELAY,
      GAME_RESULT_DELAY,
      BOARD_PREVIEW_DELAY,
      GAME_INIT_DELAY
    }
  }
);
