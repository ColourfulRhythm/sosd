import { createContext, useEffect, useState } from 'react';

const SingleAdContext = createContext();

export function SingleAdProvider({ children }) {
  const [adData, setAdData] = useState();

  return (
    <SingleAdContext.Provider value={{ adData, setAdData }}>
      {children}
    </SingleAdContext.Provider>
  );
}
export default SingleAdContext;
