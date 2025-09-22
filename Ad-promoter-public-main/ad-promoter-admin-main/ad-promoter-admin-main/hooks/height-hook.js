import {useState, useEffect} from 'react';

const useHeight = (breakPoint) => {
    const [height, setHeight] = useState();
  
    useEffect(() => {
      setHeight(window.innerHeight);
      window.addEventListener("resize", () => {
        setHeight(window.innerHeight);
      });
    }, []);
  
    const responsiveHeight = height > breakPoint ? true : false;
  
    return {
      responsiveHeight
    };
  };
  
  export default useHeight;
  