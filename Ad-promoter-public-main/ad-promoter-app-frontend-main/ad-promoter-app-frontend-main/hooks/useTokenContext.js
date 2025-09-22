import { TokenContext } from '@/context/tokenContext';
import { useContext } from 'react';

export const useTokenContext = () => {
  const context = useContext(TokenContext);

  if (!context) {
    throw Error('useTokenContext must be used inside an TokenContextProvider');
  }

  return context;
};
