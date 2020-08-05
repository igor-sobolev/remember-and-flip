import React from 'react';

import { Tile } from '.';
import { shallow, ShallowWrapper } from 'enzyme';

const givenProps = {
  size: 100,
  isFilled: true,
  isFlipped: true
};

describe('Given Tile component', () => {
  describe('when it is rendered', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<Tile {...givenProps} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});
