import React, { useEffect, useState, useCallback } from 'react';
import { useMachine } from '@xstate/react';
import Countdown from 'react-countdown';
import debounce from 'lodash-es/debounce';

import { gameMachine, GameEvents, GameStates } from '../../state/game';
import { ModalInfo } from '../ModalInfo';
import { Board } from '../Board';
import { Spinner } from '../UI/Spinner';
import { Button } from '../UI/Button';
import { useScreenSize } from '../../hooks/useScreenSize';
import { countdownRenderer } from '../utils';

import { BoardProps } from './GameContainer.types';

import styles from './GameContainer.module.scss';
import {
  BOARD_PREVIEW_DELAY,
  IMMEDIATE,
  TILE_PREVIEW_DELAY,
  BOARD_COUNTDOWN_DELAY,
  UNFLIP_DELAY,
  GAME_RESULT_DELAY
} from '../../constants';

const DATA_QA = 'GameContainer';

const GameContainer: React.FunctionComponent<BoardProps> = () => {
  const [state, send] = useMachine(gameMachine);
  const [screenWidth, screenHeight] = useScreenSize();
  const [boardWidth, setBoardWidth] = useState(0);

  const previewTile = useCallback(
    debounce(() => send(GameEvents.NEXT), TILE_PREVIEW_DELAY),
    []
  );
  const goNextImmediate = useCallback(
    debounce(() => send(GameEvents.NEXT), IMMEDIATE),
    []
  );
  const runCountdown = useCallback(
    debounce(() => send(GameEvents.NEXT), BOARD_COUNTDOWN_DELAY),
    []
  );
  const unflipAll = useCallback(
    debounce(() => send(GameEvents.UNFLIP_ALL), UNFLIP_DELAY),
    []
  );
  const goNextGameOrFinish = useCallback(
    debounce(() => send(GameEvents.NEXT), GAME_RESULT_DELAY),
    []
  );

  let step;

  useEffect(() => {
    const lowestDimension = screenWidth < screenHeight ? screenWidth : screenHeight;
    setBoardWidth(lowestDimension * 0.8);
  }, [screenWidth, screenHeight, setBoardWidth]);

  if (state.value === GameStates.INITIAL) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="start">
          <Button data-qa={`${DATA_QA}_next`} onClick={() => send(GameEvents.NEXT)}>
            Start
          </Button>
        </ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.GAME_INIT) {
    goNextImmediate();

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
    previewTile();

    const now = state.context.previewStartTime;
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="preview">
          <Countdown date={now + BOARD_PREVIEW_DELAY} renderer={countdownRenderer} />
        </ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.COUNTDOWN) {
    runCountdown();

    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="countdown">Ready!</ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.GAME) {
    goNextImmediate();

    step = (
      <Board
        board={state.context.board}
        boardWidth={boardWidth}
        onFlip={(index) => send({ type: GameEvents.FLIP, index })}
      />
    );
  }

  if (state.value === GameStates.RESULT) {
    unflipAll();
    goNextGameOrFinish(); // @TODO: doesn't work simultaneouly??

    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="result">Great!</ModalInfo>
      </>
    );
  }

  if (state.value === GameStates.FINISH) {
    step = (
      <>
        <Board board={state.context.board} boardWidth={boardWidth} disabled />
        <ModalInfo key="finish">Congratulations!</ModalInfo>
      </>
    );
  }

  return <div className={styles.game}>{step}</div>;
};

export default GameContainer;
