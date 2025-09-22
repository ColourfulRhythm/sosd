import axios from '@/pages/api/axios';
import { useState } from 'react';

export const useVerification = () => {
  const [verifyError, setVerifyError] = useState(null);
  const [verifyMsg, setVerifyMsg] = useState(null);
  const [isVerifyLoading, setIsVerifyLoading] = useState(null);

  const sendVerification = async (refId, otp, phoneNumber) => {
    setIsVerifyLoading(true);
    setVerifyError(null);

    try {
      const response = await axios.post('/api/v1/auth/verify-OTP-password', {
        reference_id: refId,
        otp,
        phoneNumber,
      });

      const json = response.data;

      console.log(json);
      console.log('Code not sent');
    } catch (error) {
      console.error('Error sending verification code:', error);
      // Handle errors here if needed.
    }
  };

  return { sendVerification, isVerifyLoading, verifyError, verifyMsg };
};
