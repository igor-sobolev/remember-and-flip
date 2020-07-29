import { Machine, assign } from 'xstate';

import {
  FINAL_STATE,
  BOARD_MACHINE_ID,
  NUMBER_OF_TRIES,
  BOARD_COUNTDOWN_DELAY,
  BOARD_RESULT_DELAY,
  BOARD_PREVIEW_DELAY
} from '../../constants';

import {
  BoardStates,
  BoardStateSchema,
  BoardEvent,
  BoardContext,
  BoardEvents,
  BoardActions,
  BoardGuards
} from './board.types';

const conditionalTransition = (target: string, cond: string) => ({
  target,
  cond
});

const directTransition = (target: string) => ({ target });

export const boardMachine = Machine<BoardContext, BoardStateSchema, BoardEvent>(
  {
    key: BOARD_MACHINE_ID,
    initial: BoardStates.INITIAL,
    context: {
      elapsed: NUMBER_OF_TRIES
    },
    states: {
      [BoardStates.INITIAL]: {
        on: {
          [BoardEvents.NEXT]: directTransition(BoardStates.COUNTDOWN)
        }
      },
      [BoardStates.COUNTDOWN]: {
        after: {
          BOARD_COUNTDOWN_DELAY: [
            conditionalTransition(BoardStates.PREVIEW, BoardGuards.IS_INITIAL_COUNTDOWN),
            directTransition(BoardStates.GAME)
          ]
        }
      },
      [BoardStates.GAME]: {
        on: {
          [BoardEvents.NEXT]: directTransition(BoardStates.RESULT)
        }
      },
      [BoardStates.PREVIEW]: {
        after: {
          BOARD_PREVIEW_DELAY: directTransition(BoardStates.COUNTDOWN)
        }
      },
      [BoardStates.RESULT]: {
        exit: [BoardActions.REDUCE_TRIES],
        after: {
          BOARD_RESULT_DELAY: [
            conditionalTransition(BoardStates.COUNTDOWN, BoardGuards.HAS_TRIES_REMAINING),
            directTransition(BoardStates.FINISH)
          ]
        }
      },
      [BoardStates.FINISH]: {
        type: FINAL_STATE
      }
    }
  },
  {
    guards: {
      [BoardGuards.HAS_TRIES_REMAINING]: (context) => {
        return context.elapsed !== 0;
      },
      [BoardGuards.IS_INITIAL_COUNTDOWN]: (context, event, { state }) => {
        return !!(state.history?.matches(BoardStates.INITIAL) || state.history?.matches(BoardStates.RESULT));
      }
    },
    actions: {
      [BoardActions.REDUCE_TRIES]: assign({
        elapsed: (context) => (context.elapsed > 0 ? context.elapsed - 1 : 0)
      })
    },
    delays: {
      BOARD_COUNTDOWN_DELAY,
      BOARD_RESULT_DELAY,
      BOARD_PREVIEW_DELAY
    }
  }
);
