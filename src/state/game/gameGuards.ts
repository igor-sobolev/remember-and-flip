import { MetaObject } from 'xstate';
import { GameContext, GameEvent, GameStates } from './game.types';

export function hasGamesRemaining(context: GameContext): boolean {
  return context.gamesElapsed !== 0;
}

export function hasTriesRemaining(context: GameContext): boolean {
  return context.triesElapsed !== 0;
}

export function isInitialCountdown(context: GameContext, event: GameEvent, { state }: MetaObject): boolean {
  return !!state.history?.matches(GameStates.GAME_INIT);
}
