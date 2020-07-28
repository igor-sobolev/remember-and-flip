import { renderHook } from '@testing-library/react-hooks';

import { useScreenSize } from './useScreenSize';

const width = 1001;
const height = 100;

describe('Given useScreenSize hook', () => {
  let windowSpy: jest.SpyInstance;
  let rendered: any;

  beforeAll(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
  });

  afterAll(() => {
    windowSpy.mockRestore();
  });

  beforeEach(() => {
    windowSpy.mockImplementation(() => ({
      innerWidth: width,
      innerHeight: height,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    rendered = renderHook(() => useScreenSize());
  });

  it('should match the snapshot', () => {
    expect(rendered).toMatchSnapshot();
  });

  it('should return correct result', () => {
    expect(rendered.result.current).toStrictEqual([width, height]);
  });
});
