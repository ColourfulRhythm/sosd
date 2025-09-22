import Link from 'next/link';
import { StyledNavBar } from '@/components/AdminLayout/AdminNavbar/style';
import { links } from '../../../data/NavLinks/links';
import logo from '@/public/assets/newest-logo.png';
import notif from '@/public/assets/notif.svg';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import NotificationContext from '@/context/notificationContext';
import NotificationContainer from '@/components/AdminNotification/index';
import UseFetch from '@/hooks/useFetch';
import { Ad } from '@/public/assets/icon';

const AdminNavbar = (props) => {
  const router = useRouter();
  const { isNotifClicked, setIsNotifClicked } = useContext(NotificationContext);
  const variants = {
    animate: { width: '60px', transition: { duration: 0.5 } },
    stop: { width: 0 },
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
      <div className="menu-group">
        {props.isMenuOpen ? (
          <FiX className="menu" onClick={props.onOpenMenu} />
        ) : (
          <FiMenu className="menu" onClick={props.onOpenMenu} />
        )}
        <span className="menu-image">
          <Image
            src={Ad}
            alt="ad-promoter"
            style={{ borderRadius: '0.5rem' }}
          />
        </span>
      </div>

      <div className="links">
        {links.map(({ name, link }) => {
          if (props.user && props.user.role === 'sub admin' && name === 'wallet') {
            return;
          }

          return (
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
          );
        })}
      </div>

      <div className="profile">
        <div
          className="notif"
          onClick={() => setIsNotifClicked(!isNotifClicked)}
        >
          <div className="notif-img">
            <Image src={notif} alt="notification bell" />
          </div>
          {isNotifClicked && <NotificationContainer />}
        </div>
        {props.user && props.user.profilePicture == undefined ? (
          <div
            className="noImage"
            style={{
              width: '35px',
              height: '35px',
              textAlign: 'center',
              background: '#a09ef9',
              fontSize: '16px',
              textTransform: 'uppercase',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
            }}
          >
            {props.user.accountName.slice(0, 2)}
          </div>
        ) : (
          <Image
            src={props.user?.profilePicture}
            alt="profile"
            width={50}
            height={50}
          />
        )}
      </div>
    </StyledNavBar>
  );
};

export default AdminNavbar;
