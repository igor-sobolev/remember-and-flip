import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import Countdown from 'react-countdown';

import { boardMachine, BoardEvents, BoardStates } from '../../state/board';
import { ModalInfo } from '../ModalInfo';
import { Board } from '../Board';
import { Button } from '../UI/Button';
import { useScreenSize } from '../../hooks/useScreenSize';
import { countdownRenderer } from '../utils';

import { BoardProps } from './GameContainer.types';

import styles from './GameContainer.module.scss';
import { BOARD_PREVIEW_DELAY } from '../../constants';

const GameContainer: React.FunctionComponent<BoardProps> = () => {
  const [state, send, service] = useMachine(boardMachine);
  service.onTransition((state) => console.log(state.value)); // @TODO: remove when component is ready

  const [screenWidth, screenHeight] = useScreenSize();
  const [boardSize, setBoardSize] = useState(0);

  useEffect(() => {
    const lowestDimension = screenWidth < screenHeight ? screenWidth : screenHeight;
    setBoardSize(lowestDimension * 0.8);
  }, [screenWidth, screenHeight, setBoardSize]);

  let step;

  if (state.value === BoardStates.INITIAL) {
    step = (
      <>
        <Board boardSize={boardSize} disabled />
        <ModalInfo key="start">
          <Button onClick={() => send({ type: BoardEvents.NEXT })}>Start</Button>
        </ModalInfo>
      </>
    );
  }

  if (state.value === BoardStates.PREVIEW) {
    step = (
      <>
        <Board boardSize={boardSize} disabled />
        <ModalInfo key="preview">
          <Countdown date={Date.now() + BOARD_PREVIEW_DELAY} renderer={countdownRenderer} />
        </ModalInfo>
      </>
    );
  }

  if (state.value === BoardStates.COUNTDOWN) {
    step = (
      <>
        <Board boardSize={boardSize} disabled />
        <ModalInfo key="countdown">Ready!</ModalInfo>
      </>
    );
  }

  if (state.value === BoardStates.GAME) step = <Board boardSize={boardSize} />;

  if (state.value === BoardStates.RESULT) {
    step = (
      <>
        <Board boardSize={boardSize} disabled />
        <ModalInfo key="countdown">Great!</ModalInfo>
      </>
    );
  }

  if (state.value === BoardStates.FINISH) {
    step = (
      <>
        <Board boardSize={boardSize} disabled />
        <ModalInfo key="countdown">Congratulations!</ModalInfo>
      </>
    );
  }

  return <div className={styles.game}>{step}</div>;
};

export default GameContainer;
