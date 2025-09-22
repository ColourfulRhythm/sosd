import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useAuthContext();
  const [success, setSucess] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://35.153.52.116/api/v1/auth/signin', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      setSucess('user not logged in');
      setIsLoading(false);
      setError(json.msg);
      setIsLoading(false);
    }
    if (response.ok) {
      console.log(json);
      setSucess('user logged in');
      setError(json.success);
      setIsLoading(false);

      //save user to local storage
      localStorage.setItem('token', JSON.stringify(json));

      //update the auth context
      dispatch({ type: 'TOKEN_VALUE', payload: json });
    }
  };
  // console.log(isLoading);
  return { login, isLoading, error, success };
};
