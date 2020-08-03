import { BOARD_SIZE } from './board';

export const GAME_MACHINE_ID = 'board';
export const NUMBER_OF_TRIES = 10;
export const BOARD_COUNTDOWN_DELAY = 3000;
export const GAME_RESULT_DELAY = 2000;
export const BOARD_PREVIEW_DELAY = 10000;
export const GAME_REVEAL_DELAY = 350;
export const TILE_PREVIEW_DELAY = BOARD_PREVIEW_DELAY / Math.pow(BOARD_SIZE, 2);
