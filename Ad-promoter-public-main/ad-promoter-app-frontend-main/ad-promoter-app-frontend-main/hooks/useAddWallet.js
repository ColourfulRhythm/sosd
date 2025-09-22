import axios from '@/pages/api/axios';
import { useEffect, useRef, useState } from 'react';

export const useAddWallet = () => {
  const [isLoading, setIsLoading] = useState(null);
  const success = useRef();
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const createBank = async (bankCode, acctName, acctNumber, props) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        '/api/v1/wallet/create-recipient',
        {
          type: 'nuban',
          name: acctName,
          account_number: acctNumber,
          bank_code: bankCode,
          amount: 0,
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
        setIsLoading(false);
      } else {
        setIsLoading(false);
        if (json.success) {
          props.onClose();
          props.onOpen();
        }
      }
    } catch (error) {
      console.error('Error creating bank details:', error);
      setIsLoading(false);
      toast({
        title: 'Error creating bank details',
        status: 'error',
        duration: '5000',
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return { createBank, isLoading, success };
};
