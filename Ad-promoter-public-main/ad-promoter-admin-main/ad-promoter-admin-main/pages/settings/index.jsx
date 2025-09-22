import { useState, useEffect } from 'react';
import Settings from '@/components/AdminPages/AdminSettings/Settings';
import UseFetch from '@/hooks/useFetch';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx';
import Head from 'next/head';


const AdminSettings = () => {
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
    pending,
    error,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/user/'
  );

  if (pending) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
          textAlign: 'center',
        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  if (!userData) {
    return <PageLoader />;
  }

  return (
    <>
      {' '}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ position: 'relative' }} className="dummy">
        <Settings token={token} admin={true} userData={userData} />
      </div>
    </>
  );
};

export default AdminSettings;
