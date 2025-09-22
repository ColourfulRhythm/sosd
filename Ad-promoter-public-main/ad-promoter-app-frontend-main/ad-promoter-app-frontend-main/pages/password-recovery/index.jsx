import { BgContainer } from '@/components/onboardingBg/styles'
import bg from '@/public/assets/bg.png'
import { Overlay, SignupMobile } from '@/styles/signup'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Close from '@/public/assets/close-icon'
import logo from '@/public/assets/newOnboardLogo.svg'
import PhoneInput from 'react-phone-number-input'
import { useContext } from 'react'
import SignupContext from '@/context/signupContext'
import { useState } from 'react'
import { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Button from '@/components/authBtn/index'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Spinner, useToast } from '@chakra-ui/react'

const Index = () => {
    const {phoneNumber,setPhoneNumber,setIsInputWithValue} = useContext(SignupContext)
    const [phoneState,setPhoneState] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(false)
    const router = useRouter()
    const phoneRef = useRef(true)
    const toast = useToast();

    useEffect(()=>{
        if(phoneNumber !==''){
            setIsInputWithValue(true)
          }else{
            setIsInputWithValue(false)
        }
    })

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(phoneNumber && isPossiblePhoneNumber(phoneNumber) && phoneNumber && isValidPhoneNumber(phoneNumber) && phoneNumber && formatPhoneNumber(phoneNumber) && formatPhoneNumberIntl(phoneNumber)){
        setIsLoading(true)
        try{          
          const response = await fetch(
            'https://api.ad-promoter.com/api/v1/auth/forgot-password-phone',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                phoneNumber,
              }),
            }
          );
          const json = await response.json();
          if (!response.ok) {
            setIsLoading(false)
            toast({
              title: json.msg,
              status: 'error',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
            });
          }
          if (response.ok) {
            localStorage.setItem('OTP_INFO', JSON.stringify(json));
            setIsLoading(false)
            router.push("/password-recovery/verification")
          }
        }catch(error){
          setError(true)
          console.log(error);
          toast({
            title: 'Unable to validate phone number',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
          });
          setIsLoading(false)
        }
      }
      else{
        phoneRef.current = false
        setPhoneState(false)
        toast({
          title: 'Enter a valid phone number',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
      }
    }
  return (
    <>    
      <BgContainer image={bg}>
        <Overlay className='overlay'>
        <div className="close" onClick={()=>router.push('/')}>
            <Close />
          </div>
          <div className="content">
              <div className="welcome">
                  <Image src={logo} alt='ad-promoter logo'/>
                  <div className="welcome-text">
                  <h3>Finding your Account?</h3>
                  <p>Enter your phone number!</p>
                  </div>
              </div>

              <form action="" onSubmit={handleSubmit}>
                  <div className="tel">
                      <label htmlFor="tel">Your Phone number</label>
                      <div className="tel-input">
                          <PhoneInput
                          defaultCountry="NG"
                          international
                          value={phoneNumber}
                          onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                          className={phoneState ? 'input' : 'invalid'}
                          />
                      </div>
                  </div>
                  <Button text={isLoading ? <Spinner /> : 'Next'} />
              </form>
          </div>
        </Overlay>
      </BgContainer>

      <SignupMobile>
        <div className='logo'>
          <Image src={logo} alt='ad-promoter logo'/>
        </div>
        <div className='note'>
          <h3>Finding your Account?</h3>
          <p>
            Enter your phone number!
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="tel">
              <label htmlFor="tel">Your Phone number</label>
              <div className="tel-input">
                  <PhoneInput
                  defaultCountry="NG"
                  international
                  value={phoneNumber}
                  onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                  className={phoneState ? 'input' : 'invalid'}
                  />
              </div>
          </div>
          <Button text={isLoading ? <Spinner /> : 'Next'} />
        </form>
      </SignupMobile>
    </>
  )
}

export default Index