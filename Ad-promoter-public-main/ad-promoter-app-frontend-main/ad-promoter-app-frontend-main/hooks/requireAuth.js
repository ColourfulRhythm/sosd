import { useRouter } from 'next/router';
import useAuth from './useAuth';
import { useEffect } from 'react';

const RequireAuth = ({ children }) => {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth) {
      router.push('/login');
    } else {
      return children;
    }
  }, [auth, children, router]);
};

export default RequireAuth;
