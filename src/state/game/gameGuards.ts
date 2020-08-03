import { MetaObject } from 'xstate';
import { GameContext, GameEvent, GameStates } from './game.types';
import { BOARD_SIZE } from '../../constants';

export function hasGamesRemaining(context: GameContext): boolean {
  return context.gamesElapsed !== 0;
}

export function hasTriesRemaining(context: GameContext): boolean {
  return context.triesElapsed !== 0;
}

export function isInitialCountdown(context: GameContext, event: GameEvent, { state }: MetaObject): boolean {
  return !!state.history?.matches(GameStates.GAME_INIT);
}

export function hasBeenPreviewed(context: GameContext): boolean {
  return context.flipIndex >= Math.pow(BOARD_SIZE, 2);
}
