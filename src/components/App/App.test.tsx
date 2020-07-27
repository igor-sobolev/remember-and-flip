import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';

describe('given App component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
