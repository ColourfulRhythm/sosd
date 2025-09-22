import {useState, useEffect} from 'react';

const useWidth = (breakPoint, breakpoint2) => {
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const responsive = width > breakPoint ? true : false;
  const responsive2 = width > breakpoint2 ? true : false;

  return {
    responsive,
    responsive2
  };
};

export default useWidth;
