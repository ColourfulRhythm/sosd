import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isVerificationLoading, setIsVerificationLoading] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const signup = async (
    refId,
    otp,
    phoneNumber,
    accountName,
    linkValue,
    seeVisualAd,
    email,
    password,
    userPref
  ) => {
    setIsVerificationLoading(true);
    setError(null);
    console.log(userPref);

    const response = await fetch(
      'https://add-promoter-backend.onrender.com/api/v1/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference_id: refId,
          otp,
          phoneNumber,
          accountName,
          socialLink: linkValue,
          seeVisualAd,
          email,
          password,
          role: userPref,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsVerificationLoading(false);
      setError('Sign Up failed');
      toast({
        title: json.msg,
        status: 'error',
        duration: '5000',
        isClosable: true,
        position: 'bottom-left',
      });
    }
    if (response.ok) {
      //save user to local storage
      localStorage.setItem('user-token', JSON.stringify(json.token));
      localStorage.setItem('user-detail', JSON.stringify(json.user));

      //update the auth context
      setIsVerificationLoading(false);
      router.push('/signup/success');
    }
  };
  return { signup, isVerificationLoading, error };
};
