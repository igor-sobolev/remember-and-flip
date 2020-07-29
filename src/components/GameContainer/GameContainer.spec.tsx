import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { GameContainer } from '.';

describe('given Board component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<GameContainer />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
