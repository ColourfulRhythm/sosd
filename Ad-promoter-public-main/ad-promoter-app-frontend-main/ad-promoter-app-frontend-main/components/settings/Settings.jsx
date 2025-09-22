import { useState } from 'react';
import { StyledSettings, Plain, Danger, Container } from './settings.style';
import { categories } from './settingsCategories';
import {
  General,
  Notification,
  Secuirity,
  Payment,
  Profile,
  Policy,
  Administrator,
} from './categories';
import { TbLogout } from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import Navbar from '@/components/PromoterNavbar/index';
import { adminSettingCategories } from './settingsCategories';
import AdminNavbar from '@/components/AdminNavbar/index';
import { useLogout } from '@/hooks/useLogout';
import { useEffect } from 'react';
import Link from 'next/link';
import { Spinner } from '@chakra-ui/react';

const Settings = (props) => {
  const router = useRouter();
  const [selected, setSelected] = useState('General');
  const [logoutModal, setLogoutModal] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userToken, setUserToken] = useState();
  const { logout } = useLogout();
  const displayLogoutModal = () => {
    setLogoutModal(true);
  };

  useEffect(() => {
    const userDetails = JSON.parse(window.localStorage.getItem('user-detail'));
    setUserDetails(userDetails);
    const userToken = JSON.parse(window.localStorage.getItem('user-token'));
    setUserToken(userToken);
  }, []);

  useEffect(()=>{
    if(selected === 'Privacy policy'){
      const newTab = window.open('', '_blank');
      newTab.location = 'https://www.ad-promoter.com/privacy-policy';
      setSelected('General')
    }
  },[router, selected])

  return (
    <Container>
      <StyledSettings>
        <main>
          <ul className="categories">
            {props.admin
              ? adminSettingCategories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => setSelected(category.category)}
                    style={{
                      color:
                        selected == category.category
                          ? 'var(--black)'
                          : '#9e82bd',
                      fontSize: selected == category.category ? '1.5rem' : '',
                      fontWeight: selected == category.category ? '500' : '400',
                      borderBottom:
                        category.category == selected
                          ? '2.5px solid var(--primary)'
                          : '',
                    }}
                  >
                    {category.category}
                  </li>
                ))
              : categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => setSelected(category.category)}
                    style={{
                      color:
                        selected == category.category
                          ? 'var(--black)'
                          : '#9e82bd',
                      fontSize: selected == category.category ? '1.5rem' : '',
                      fontWeight: selected == category.category ? '500' : '400',
                      borderBottom:
                        category.category == selected
                          ? '2.5px solid var(--primary)'
                          : '',
                    }}
                  >
                    {category.category}
                  </li>
                ))}
          </ul>

          <div className="contents">
            {selected == 'General' ? (
              <General />
            ) : selected == 'Notification' ? (
              <Notification userDetails={userDetails} token={userToken} />
            ) : selected == 'Secuirity' ? (
              <Secuirity />
            ) : selected == 'Payment' ? (
              <Payment />
            ) : selected == 'Profile' ? (
              <Profile />
            ) : selected == 'Privacy policy' ? (
              <Spinner />
            ) : selected == 'Administrator' ? (
              <Administrator />
            ) : (
              ''
            )}
          </div>
          <div
            className="logout"
            style={{ display: logoutModal && 'none' }}
            onClick={displayLogoutModal}
          >
            <TbLogout style={{ height: '27px', width: '27px', color: 'red' }} />
            <p> Log Out </p>
          </div>
        </main>
        {logoutModal && (
          <div className="blurred" onClick={() => setLogoutModal(false)} />
        )}

        {logoutModal && (
          <div className="modal">
            <div className="close-modal" onClick={() => setLogoutModal(false)}>
              <VscClose
                style={{
                  height: '19px',
                  width: '19px',
                  color: 'var(--dark-gray)',
                }}
              />
            </div>

            <div className="contents">
              <TbLogout
                style={{ height: '27px', width: '27px', color: 'red' }}
              />
              <p> Are you sure you want to logout? </p>
              <span>
                {' '}
                This is not a reversible action and you might need to log back
                in to gain access to your account{' '}
              </span>

              <div className="btn-controls">
                <Plain onClick={() => setLogoutModal(false)}> Cancel </Plain>
                <Danger
                  onClick={() => {
                    logout(), router.push('/');
                  }}
                >
                  {' '}
                  Logout{' '}
                </Danger>
              </div>
            </div>
          </div>
        )}
      </StyledSettings>
    </Container>
  );
};

export default Settings;
