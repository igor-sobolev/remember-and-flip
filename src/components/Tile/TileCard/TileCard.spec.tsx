import React from 'react';

import { TileCard } from '.';
import { shallow, ShallowWrapper } from 'enzyme';

const givenProps = {
  className: 'test',
  options: {
    width: 100,
    height: 100,
    margin: 0
  }
};

describe('Given TileCard component', () => {
  describe('when it is rendered', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<TileCard {...givenProps} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});
