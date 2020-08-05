import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Board } from '.';
import { Tile } from '../Tile';

import { BOARD_SIZE } from '../../constants';

const DATA_QA = 'Board';
const givenProps = {
  boardWidth: 1000,
  board: [
    {
      id: 'testId',
      flip: false,
      filled: true
    }
  ],
  onFlip: jest.fn()
};

describe('Given Board component', () => {
  describe('when it is rendered', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      wrapper = shallow(<Board {...givenProps} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it('should pass correct tileSize to Tile component', () => {
      const tileSize = wrapper.find(Tile).props().size;
      expect(tileSize).toBe(givenProps.boardWidth / BOARD_SIZE);
    });

    describe('when tile is clicked', () => {
      beforeEach(() => {
        const testTile = wrapper.find(`div[data-qa="${DATA_QA}_tile_wrapper"]`);
        testTile.simulate('click');
      });

      it('should call onFlip', () => {
        expect(givenProps.onFlip).toHaveBeenCalledWith(0);
      });
    });

    describe('when boardWidth is changed', () => {
      const NEW_WIDTH = 1100;

      beforeEach(() => {
        wrapper.setProps({ boardWidth: NEW_WIDTH });
      });

      it('should pass correct tileSize to Tile component', () => {
        const tileSize = wrapper.find(Tile).props().size;
        expect(tileSize).toBe(NEW_WIDTH / BOARD_SIZE);
      });
    });
  });
});
