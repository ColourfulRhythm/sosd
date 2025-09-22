import { useRouter } from 'next/router';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove local storage
    localStorage.removeItem('user');
    router.push('/login');
    //dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
