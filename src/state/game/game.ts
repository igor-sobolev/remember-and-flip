import { Machine } from 'xstate';

import { FINAL_STATE, GAME_MACHINE_ID, NUMBER_OF_TRIES } from '../../constants';

import { GameStates, GameStateSchema, GameEvent, GameContext, GameEvents, GameActions, GameGuards } from './game.types';
import { hasNoTriesRemaining, isInitialCountdown, hasGamesRemaining, hasBeenPreviewed } from './game.guards';
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
} from './game.actions';

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
        on: {
          [GameEvents.NEXT]: directTransition(GameStates.COUNTDOWN)
        }
      },
      [GameStates.COUNTDOWN]: {
        on: {
          [GameEvents.NEXT]: [
            conditionalTransition(GameStates.PREVIEW, GameGuards.IS_INITIAL_COUNTDOWN, [
              GameActions.RECORD_PREVIEW_START_TIME
            ]),
            directTransition(GameStates.GAME)
          ]
        },
        exit: [GameActions.RESET_FLIP_INDEX]
      },
      [GameStates.GAME]: {
        on: {
          [GameEvents.NEXT]: conditionalTransition(GameStates.RESULT, GameGuards.HAS_NO_TRIES_REMAINING),
          [GameEvents.FLIP]: directTransition(GameStates.GAME, [GameActions.FLIP_EXACT])
        }
      },
      [GameStates.PREVIEW]: {
        entry: [GameActions.PREVIEW_TILE, GameActions.CANCEL_PREVIEW_PREVIOUS_TILE],
        on: {
          [GameEvents.NEXT]: [
            conditionalTransition(GameStates.COUNTDOWN, GameGuards.HAS_BEEN_PREVIEWED),
            directTransition(GameStates.PREVIEW, [GameActions.INCREASE_FLIP_INDEX])
          ]
        }
      },
      [GameStates.RESULT]: {
        entry: [GameActions.REDUCE_GAMES],
        on: {
          [GameEvents.UNFLIP_ALL]: {
            actions: [GameActions.UNFLIP_ALL]
          },
          [GameEvents.NEXT]: [
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
    }
  }
);
