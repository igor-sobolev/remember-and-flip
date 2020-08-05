import React from 'react';

import { Button } from '.';
import { shallow, ShallowWrapper } from 'enzyme';

const givenProps = {
  onClick: jest.fn()
};

describe('Given Button component', () => {
  describe('when it is rendered', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<Button {...givenProps}>Test button</Button>);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    describe('when it is clicked', () => {
      beforeEach(() => {
        wrapper.simulate('click');
      });

      it('should call onClick', () => {
        expect(givenProps.onClick).toHaveBeenCalled();
      });
    });
  });
});
