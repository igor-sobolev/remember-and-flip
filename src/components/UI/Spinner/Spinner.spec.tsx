import React from 'react';

import { Spinner } from '.';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Given Spinner component', () => {
  describe('when it is rendered', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<Spinner />);
    });

    it('should match the snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});
