import { useEffect, useState } from 'react';

export const useSendOtp = () => {
  const [otpError, setOtpError] = useState(null);
  const [otpMsg, setOtpMsg] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const [refId, setRefId] = useState('');

  const sendOtp = async (phoneNumber) => {
    setIsLoading(true);

    const response = await fetch('http://api.ad-promoter.com/api/v1/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setOtpError(json.success);
      setOtpMsg(json.msg);
      console.log(json);
      console.log(otpError);
      console.log(otpMsg);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log(json);
      localStorage.setItem('OTP_INFO', JSON.stringify(json));
    }
  };
  return { sendOtp, isLoading, otpMsg, otpError };
};
