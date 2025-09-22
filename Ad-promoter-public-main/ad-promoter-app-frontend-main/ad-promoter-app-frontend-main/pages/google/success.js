import { Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from '../api/axios';

const Success = () => {
  const router = useRouter();
  const { accessToken } = router.query;
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        const result = await axios.get(`/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        localStorage.setItem('user-token', JSON.stringify(accessToken));
        localStorage.setItem('user-detail', JSON.stringify(result.data.data));
        if (result.data.data.role === 'placer') {
          router.push('/placers');
        } else if (result.data.data.role === 'promoter') {
          router.push('/promoters');
        } else {
          router.push('/signup/preference');
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };

    fetchGoogleUser();
  }, [accessToken, router]);

  if (error) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        Unable to fetch user data | Please try again
      </h3>
    );
  }

  return (
    <div className="w-screen h-screen">
      <h3>Redirecting</h3>
      <Spinner />
    </div>
  );
};

export default Success;
