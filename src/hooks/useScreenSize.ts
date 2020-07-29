import { useLayoutEffect, useState, RefObject } from 'react';

export function useScreenSize(container?: RefObject<HTMLDivElement>): number[] {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      const width = container?.current?.clientWidth ? container.current?.clientWidth : window.innerWidth;
      const height = container?.current?.clientHeight ? container.current?.clientWidth : window.innerHeight;
      setSize([width, height]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [container]);
  return size;
}
