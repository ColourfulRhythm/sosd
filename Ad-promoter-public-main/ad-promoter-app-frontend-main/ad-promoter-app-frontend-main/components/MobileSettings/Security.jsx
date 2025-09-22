import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import back from '@/public/assets/back-icon.svg';
import { SecurityContainer } from './mobileSettings.style';
import { useToast } from '@chakra-ui/react';
import { Button } from '../settings/settings.style';
import axios from '@/pages/api/axios';

const Security = ({ handleBack }) => {
  const [value, setValue] = useState('alanByte003');
  const [newValue, setNewValue] = useState('');
  const [email, setEmail] = useState('Email to send verification link');
  const [recovery, setRecovery] = useState('Email to send verification link');
  const [confirmValue, setConfirmValue] = useState('');
  const [isChangesMade, setIsChangesMade] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [userToken, setUserToken] = useState();

  const toast = useToast();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user-token'));
    setUserToken(token);
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (confirmValue !== newValue) {
      setIsChangesMade(true);
      setInputError(true);
    } else {
      setIsChangesMade(false);
      setInputError(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
  
    const passwordDetails = {
      previousPasssword: value,
      newPassword: newValue,
      confirmNewPassword: confirmValue,
    };
  
    try {
      const response = await axios.post('/api/v1/user/change-password', passwordDetails, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
  
      if (response.status === 500) {
        throw new Error('Could not update password, please try again');
      }
  
      if (response.status === 201) {
        const data = response.data;
        toast({
          title: 'Password Updated',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `${'Something went wrong'}`,
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  return (
    <SecurityContainer>
      <div className="security">
        <div onClick={handleBack}>
          <Image src={back} alt="back" />
        </div>
        <h3>Security</h3>
      </div>
      <div className="info">
        <p> Password </p>
        <span>
          {' '}
          In order to better protect your account, make sure you set up a strong
          and secure password.{' '}
        </span>
      </div>

      <form onSubmit={updatePassword}>
        <div className="pwd current-pwd">
          <label htmlFor="current-pwd"> Current Password </label>
          <input
            type="password"
            name="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value), setIsChangesMade(true);
            }}
            readOnly
          />
        </div>
        <div className="pwd new-pwd">
          <label htmlFor="current-pwd"> New Password </label>
          <input
            type="password"
            name="password"
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value), setIsChangesMade(true);
            }}
            required
          />
        </div>
        <div className="pwd confirm-pwd">
          <label htmlFor="current-pwd"> Confirm Password </label>
          <input
            className={inputError ? 'input-error' : ''}
            type="password"
            name="password"
            value={confirmValue}
            onChange={(e) => {
              setConfirmValue(e.target.value), setIsChangesMade(true);
            }}
            required
          />
        </div>
        
        <div className='submit'>
          <button
            type="submit"
            className={isChangesMade ? 'inactive' : 'controls'}
          >
            Save Changes
          </button>
        </div>
      </form>
    </SecurityContainer>
  );
};

export default Security;
