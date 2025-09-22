import { useEffect, useState } from 'react';
import Image from 'next/image';
import Settings from '@/components/settings/Settings';
import profil from '@/public/assets/Profil.svg';
import wave from '@/public/assets/wave-hands.svg';
import privacy from '@/public/assets/lock-circle.svg';
import notification from '@/public/assets/notification.svg';
import security from '@/public/assets/security-user.svg';
import profile from '@/public/assets/user-tag-icon.svg';
import general from '@/public/assets/general-icon.svg';
import payment from '@/public/assets/cards.svg';
import logoutArrow from '@/public/assets/logout.svg';
import arrow from '@/public/assets/arrow-right.svg';
import { Danger, MobileSettings } from '@/components/settings/settings.style';
import Profile from '@/components/MobileSettings/Profile';
import General from '@/components/MobileSettings/General';
import Notification from '@/components/MobileSettings/Notification';
import Security from '@/components/MobileSettings/Security';
import Payment from '@/components/MobileSettings/Payment';
import Privacy from '@/components/MobileSettings/Privacy';
import { BackdropContainer } from '@/components/DiscoveryFolder/ReportModal/ModalStyle';
import DefaultPic from '@/public/assets/squared-profile.png'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { VscClose } from 'react-icons/vsc';
import { useLogout } from '@/hooks/useLogout';
import { useRouter } from 'next/router';

const PromoterSettings = () => {
  const [selected, setSelected] = useState('Settings');
  const [showlogout, setShowlogout] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileModal, setProfileModal] = useState(false);
  const [imageUploaderError, setImageUploaderError] = useState("");
  const { logout } = useLogout();
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-detail'));
    setUserName(user?.accountName);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-detail'));
    if(!user?.profilePicture || user?.profilePicture === ''){
      setProfileImage('')
    }else{
      setProfileImage(user.profilePicture);
    }
  }, []);

  useEffect(()=>{
    if(selected === 'Privacy Policy'){
      const newTab = window.open('', '_blank');
      newTab.location = 'https://www.ad-promoter.com/privacy-policy';
      setSelected('Settings')
    }
  },[selected])

  const handleFileInput = async (e) => {
    const files = e.target.files;
    const result = await uploadImage(files);

    if(result === "erorr code 500") {
      setImageUploaderError("Something went wrong while trying to upload image");
    }

    setImage(result[0])

    setIsChangesMade(true);

    setProfileModal(false);
  };

  const settingsTabs = [
    {
      icon: profile,
      name: 'Profile',
    },
    {
      icon: general,
      name: 'General',
    },
    {
      icon: notification,
      name: 'Notification',
    },
    {
      icon: security,
      name: 'Security',
    },
    {
      icon: payment,
      name: 'Payment',
    },
    {
      icon: privacy,
      name: 'Privacy Policy',
    },
  ];
  return (
    <>
      <div style={{ position: 'relative' }} className="dummy">
        <Settings />
      </div>
      <MobileSettings>
        {selected == 'General' ? (
          <General handleBack={() => setSelected('Settings')} />
        ) : selected == 'Notification' ? (
          <Notification handleBack={() => setSelected('Settings')} />
        ) : selected == 'Security' ? (
          <Security handleBack={() => setSelected('Settings')} />
        ) : selected == 'Profile' ? (
          <Profile handleBack={() => setSelected('Settings')} />
        ) : selected == 'Privacy Policy' ? (
          <></>
        ) : selected == 'Notification' ? (
          <Notification handleBack={() => setSelected('Settings')}  />
        ) : selected == 'Security' ? (
          <Security handleBack={() => setSelected('Settings')} />
        ) : selected == 'Profile' ? (
          <Profile handleBack={() => setSelected('Settings')} />
        ) : (
          ''
        )}
        {selected == 'Settings' && (
          <>
            <div className="user-profile">
              <div style={{ width: '52px', height: '52px' }}>
                {profileImage === '' ? (
                  <Image
                    src={DefaultPic}
                    onClick={() => setProfileModal(true)}
                    alt="profile picture"
                    width={'100%'}
                    height={'100%'}
                    style={{objectFit: 'fill', borderRadius: '100px',cursor:'pointer' }}
                  />
                ):(
                  <Image
                    src={profileImage}
                    onClick={() => setProfileModal(true)}
                    alt="profile picture"
                    width={'100%'}
                    height={'100%'}
                    style={{objectFit: 'fill', borderRadius: '100px',cursor:'pointer' }}
                  />
                )}
              </div>

              <h2>Hi, {userName}</h2>
              <div className="welcome">
                <Image src={wave} alt="wave" />
                <p>Welcome back!</p>
              </div>
            </div>
            <div className="column">
              {settingsTabs.map((item, index) => (
                <div
                  key={index}
                  className="row"
                  onClick={() => setSelected(item.name)}
                >
                  <div className="name-column">
                    <Image src={item.icon} alt="profile" />
                    <p>{item.name}</p>
                  </div>
                  <Image src={arrow} alt="arrow" />
                </div>
              ))}
              <div className="logout" onClick={() => setShowlogout(true)}>
                <Image src={logoutArrow} alt="logout" />
                <p>Log out</p>
              </div>
            </div>
            {showlogout && (
              <BackdropContainer
                onClick={() => setShowlogout(false)}
              ></BackdropContainer>
            )}
            {showlogout && (
              <div
                className="logout-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="logout-icon">
                  <Image src={logoutArrow} alt="logout" />
                </div>
                <h3>Are you sure you want to logout?</h3>
                <p>
                  This is not a reversible action and you might need to log back
                  in to gain acces to your account
                </p>
                <div className="button">
                  <div className="cancel" onClick={() => setShowlogout(false)}>
                    Cancel
                  </div>
                  <button onClick={() => {logout(), router.push('/')}} className="proceed">Logout</button>
                </div>
              </div>
            )}
          </>
        )}
      </MobileSettings>
    </>
  );
};

export default PromoterSettings;
