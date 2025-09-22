import { GlobalStyle } from '@/styles/global';
import { VariableStyle } from '@/styles/variables';
import { NotificationProvider } from '@/context/notificationContext';
import AdminLayout from '@/components/AdminLayout';
import { AuthContextProvider } from '@/context/authContext';
import { SignupProvider } from '@/context/signupContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [token, setToken] = useState(true
      );
    useEffect(() => { 
      const userToken = JSON.parse(localStorage.getItem('user'));

      if (userToken) {
        setToken(userToken);
      }

      if (!userToken) {
        router.push('/login');
      }
    }, []);

    return !token ? null : <Component {...props} />;
  };
}

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  const ProtectedComponent = withAuth(Component);

  return (
    <div style={{backgroundColor : '#FAFAFA'}}>
      <Head>
        <title>AD - PROMOTER</title>
        <meta
          name="description"
          content="Explore The World Of Seamless Online Promotion"
        />
      </Head>

      <AuthContextProvider>
        <Toaster />
        <NotificationProvider>
          <SignupProvider>
            <VariableStyle />
            <GlobalStyle />
            {pathname.startsWith('/signup') || pathname.startsWith('/login') ? (
              <Component {...pageProps} />
            ) : (
              <AdminLayout>
                <ProtectedComponent {...pageProps} />
              </AdminLayout>
            )}
          </SignupProvider>
        </NotificationProvider>
      </AuthContextProvider>
    </div>
  );
}

export default MyApp;
