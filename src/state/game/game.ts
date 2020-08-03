import { Machine } from 'xstate';

import {
  FINAL_STATE,
  GAME_MACHINE_ID,
  NUMBER_OF_TRIES,
  BOARD_COUNTDOWN_DELAY,
  GAME_RESULT_DELAY,
  BOARD_PREVIEW_DELAY,
  TILE_PREVIEW_DELAY
} from '../../constants';

import { GameStates, GameStateSchema, GameEvent, GameContext, GameEvents, GameActions, GameGuards } from './game.types';
import { hasNoTriesRemaining, isInitialCountdown, hasGamesRemaining, hasBeenPreviewed } from './gameGuards';
import {
  reduceGames,
  initBoard,
  previewTile,
  cancelPreviewPreviousTile,
  increaseFlipIndex,
  resetFlipIndex,
  recordPreviewStartTime,
  unflipAll,
  flipExact
} from './gameActions';

const conditionalTransition = (target: string, cond: string, actions: string[] = []) => ({
  target,
  cond,
  actions
});

const directTransition = (target: string, actions: string[] = []) => ({ target, actions });

export const gameMachine = Machine<GameContext, GameStateSchema, GameEvent>(
  {
    key: GAME_MACHINE_ID,
    initial: GameStates.INITIAL,
    context: {
      gamesElapsed: NUMBER_OF_TRIES,
      board: [],
      triesElapsed: 0,
      flipIndex: 0,
      previewStartTime: 0
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
          IMMEDIATE: directTransition(GameStates.COUNTDOWN)
        }
      },
      [GameStates.COUNTDOWN]: {
        after: {
          BOARD_COUNTDOWN_DELAY: [
            conditionalTransition(GameStates.PREVIEW, GameGuards.IS_INITIAL_COUNTDOWN, [
              GameActions.RECORD_PREVIEW_START_TIME
            ]),
            directTransition(GameStates.GAME)
          ]
        },
        exit: [GameActions.RESET_FLIP_INDEX]
      },
      [GameStates.GAME]: {
        after: {
          IMMEDIATE: conditionalTransition(GameStates.RESULT, GameGuards.HAS_NO_TRIES_REMAINING)
        },
        on: {
          [GameEvents.FLIP]: directTransition(GameStates.GAME, [GameActions.FLIP_EXACT])
        }
      },
      [GameStates.PREVIEW]: {
        entry: [GameActions.PREVIEW_TILE, GameActions.CANCEL_PREVIEW_PREVIOUS_TILE],
        after: {
          TILE_PREVIEW_DELAY: [
            conditionalTransition(GameStates.COUNTDOWN, GameGuards.HAS_BEEN_PREVIEWED),
            directTransition(GameStates.PREVIEW, [GameActions.INCREASE_FLIP_INDEX])
          ]
        }
      },
      [GameStates.RESULT]: {
        exit: [GameActions.REDUCE_GAMES],
        after: {
          UNFLIP_DELAY: {
            actions: [GameActions.UNFLIP_ALL]
          },
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
      [GameGuards.HAS_NO_TRIES_REMAINING]: hasNoTriesRemaining,
      [GameGuards.IS_INITIAL_COUNTDOWN]: isInitialCountdown,
      [GameGuards.HAS_BEEN_PREVIEWED]: hasBeenPreviewed
    },
    actions: {
      [GameActions.REDUCE_GAMES]: reduceGames,
      [GameActions.INIT_BOARD]: initBoard,
      [GameActions.PREVIEW_TILE]: previewTile,
      [GameActions.CANCEL_PREVIEW_PREVIOUS_TILE]: cancelPreviewPreviousTile,
      [GameActions.INCREASE_FLIP_INDEX]: increaseFlipIndex,
      [GameActions.RESET_FLIP_INDEX]: resetFlipIndex,
      [GameActions.RECORD_PREVIEW_START_TIME]: recordPreviewStartTime,
      [GameActions.FLIP_EXACT]: flipExact,
      [GameActions.UNFLIP_ALL]: unflipAll
    },
    delays: {
      BOARD_COUNTDOWN_DELAY,
      GAME_RESULT_DELAY,
      UNFLIP_DELAY: GAME_RESULT_DELAY / 2,
      BOARD_PREVIEW_DELAY,
      TILE_PREVIEW_DELAY,
      IMMEDIATE: 0
    }
  }
);
