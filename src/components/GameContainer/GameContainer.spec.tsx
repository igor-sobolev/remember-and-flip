import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { GameContainer } from '.';

describe('given GameContainer component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<GameContainer />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
