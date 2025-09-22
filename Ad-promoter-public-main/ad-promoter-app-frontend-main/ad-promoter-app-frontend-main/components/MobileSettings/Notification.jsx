import React, { useState } from 'react';
import Image from 'next/image';
import back from '@/public/assets/back-icon.svg';
import { NotifContainer } from './mobileSettings.style';
import { Spinner, useToast } from '@chakra-ui/react';
import { Button } from '../settings/settings.style';
import axios from '@/pages/api/axios';

const Notification = ({ handleBack }) => {
  const userDetails = JSON.parse(window.localStorage.getItem('user-detail'));
  const token = JSON.parse(window.localStorage.getItem('user-token'));

  const [browser, setBrowser] = useState(userDetails.browserNotification);
  const [email, setEmail] = useState(userDetails.emailNotification);
  const [desktop, setDesktop] = useState(userDetails.desktopNotification);
  const [others, setOthers] = useState(userDetails.NotifyOffers);
  const [isChangesMade, setIsChangesMade] = useState(false);
  const [isChangesUpdating, setIsChangesUpdating] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const notificationSettings = {
      browserNotification: browser,
      emailNotification: email,
      desktopNotification: desktop,
      NotifyOffers: others,
    };
  
    setIsChangesUpdating(true);
  
    try {
      const response = await axios.patch('/api/v1/user/', notificationSettings, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
  
      if (response.status === 500) {
        throw new Error('Could not update Notification settings, please try again');
      }
  
      if (response.status === 200) {
        const data = response.data;
        setIsChangesUpdating(false);
        toast({
          title: 'Notification Settings Updated',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
        window.localStorage.setItem('user-detail', JSON.stringify(data.data));
        window.location.reload();
      }
    } catch (error) {
      setIsChangesUpdating(false);
      toast({
        title: `${'Something went wrong'}`,
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top-left',
      });
    }
  
    setIsChangesMade(false);
  };

  return (
    <NotifContainer>
      <div className="notification">
        <div onClick={handleBack}>
          <Image src={back} alt="back" />
        </div>
        <h3>Notification</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <ul className="notifications-selection">
          <li>
            <div className="container">
              <input
                className="checkbox"
                id="checkbox"
                type="checkbox"
                onChange={() => {
                  setBrowser(!browser), setIsChangesMade(true);
                }}
                checked={browser}
              />

              <label htmlFor="checkbox">
                <i className="one"></i>
                <i className="two"></i>
                <div
                  className="ball"
                  style={{
                    backgroundColor: browser ? 'var(--light-blue)' : '#EDEDED',
                  }}
                />
              </label>
            </div>
            <span> Browser notification </span>
          </li>
          <div className="line"></div>

          <li key={2}>
            <div className="container">
              <input
                className="checkbox"
                id="checkbox-2"
                type="checkbox"
                onChange={() => {
                  setEmail(!email), setIsChangesMade(true);
                }}
                checked={email}
              />

              <label htmlFor="checkbox-2">
                <i className="one"></i>
                <i className="two"></i>
                <div
                  className="ball"
                  style={{
                    backgroundColor: email ? 'var(--light-blue)' : '#EDEDED',
                  }}
                />
              </label>
            </div>
            <span> Email notification </span>
          </li>
          <div className="line"></div>
          <li key={3}>
            <div className="container">
              <input
                className="checkbox"
                type="checkbox"
                id="checkbox-3"
                onChange={() => {
                  setDesktop(!desktop), setIsChangesMade(true);
                }}
                checked={desktop}
              />

              <label htmlFor="checkbox-3">
                <i className="one"></i>
                <i className="two"></i>
                <div
                  className="ball"
                  style={{
                    backgroundColor: desktop ? 'var(--light-blue)' : '#EDEDED',
                  }}
                />
              </label>
            </div>
            <span> Dektop notification </span>
          </li>
          <div className="line"></div>
          <li key={4}>
            <div className="container">
              <input
                className="checkbox"
                type="checkbox"
                id="checkbox-4"
                onChange={() => {
                  setOthers(!others), setIsChangesMade(true);
                }}
                checked={others}
              />

              <label htmlFor="checkbox-4">
                <i className="one"></i>
                <i className="two"></i>
                <div
                  className="ball"
                  style={{
                    backgroundColor: others ? 'var(--light-blue)' : '#EDEDED',
                  }}
                />
              </label>
            </div>
            <span> Notify me on all offers </span>
          </li>
        </ul>

        <div className="controls">
          <Button className={isChangesMade ? '' : 'inactive'}>
            {isChangesUpdating ? <Spinner /> : 'Save changes' }
          </Button>
        </div>
      </form>
    </NotifContainer>
  );
};

export default Notification;
