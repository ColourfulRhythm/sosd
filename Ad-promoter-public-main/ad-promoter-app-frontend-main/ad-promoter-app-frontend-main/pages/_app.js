import { GlobalStyle } from '@/styles/global';
import { SanitizeStyle } from '@/styles/sanitize';
import { VariableStyle } from '@/styles/variables';
import { AdPlacerProvider } from '@/context/adPlacerContext';
import { SignupProvider } from '@/context/signupContext';
import { NotificationProvider } from '@/context/notificationContext';
import { AuthContextProvider } from '@/context/authContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SingleAdProvider } from '@/context/singleAdContext';
import { JobsProvider } from '@/context/jobsContext';
import Layout from '@/components/Layout';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        lineHeight: 1.5,
        fontSize: '1.8rem',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '400',
        overflowX: 'hidden',
        background: '#FAFAFA',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <SignupProvider>
        <SingleAdProvider>
          <AdPlacerProvider>
            <JobsProvider>
              <NotificationProvider>
                <VariableStyle />
                <GlobalStyle />
                <SanitizeStyle />
                <ChakraProvider theme={theme}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ChakraProvider>
              </NotificationProvider>
            </JobsProvider>
          </AdPlacerProvider>
        </SingleAdProvider>
      </SignupProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
