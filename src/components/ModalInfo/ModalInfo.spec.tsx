import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ModalInfo } from '.';

describe('given ModalInfo component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ModalInfo>Example notification</ModalInfo>);
  });

  it('should match the snapshot', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
