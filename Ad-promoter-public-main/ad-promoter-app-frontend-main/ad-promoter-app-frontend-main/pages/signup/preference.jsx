import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Spinner } from '@chakra-ui/react';
import bg from '@/public/assets/bg.png';
import Close from '@/public/assets/close-icon';
import logo from '@/public/assets/newOnboardLogo.svg';
import Button from '@/components/authBtn/index';
import SignupContext from '@/context/signupContext';
import { useSendOtp } from '@/hooks/useSendOtp';
import { AddUserPref } from '@/hooks/addUserPref';
import { BgContainer } from '@/components/onboardingBg/styles';
import { MobilePref, Overlay } from '@/styles/signupPreference';

const Preference = () => {
  const { userPref, setUserPref, setIsInputWithValue, seeVisualAd, linkValue, phoneNumber } = useContext(SignupContext);
  const { sendOtp, isLoading } = useSendOtp();
  const [preference, setPreference] = useState(null);
  const [user, setUser] = useState(false);
  const { addUserPref, isPrefLoading } = AddUserPref();
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-detail"));
    setUser(user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userPref);
    if (!user) {
      if (userPref === 'promoter') {
        router.push("/signup/visualReq");
      } else {
        sendOtp(phoneNumber);
      }
    } else {
      if (user.role) {
        if (userPref === 'promoter') {
          router.push("/signup/visualReq");
        } else {
          sendOtp(phoneNumber);
        }
      } else {
        if (userPref === 'promoter') {
          router.push("/signup/visualReq");
        } else {
          addUserPref(userPref, seeVisualAd, linkValue);
        }
      }
    }
  }

  useEffect(() => {
    const prefetchRoute = async () => {
      await router.prefetch('/signup/visualReq');
    };
    prefetchRoute();
    setIsInputWithValue(false);
  }, [router, setIsInputWithValue]);

  const togglePreference = (selectedPreference) => {
    setPreference(selectedPreference);
  }
  
  const selectPreference = (event, prefType) => {
    setUserPref(event.target.value);
    console.log(event.target.value);
    setIsInputWithValue(true);
  
    if (prefType === 'placeAds') {
      togglePreference('placeAds');
    } else if (prefType === 'promoteAds') {
      togglePreference('promoteAds');
    }
  }
  

  return (
    <>
      <BgContainer image={bg}>
        <Overlay className="overlay">
          <div className="close" onClick={() => router.push('/')}>
            <Close />
          </div>
          <div className="content">
            <div className="welcome">
              <Image src={logo} alt='ad-promoter logo' />
              <div className="welcome-text">
                <h3>What do you want to use Ad-promoter for?</h3>
              </div>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="placers" onClick={(event) => selectPreference(event, 'placeAds')}>
                <input
                  type="radio"
                  id="place"
                  value='placer'
                  name='pref'
                  // checked={preference}
                />
                <label htmlFor="place">Place ads</label>
              </div>
              <div className="promoters" onClick={(event) => selectPreference(event, 'promoteAds')}>
                <input
                  type="radio"
                  id="promote"
                  value='promoter'
                  name='pref'
                  // checked={preference}
                />
                <label htmlFor='promote'>Promote ads</label>
              </div>
              {isLoading || isPrefLoading ? <Button text={<Spinner />} /> : <Button text='Next' />}
            </form>
          </div>
        </Overlay>
      </BgContainer>
      <MobilePref>
        <div className='logo'>
          <Image src={logo} alt='ad-promoter logo' />
        </div>
        <h3>What do you want to use Ad-promoter for?</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="placers" onClick={(event) => selectPreference(event, 'placeAds')}>
            <input
              type="radio"
              id="place"
              value='placer'
              name='pref'
              checked={preference}
            />
            <label htmlFor="place">Place ads</label>
          </div>
          <div className="promoters" onClick={(event) => selectPreference(event, 'promoteAds')}>
            <input
              type="radio"
              id="promote"
              value='promoter'
              name='pref'
              checked={preference}
            />
            <label htmlFor='promote'>Promote ads</label>
          </div>
          {isLoading || isPrefLoading ? <Button text={<Spinner />} /> : <Button text='Next' />}
        </form>
      </MobilePref>
    </>
  )
}

export default Preference;
