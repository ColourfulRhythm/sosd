import axios from '@/pages/api/axios';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export const AddUserPref = () => {
  const [token, setToken] = useState('');
  const [isPrefLoading, setIsPrefLoading] = useState('');
  const toast = useToast();
  const success = useRef();
  const router = useRouter();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const addUserPref = async (userPref, seeVisualAd, linkValue, socialLink) => {
    setIsPrefLoading(true);

    try {
      const response = await axios.patch(
        '/api/v1/user',
        {
          role: userPref,
          seeVisualAd,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = response.data;

      if (!response.status === 200) {
        success.current = false;
        setIsPrefLoading(false);
        toast({
          title: json.msg,
          status: 'warning',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      } else {
        setIsPrefLoading(false);
        localStorage.setItem('user-detail', JSON.stringify(json.data));
        if (json.data.role === 'placer') {
          router.push('/placers');
          toast({
            title: 'Logged In as a Placer Successfully',
            status: 'success',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
          });
        } else if (json.data.role === 'promoter') {
          router.push('/promoters');
          toast({
            title: 'Logged In as a Promoter Successfully',
            status: 'success',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
          });
        }
      }
    } catch (error) {
      console.error('Error updating user preferences:', error);
      toast({
        title: 'Error updating user preferences',
        status: 'error',
        duration: '5000',
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return { addUserPref, isPrefLoading, success };
};
