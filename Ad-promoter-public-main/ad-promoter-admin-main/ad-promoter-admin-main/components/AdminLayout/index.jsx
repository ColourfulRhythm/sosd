import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import UseFetch from '@/hooks/useFetch';
import { useState, useEffect } from 'react';

const AdminLayout = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const [token, setToken] = useState(true);
  const [tokenAvailale, setTokenAvailable] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
    }
  }, []);

  // User Data
  const {
    data: userData,
    pending: userPending,
    error: userError,
  } = UseFetch(token, tokenAvailale, 'https://api.ad-promoter.com/api/v1/user');

  const user = userData && userData;

  const onOpenMenuHandler = () =>
  {
    setMenuIsOpen(!menuIsOpen)
  }


    return (
      <>
        <AdminNavbar onOpenMenu={onOpenMenuHandler} isMenuOpen={menuIsOpen} user={user}/>
        {menuIsOpen && <AdminSidebar onOpenMenu={onOpenMenuHandler} user={user}/>}
        {children}
      </>
    );
  };
  
  export default AdminLayout;
  