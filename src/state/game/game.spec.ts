import { gameMachine } from './game';
import { GameStates, GameContext, GameEvent, GameStateSchema, GameEvents } from './game.types';
import { interpret, State, Interpreter } from 'xstate';
import { SimulatedClock } from 'xstate/lib/SimulatedClock';
import { IMMEDIATE, GAME_RESULT_DELAY } from '../../constants';

import * as gameContextMock from '../../mocks/gameContext.json';

// jest.useFakeTimers();

// const DATA_QA = 'GameContainer';

describe('Given game machine', () => {
  const clock = new SimulatedClock();
  let service: Interpreter<GameContext, GameStateSchema, GameEvent>;

  beforeAll(() => {
    // jest.useFakeTimers();
    service = interpret(gameMachine, { clock });
  });

  afterAll(() => {
    // jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  describe('when user is on initial state', () => {
    beforeEach(() => {
      service.start(GameStates.INITIAL);
    });

    afterEach(() => {
      service.stop();
    });

    describe('and starts a game', () => {
      beforeEach(() => {
        service.send(GameEvents.NEXT);
      });

      it('should navigate to GAME_INIT state', () => {
        expect(service.state.value).toBe(GameStates.GAME_INIT);
      });
    });
  });

  describe('when user is on game initialization step', () => {
    beforeEach(() => {
      const initialState = State.from<GameContext, GameEvent>(GameStates.GAME_INIT, gameContextMock);
      service.start(initialState);
    });

    afterEach(() => {
      service.stop();
    });

    describe('and immediate timer fires', () => {
      beforeEach(() => {
        jest.runTimersToTime(IMMEDIATE);
      });

      xit('should transition him to countdown step', () => {
        expect(service.state.value).toBe(GameStates.COUNTDOWN);
      });
    });
  });

  describe('when user is on game step', () => {
    beforeEach(() => {
      const initialState = State.from<GameContext, GameEvent>(GameStates.GAME, gameContextMock);
      service.start(initialState);
    });

    afterEach(() => {
      service.stop();
    });

    describe('and flip event is sent', () => {
      beforeEach(() => {
        service.send({ type: GameEvents.FLIP, index: 0 });
      });

      it('should have 5 tries left', () => {
        expect(service.state.context.triesElapsed).toBe(5);
      });

      it('should transition him to game step', () => {
        expect(service.state.value).toBe(GameStates.GAME);
      });

      describe('and the same tile is flipped again', () => {
        beforeEach(() => {
          service.send({ type: GameEvents.FLIP, index: 0 });
        });

        it('should still have 5 tries', () => {
          expect(service.state.context.triesElapsed).toBe(5);
        });
      });

      describe('and all tries are used', () => {
        beforeEach(() => {
          service.send({ type: GameEvents.FLIP, index: 1 });
          service.send({ type: GameEvents.FLIP, index: 2 });
          service.send({ type: GameEvents.FLIP, index: 3 });
          service.send({ type: GameEvents.FLIP, index: 4 });
          service.send({ type: GameEvents.FLIP, index: 5 });

          // jest.runTimersToTime(IMMEDIATE);
          clock.increment(IMMEDIATE);
        });

        it('tries should be 0', () => {
          expect(service.state.context.triesElapsed).toBe(0);
        });

        it('should redirect user to result state', () => {
          expect(service.state.value).toBe(GameStates.RESULT);
        });
      });
    });
  });

  describe('when user is on result step', () => {
    beforeEach(() => {
      const initialState = State.from<GameContext, GameEvent>(GameStates.RESULT, {
        ...gameContextMock,
        gamesElapsed: 0
      });
      service.start(initialState);
    });

    afterEach(() => {
      service.stop();
    });

    describe('and game_result timer fires', () => {
      beforeEach(() => {
        console.log(service.state.value);
        // jest.runTimersToTime(GAME_RESULT_DELAY);
        clock.increment(GAME_RESULT_DELAY + 10000);
        console.log(service.state.value);
      });

      xit('should transition him to finish step', () => {
        expect(service.state.value).toBe(GameStates.FINISH);
      });
    });
  });
});
