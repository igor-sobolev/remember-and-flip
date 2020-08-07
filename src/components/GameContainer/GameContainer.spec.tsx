import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { GameContainer } from '.';
import { useMachine } from '@xstate/react';
import { GameStates } from '../../state/game';
import * as gameContextMock from '../../mocks/gameContext.json';

const sendMock = jest.fn();

jest.mock('@xstate/react', () => ({
  useMachine: jest
    .fn()
    .mockImplementation(() => [{ value: GameStates.INITIAL, context: { ...gameContextMock, board: [] } }, sendMock])
}));

describe('given GameContainer component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<GameContainer />);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should match the snapshot', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  describe('when machine returns GAME state', () => {
    beforeEach(() => {
      (useMachine as jest.Mock).mockImplementation(() => [
        { value: GameStates.GAME, context: gameContextMock },
        sendMock
      ]);

      wrapper = shallow(<GameContainer />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when machine returns RESULT state', () => {
    beforeEach(() => {
      (useMachine as jest.Mock).mockImplementation(() => [
        { value: GameStates.RESULT, context: gameContextMock },
        sendMock
      ]);

      wrapper = shallow(<GameContainer />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when machine returns FINISH state', () => {
    beforeEach(() => {
      (useMachine as jest.Mock).mockImplementation(() => [
        { value: GameStates.FINISH, context: gameContextMock },
        sendMock
      ]);

      wrapper = shallow(<GameContainer />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when machine returns COUNTDOWN state', () => {
    beforeEach(() => {
      (useMachine as jest.Mock).mockImplementation(() => [
        { value: GameStates.COUNTDOWN, context: gameContextMock },
        sendMock
      ]);

      wrapper = shallow(<GameContainer />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when machine returns PREVIEW state', () => {
    beforeEach(() => {
      (useMachine as jest.Mock).mockImplementation(() => [
        { value: GameStates.PREVIEW, context: gameContextMock },
        sendMock
      ]);

      wrapper = shallow(<GameContainer />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when machine returns GAME_INIT state', () => {
    beforeEach(() => {
      (useMachine as jest.Mock).mockImplementation(() => [
        { value: GameStates.GAME_INIT, context: gameContextMock },
        sendMock
      ]);

      wrapper = shallow(<GameContainer />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});
