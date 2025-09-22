import { useEffect, useState } from 'react';
import {
  StyledSettings,
  StyledSettingsMobile,
  Plain,
  Danger,
  Container,
} from './settings.style';
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
import { BsChevronRight } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { adminSettingCategories } from './settingsCategories';
import { useLogout } from '@/hooks/useLogout';
import { useWidth } from '@/hooks';
import Image from 'next/image';
import { exitSettings } from '@/public/assets/icon';

const breakpoint = 1024;
const Settings = (props) => {
  const { responsive } = useWidth(breakpoint);
  const router = useRouter();
  const [selected, setSelected] = useState();
  const [logoutModal, setLogoutModal] = useState(false);
  const { logout } = useLogout();
  const displayLogoutModal = () => {
    setLogoutModal(true);
  };

  useEffect(() => {
    if (responsive) {
      setSelected('Profile');
    } else {
      setSelected('');
    }
  }, [responsive]);

  const onRemoveSelectHandler = () => {
    setSelected('');
  };


  return (
    <>
      {responsive ? (
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
                          fontSize:
                            selected == category.category ? '1.5rem' : '',
                          fontWeight:
                            selected == category.category ? '500' : '400',
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
                          fontSize:
                            selected == category.category ? '1.5rem' : '',
                          fontWeight:
                            selected == category.category ? '500' : '400',
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
                  <Notification />
                ) : selected == 'Secuirity' ? (
                  <Secuirity />
                ) : selected == 'Payment' ? (
                  <Payment />
                ) : selected == 'Profile' ? (
                  <Profile userData={props.userData} />
                ) : selected == 'Privacy policy' ? (
                  <Policy />
                ) : selected == 'Administrator' ? (
                  <Administrator token={props.token}/>
                ) : (
                  ''
                )}
              </div>
              <div
                className="logout"
                style={{ display: logoutModal && 'none' }}
                onClick={displayLogoutModal}
              >
                <TbLogout
                  style={{ height: '27px', width: '27px', color: 'red' }}
                />
                <p> Log Out </p>
              </div>
            </main>
            {logoutModal && (
              <div className="blurred" onClick={() => setLogoutModal(false)} />
            )}

            {logoutModal && (
              <div className="modal">
                <div
                  className="close-modal"
                  onClick={() => setLogoutModal(false)}
                >
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
                    This is not a reversible action and you might need to log
                    back in to gain access to your account{' '}
                  </span>

                  <div className="btn-controls">
                    <Plain onClick={() => setLogoutModal(false)}>
                      {' '}
                      Cancel{' '}
                    </Plain>
                    <Danger onClick={logout}> Logout </Danger>
                  </div>
                </div>
              </div>
            )}
          </StyledSettings>
        </Container>
      ) : (
        <Container>
          <StyledSettingsMobile>
            <main>
              <div className="image-wrapper">
                {props.userData && props.userData.profilePicture == 'string' ? (
                  <div
                    className="noImage"
                    onClick={() => setProfileModal(true)}
                    style={{
                      width: '134px',
                      height: '134px',
                      textAlign: 'center',
                      background: 'green',
                      fontSize: '50px',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      borderRadius: '50%',
                    }}
                  >
                    {props.userData.accountName.slice(0, 2)}
                  </div>
                ) : (
                  <Image
                    src={props.userData?.profilePicture}
                    alt="profile"
                    height={105}
                    width={105}
                    onClick={() => setProfileModal(true)}
                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="intro-text">
                <p className="account-name">Hi, {props.userData.accountName}</p>
                <p className="welcome-text">👋 &nbsp;Welcome back!</p>
              </div>

              <ul className="categories">
                {props.admin
                  ? adminSettingCategories.map((category) => (
                      <li
                        key={category.id}
                        onClick={() => setSelected(category.category)}
                      >
                        <span className="label-group">
                          <Image src={category.icon} alt="icon" />
                          <span>{category.category}</span>
                        </span>
                        <span>
                          <BsChevronRight />
                        </span>
                      </li>
                    ))
                  : categories.map((category) => (
                      <li
                        key={category.id}
                        onClick={() => setSelected(category.category)}
                      >
                        <span className="label-group">
                          <Image src={category.icon} alt="icon" />
                          <span>{category.category}</span>
                        </span>
                        <span>
                          <BsChevronRight />
                        </span>
                      </li>
                    ))}
                <li onClick={displayLogoutModal}>
                  <span className="label-group">
                    <Image src={exitSettings} alt="icon" />
                    <span>Log out</span>
                  </span>
                </li>
              </ul>

              <div className="contents">
                {selected == 'General' ? (
                  <General onRemoveSelect={onRemoveSelectHandler}/>
                ) : selected == 'Notification' ? (
                  <Notification />
                ) : selected == 'Security' ? (
                  <Secuirity onRemoveSelect={onRemoveSelectHandler}/>
                ) : selected == 'Payment' ? (
                  <Payment />
                ) : selected == 'Profile' ? (
                  <Profile
                    userData={props.userData}
                    onRemoveSelect={onRemoveSelectHandler}
                  />
                ) : selected == 'Privacy policy' ? (
                  <Policy />
                ) : selected == 'Administrator' ? (
                  <Administrator onRemoveSelect={onRemoveSelectHandler}/>
                ) : (
                  ''
                )}
              </div>
            </main>
            {logoutModal && (
              <div className="blurred" onClick={() => setLogoutModal(false)} />
            )}

            {logoutModal && (
              <div className="modal">
                <div
                  className="close-modal"
                  onClick={() => setLogoutModal(false)}
                >
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
                    This is not a reversible action and you might need to log
                    back in to gain access to your account{' '}
                  </span>

                  <div className="btn-controls">
                    <Plain onClick={() => setLogoutModal(false)}>
                      {' '}
                      Cancel{' '}
                    </Plain>
                    <Danger onClick={logout}> Logout </Danger>
                  </div>
                </div>
              </div>
            )}
          </StyledSettingsMobile>
        </Container>
      )}{' '}
    </>
  );
};

export default Settings;
