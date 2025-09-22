import LandingPage from '@/components/LandingPage';
import axios from '@/pages/api/axios';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCreateAds = () => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [redirect, setRedirect] = useState('');
  const [data, setData] = useState();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const createAd = async (
    productName,
    redirectUrl,
    productDescription,
    tags,
    advertType,
    cta,
    images,
    webAddress,
    amount,
    containAdultContent
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        '/api/v1/ads/create',
        {
          productName,
          redirectUrl,
          description: productDescription,
          tags,
          type: advertType,
          CTAButtonDesign: cta,
          images,
          promotedLink: webAddress,
          budget: amount,
          isNfsw: containAdultContent,
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
        if (json.msg === 'type must be a valid enum value') {
          toast({
            title: 'Pick an advert type',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: json.msg,
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setData(json.data.ad);

        router.push(json.data.paymentDetails.url);
        localStorage.setItem('landingData', JSON.stringify(json.data.ad._id));
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      setIsLoading(false);
      if (error.response.status === 403) {
        toast({
          title: 'You cannot have more than 6 running ads per time',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      } else {
        toast({
          title: 'Error creating ad',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      }
    }
  };

  return { createAd, data, isLoading, error, msg, redirect, data };
};
