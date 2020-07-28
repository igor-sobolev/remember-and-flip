import { Machine, assign } from 'xstate';

import { FINAL_STATE, BOARD_MACHINE_ID, NUMBER_OF_TRIES } from '../../constants';

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
          [BoardEvents.NEXT]: BoardStates.COUNTDOWN
        }
      },
      [BoardStates.COUNTDOWN]: {
        on: {
          [BoardEvents.NEXT]: conditionalTransition(BoardStates.PREVIEW, BoardGuards.IS_INITIAL_COUNTDOWN),
          [BoardEvents.NEXT]: BoardStates.GAME
        }
      },
      [BoardStates.GAME]: {
        on: {
          [BoardEvents.NEXT]: BoardStates.RESULT
        }
      },
      [BoardStates.PREVIEW]: {
        on: {
          [BoardEvents.NEXT]: BoardStates.COUNTDOWN
        }
      },
      [BoardStates.RESULT]: {
        exit: [BoardActions.REDUCE_TRIES],
        on: {
          [BoardEvents.NEXT]: conditionalTransition(BoardStates.COUNTDOWN, BoardGuards.HAS_TRIES_REMAINING),
          [BoardEvents.NEXT]: BoardStates.FINISH
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
        return state.matches(BoardStates.INITIAL) || state.matches(BoardStates.RESULT);
      }
    },
    actions: {
      [BoardActions.REDUCE_TRIES]: assign({
        elapsed: (context) => (context.elapsed > 0 ? context.elapsed - 1 : 0)
      })
    }
  }
);
