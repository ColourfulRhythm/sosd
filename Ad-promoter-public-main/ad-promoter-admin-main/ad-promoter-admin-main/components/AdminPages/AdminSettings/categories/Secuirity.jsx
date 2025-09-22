import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Button,
  StyledSecurity,
  StyledSecurityMobile,
} from '../settings.style';
import { useWidth } from '@/hooks';
import { BsArrowLeftCircle } from 'react-icons/bs';

const breakpoint = 1024;
const Secuirity = ({ onRemoveSelect }) => {
  const { responsive } = useWidth(breakpoint);
  const [value, setValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [isChangesMade, setIsChangesMade] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [token, setToken] = useState(true);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    if (userToken) {
      setToken(userToken.token);
    }
  }, []);
  const apiPassword = 'password';
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (confirmValue !== newValue) {
      setIsChangesMade(true);
      return setInputError(true);
    } else if (value === apiPassword && confirmValue === newValue) {
      setIsChangesMade(true);
      setInputError(false);
      try {
        const requestBody = {
          previousPasssword: value,
          newPassword: newValue,
          confirmNewPassword: confirmValue,
        };
        const response = await fetch(
          'https://ad-5ez7.onrender.com/api/v1/user/change-password',
          {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          }
        );
        const editUpdateRes = await response.json();
        console.log(editUpdateRes);
        alert('Success');
      } catch (error) {
        console.error(error);
        return alert(error.msg);
      }
      setIsChangesMade(false);
      setInputError(false);
    }
  };

  return (
    <>
      {responsive ? (
        <StyledSecurity>
          <div className="info">
            <p> Password </p>
            <span>
              {' '}
              In order to better protect your account, make sure you set up a
              strong and secure password.{' '}
            </span>
          </div>

          <form>
            <div className="pwd current-pwd">
              <label htmlFor="current-pwd"> Current Password </label>
              <input
                type="password"
                name="password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value), setIsChangesMade(true);
                }}
                required
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
            {inputError ? 'Password Does not Match' : null}
          </form>

          <div className="controls">
            <Button
              onClick={handleSaveChanges}
              className={isChangesMade ? '' : 'inactive'}
            >
              Save changes
            </Button>
          </div>
        </StyledSecurity>
      ) : (
        <StyledSecurityMobile>
          <div className="tab-head">
            <BsArrowLeftCircle className="left-back" onClick={onRemoveSelect} />
            <span> </span>
            <h4>Security </h4>
            <span> </span>
          </div>

          <div className="info">
            <p> Password </p>
            <span>
              {' '}
              In order to better protect your account, make sure you set up a
              strong and secure password.{' '}
            </span>
          </div>

          <form>
            <div className="pwd current-pwd">
              <label htmlFor="current-pwd"> Current Password </label>
              <input
                type="password"
                name="password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value), setIsChangesMade(true);
                }}
                required
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
            {inputError ? 'Password Does not Match' : null}
          </form>

          <div className="controls">
            <button 
              onClick={handleSaveChanges}
              className={`button ${isChangesMade ? '' : 'inactive'}`}
            >
              Save changes
            </button>
          </div>
        </StyledSecurityMobile>
      )}{' '}
    </>
  );
};

export default Secuirity;
