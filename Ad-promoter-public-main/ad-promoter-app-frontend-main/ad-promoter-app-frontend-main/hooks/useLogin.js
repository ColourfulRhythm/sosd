import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from './useAuth';
import axios from '@/pages/api/axios';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post('/api/v1/auth/signin', {
        email,
        password,
      });

      const json = response.data;

      if (!response.status === 200) {
        toast({
          title: json.msg,
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
        setIsLoading(false);
      }

      if (response.status === 200) {
        // Save user to local storage
        localStorage.setItem('user-token', JSON.stringify(json?.token));
        localStorage.setItem('user-detail', JSON.stringify(json?.user));

        // Update the auth context
        setAuth(json);

        setIsLoading(false);
        toast({
          title: 'Logged In Successfully',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });

        console.log(json)

        if (json.user.role === 'placer') {
          router.push('/placers');
        } else if (json.user.role === 'promoter') {
          router.push('/promoters');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
      if (error.response?.status === 401) {
        toast({
          title: 'Credentials Incorrect',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      } else {
        toast({
          title: error.message,
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      }
    }
  };

  return { login, isLoading };
};
