import axios from '@/pages/api/axios';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRef } from 'react';

const useVisualSubmit = ({ setInputValue }) => {
  const toast = useToast();
  const token = useRef('');

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    if (userToken) {
      token.current = userToken;
    }
  }, []);

  const handleVisualSubmit = async (id, link) => {
    const data = {
      adID: id,
      link: link,
    };

    try {
      const response = await axios.post('/api/v1/promotion/visual', data, {
        headers: {
          Authorization: `Bearer ${token.current}`,
          'Content-Type': 'application/json',
        },
      });

      const json = response.data;

      if (!response.status === 201) {
        setInputValue('');
        toast({
          title: 'Link Submitted',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      }
    } catch (error) {
      console.error('Error submitting visual link:', error);
      setInputValue('');

      if (error.response?.status === 403) {
        toast({
          title: "You're not allowed to promote the same advert twice",
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      } else {
        toast({
          title: 'Error submitting visual link',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      }
    }
  };
  return { handleVisualSubmit };
};

export default useVisualSubmit;
