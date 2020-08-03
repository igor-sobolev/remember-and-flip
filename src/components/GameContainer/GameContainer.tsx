import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import Countdown from 'react-countdown';

import { gameMachine, GameEvents, GameStates } from '../../state/game';
import { ModalInfo } from '../ModalInfo';
import { Board } from '../Board';
import { Spinner } from '../UI/Spinner';
import { Button } from '../UI/Button';
import { useScreenSize } from '../../hooks/useScreenSize';
import { countdownRenderer } from '../utils';

import { BoardProps } from './GameContainer.types';

import styles from './GameContainer.module.scss';
import { BOARD_PREVIEW_DELAY } from '../../constants';

const GameContainer: React.FunctionComponent<BoardProps> = () => {
  const [state, send, service] = useMachine(gameMachine);
  service.onTransition((state) => console.log(state.value, state.context)); // @TODO: remove when component is ready

  const [screenWidth, screenHeight] = useScreenSize();
  const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    const lowestDimension = screenWidth < screenHeight ? screenWidth : screenHeight;
    setBoardWidth(lowestDimension * 0.8);
  }, [screenWidth, screenHeight, setBoardWidth]);

  let step;

  if (state.value === GameStates.INITIAL) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="start">
          <Button onClick={() => send({ type: GameEvents.NEXT })}>Start</Button>
        </ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.GAME_INIT) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="start">
          <Spinner />
        </ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.PREVIEW) {
    const now = state.context.previewStartTime;
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled preview />
        <ModalInfo key="preview">
          <Countdown date={now + BOARD_PREVIEW_DELAY} renderer={countdownRenderer} />
        </ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.COUNTDOWN) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="countdown">Ready!</ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.GAME) {
    step = (
      <Board
        board={state.context.board}
        boardWidth={boardWidth}
        onFlip={(index) => send({ type: GameEvents.FLIP, index })}
      />
    );
  }

  if (state.value === GameStates.RESULT) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled result />
        <ModalInfo key="countdown">Great!</ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.FINISH) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="countdown">Congratulations!</ModalInfo>
      </>
    );
  }

  return <div className={styles.game}>{step}</div>;
};

export default GameContainer;
