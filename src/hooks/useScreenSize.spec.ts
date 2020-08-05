import React, { RefObject } from 'react';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { useScreenSize } from './useScreenSize';

const WIDTH = 1001;
const HEIGHT = 100;

describe('Given useScreenSize hook', () => {
  let windowSpy: jest.SpyInstance;
  let rendered: RenderHookResult<RefObject<HTMLDivElement>, number[]>;

  beforeAll(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
  });

  afterAll(() => {
    windowSpy.mockRestore();
  });

  beforeEach(() => {
    windowSpy.mockImplementation(() => ({
      innerWidth: WIDTH,
      innerHeight: HEIGHT,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    rendered = renderHook(() => useScreenSize());
  });

  it('should match the snapshot', () => {
    expect(rendered).toMatchSnapshot();
  });

  it('should return correct result', () => {
    expect(rendered.result.current).toStrictEqual([WIDTH, HEIGHT]);
  });

  describe('when passed a container', () => {
    const NEW_WIDTH = 125;
    const NEW_HEIGHT = 120;

    beforeAll(() => {
      jest.spyOn(React, 'createRef').mockReturnValue({
        current: {
          clientWidth: NEW_WIDTH,
          clientHeight: NEW_HEIGHT
        }
      });
    });

    beforeEach(() => {
      const containerRef: React.RefObject<HTMLDivElement> = React.createRef();

      rendered = renderHook(() => useScreenSize(containerRef));
    });

    it('should match the snapshot', () => {
      expect(rendered).toMatchSnapshot();
    });

    it('should return correct result', () => {
      expect(rendered.result.current).toStrictEqual([NEW_WIDTH, NEW_HEIGHT]);
    });
  });
});
