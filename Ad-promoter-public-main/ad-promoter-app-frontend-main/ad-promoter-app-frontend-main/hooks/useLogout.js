import { useAuthContext } from './useAuth';

export const useLogout = () => {
  const logout = () => {
    //remove local storage
    localStorage.removeItem('user-detail');
    localStorage.removeItem('user-token');

    //dispatch logout action
  };

  return { logout };
};
