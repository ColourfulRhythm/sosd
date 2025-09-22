import { createContext, useState } from 'react';

const SignupContext = createContext();

export function SignupProvider({ children }) {
  const [userPref, setUserPref] = useState('placer');
  const [isInputWithValue, setIsInputWithValue] = useState(false);
  const [isLoginInputWithValue, setIsLoginInputWithValue] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountName, setAccountName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [seeVisualAd, setSeeVisualAd] = useState(false);
  const [userVisualReq, setUserVisualReq] = useState('');
  const [linkValue, setLinkValue] = useState('');
  const [otp, setOtp] = useState('');
  const [refId, setRefId] = useState('');
  return (
    <SignupContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        accountName,
        setAccountName,
        phoneNumber,
        setPhoneNumber,
        userPref,
        setUserPref,
        userVisualReq,
        setUserVisualReq,
        linkValue,
        setLinkValue,
        isInputWithValue,
        setIsInputWithValue,
        isLoginInputWithValue,
        setIsLoginInputWithValue,
        otp,
        setOtp,
        refId,
        setRefId,
        seeVisualAd,
        setSeeVisualAd,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}
export default SignupContext;
