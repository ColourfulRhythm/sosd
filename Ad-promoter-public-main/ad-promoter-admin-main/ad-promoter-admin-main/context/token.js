import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/authContext';

const GetToken = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    setToken(userToken.token);
  }, [token]);
  return token;
};

export default GetToken;
