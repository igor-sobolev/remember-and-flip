import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Board from './Board';

describe('given Board component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Board />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
