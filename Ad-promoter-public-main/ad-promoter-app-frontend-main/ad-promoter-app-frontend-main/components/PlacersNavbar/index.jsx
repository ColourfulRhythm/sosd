/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { StyledNavBar } from '@/components/PromoterNavbar/style';
import { links } from './links';
import logo from '@/public/assets/newest-logo.png';
import notif from '@/public/assets/notif.svg';
import inactiveNotif from '@/public/assets/Inactive notification Icon.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContext, useRef } from 'react';
import NotificationContext from '@/context/notificationContext';
import NotificationContainer from '@/components/Notification/index';
import { useEffect } from 'react';
import { useState } from 'react';
import DefaultPic from '@/public/assets/squared-profile.png'
import { GlobalStyle } from '@/styles/global';
import axios from '@/pages/api/axios';
const Index = () => {
  const [profileImage, setProfileImage] = useState('');
  const [isLoading,setIsLoading] = useState(null)
  const token = useRef()
  const [notificationData,setNotificationData] = useState([])
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const router = useRouter();
  const { isNotifClicked, setIsNotifClicked } = useContext(NotificationContext);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user-token"));

    if (userToken) {
      token.current = userToken
    }
  },[]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-detail'));
    if(!user?.profilePicture || user?.profilePicture === ''){
      setProfileImage('')
    }else{
      setProfileImage(user.profilePicture);
    }
  }, []);

  useEffect(() => {
    // Fetch initial notifications on component mount
    fetchNotification();

    // Check for new notifications every 10 seconds
    const intervalId = setInterval(() => {
      checkNewNotifications();
    }, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const fetchNotification = async () => {
  try {
    setIsLoading(true);
    const result = await axios.get('/api/v1/notifications', {
      params: {
        page: 1,
        pageSize: 10,
      },
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
    });
    setNotificationData(result.data.data.data);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

const checkNewNotifications = async () => {
  try {
    const response = await axios.get('/api/v1/notifications', {
      params: {
        page: 1,
        pageSize: 10,
      },
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
    });
    const data = response.data;
    const hasNew = data.length > notificationData.length;
    setHasNewNotification(hasNew);
  } catch (error) {
    console.error('Error checking new notifications:', error);
  }
};

  const variants = {
    animate: { width: '60px', transition: { duration: 0.5 } },
    stop: { width: 0 },
  };

  const handleClick = () => {
    setIsNotifClicked(!isNotifClicked);
    if (isNotifClicked) {
      document.body.classList.remove('modal-open');
    } else {
      document.body.classList.add('modal-open');
    }
  };
  return (
    <StyledNavBar>
      <div className="logo">
        <Link href="/placers">
          <a>
            <Image src={logo} alt="ad-promoter" width={184} height={19} />
          </a>
        </Link>
      </div>

      <div className="links">
        {links.map(({ name, link }) => (
          <div className="link" key={link}>
            <Link href={link}>
              <a className={router.pathname === link ? 'activeLink' : ''}>
                {name}
              </a>
            </Link>
            <motion.div
              className={router.pathname === link ? 'bottom-dash' : ''}
              variants={variants}
              animate={router.pathname === link ? 'animate' : 'stop'}
            ></motion.div>
          </div>
        ))}
      </div>

      <div className="profile">
        <div className="notif" onClick={handleClick}>
          <div className="notif-img">
          {hasNewNotification ? (
            <Image src={notif} alt="notification bell" />
          ):(
            <Image src={inactiveNotif} alt="notification bell" />
          )}
          </div>
          {isNotifClicked && <NotificationContainer notificationData={notificationData} isLoading={isLoading} />}
        </div>
        <div style={{ width: '52px', height: '52px' }}>
          {profileImage === '' ? (
            <Image
              src={DefaultPic}
              alt="profile picture"
              width={'100%'}
              height={'100%'}
              style={{objectFit: 'fill', borderRadius: '100px' }}
            />
          ):(
            <Image
              src={profileImage}
              alt="profile picture"
              width={'100%'}
              height={'100%'}
              style={{objectFit: 'fill', borderRadius: '100px' }}
            />
          )}
        </div>
      </div>
    </StyledNavBar>
  );
};

export default Index;
