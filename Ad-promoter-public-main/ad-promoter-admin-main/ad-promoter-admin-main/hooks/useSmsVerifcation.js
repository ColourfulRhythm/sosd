import { useState } from 'react';

export const useVerification = () => {
  const [verifyError, setVerifyError] = useState(null);
  const [verifyMsg, setVerifyMsg] = useState(null);
  const [isVerifyLoading, setIsVerifyLoading] = useState(null);

  const sendVerification = async (refId, otp, phoneNumber) => {
    setIsVerifyLoading(true);
    setVerifyError(null);
    // console.log(user.data.accessToken);

    const response = await fetch(
      'http://35.153.52.116/api/v1/auth/verify-OTP-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference_id: refId,
          otp,
          phoneNumber,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      console.log('code not sent');
    }
    if (response.ok) {
      console.log(json);
      console.log('code sent');
    }
  };
  return { sendVerification, isVerifyLoading, verifyError, verifyMsg };
};
