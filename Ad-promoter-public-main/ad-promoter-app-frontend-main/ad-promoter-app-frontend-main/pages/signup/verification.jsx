import { BgContainer } from "@/components/onboardingBg/styles"
import { Overlay, VerificationMobile } from "@/styles/verification.styles"
import logo from '@/public/assets/logo-rounded.svg'
import Image from "next/image"
import bg from '@/public/assets/bg.png'
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import SignupContext from "@/context/signupContext"
import Arrow from '@/public/assets/back-arrow'
import Close from '@/public/assets/close-icon'
import { useSendOtp } from "@/hooks/useSendOtp"
import { useVerification } from "@/hooks/useSmsVerififcation"
import { useSignup } from "@/hooks/useSignup"
import { Spinner } from "@chakra-ui/react"
const Verification = () => {
    const router = useRouter();
    const {sendOtp,isLoading} = useSendOtp()
    const {signup,isVerificationLoading} = useSignup()
    const [input1,setInput1] = useState('')
    const [input2,setInput2] = useState('')
    const [input3,setInput3] = useState('')
    const [input4,setInput4] = useState('')
    const [isOtpWithValue,setIsOtpWithValue] = useState(false)
    const {setOtp,phoneNumber,setRefId,otp,refId,accountName,linkValue,seeVisualAd,email,password,userPref} = useContext(SignupContext)    
    
    useEffect(() => {
        router.prefetch('/signup/success')
        const otpInfo = JSON.parse(localStorage.getItem('OTP_INFO'));
        if (otpInfo) {
            setRefId(otpInfo.data.reference_id);
        }
        if(input1 !== '' && input2 !== '' && input3 !== '' && input4 !== ''){
            setIsOtpWithValue(true)
        }else {
            setIsOtpWithValue(false)
        }
        setOtp(input1+input2+input3+input4)
    }, [router,input1,input2,input3,input4,otp,isOtpWithValue,setOtp,setRefId])



    const handleSubmit = (e) => {
        e.preventDefault()
        if(input1 && input2 && input3 && input4 && input4 !== ''){
            signup(refId,otp,phoneNumber,accountName,linkValue,seeVisualAd,email,password,userPref)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
          case 'otp1':
            setInput1(value);
            break;
          case 'otp2':
            setInput2(value);
            break;
          case 'otp3':
            setInput3(value);
            break;
          case 'otp4':
            setInput4(value);
            break;
        }
      };

    const inputFocus = (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          const next = e.target.tabIndex - 2;
    
          console.log(e);
    
          if (next > -1) {
            e.target.form.elements[next].focus();
          }
        } else {
          const next = e.target.tabIndex;
          if (next < 4) {
            e.target.form.elements[next].focus();
          }
        }
    };

    const handleResend = () =>{
        sendOtp(phoneNumber)
    }
    
  return (
    <>
    <BgContainer image={bg}>
        <Overlay className="overlay">
            <div onClick={()=> router.push('/')} className="close">
                <Close />
            </div>
            <div onClick={()=> router.back()} className="back">
                <Arrow />
            </div>
            <div className="content-container">
                <div className="content">
                    <div className="content-header">
                        <Image src={logo} alt='ad-promoter logo'/>
                        <div className="content-header-text">
                            <h2>OTP Verification</h2>
                            <p>Enter the otp you received to <span>{phoneNumber}</span></p>
                        </div>
                    </div>

                    <form className="content-input">
                        <div className="input-container">
                            <input 
                                type="number" 
                                name="otp1" 
                                id="otp" 
                                value={input1}
                                autoComplete="off"
                                tabIndex="1"
                                maxLength="1"
                                onChange={handleChange}
                                onKeyUp={inputFocus}
                            />
                            <input 
                                type="number" 
                                name="otp2" 
                                id="otp" 
                                value={input2}
                                autoComplete="off"
                                tabIndex="2"
                                maxLength="1"
                                onChange={handleChange}
                                onKeyUp={inputFocus}
                            />
                            <input 
                                type="number" 
                                name="otp3" 
                                id="otp" 
                                autoComplete="off"
                                tabIndex="3"
                                maxLength="1"
                                value={input3}
                                onChange={handleChange}
                                onKeyUp={inputFocus}
                            />
                            <input 
                                type="number" 
                                name="otp4" 
                                id="otp" 
                                value={input4}
                                autoComplete="off"
                                tabIndex="4"
                                maxLength="1"
                                onChange={handleChange}
                                onKeyUp={inputFocus}
                            />
                           
                        </div>
                        <p>Didn’t get anything? <span onClick={handleResend}>Resend OTP</span></p>
                    </form>
                </div>
                <button onClick={handleSubmit} className={isOtpWithValue ? 'content-btn' : 'inactive'}>{isLoading || isVerificationLoading ? <Spinner /> :'Submit'}</button>
            </div>
        </Overlay>
    </BgContainer>
    <VerificationMobile>
        <div>
            <div onClick={()=> router.back()} className="back">
                <Arrow />
            </div>
            <div className="logo">
                <Image src={logo} alt='ad-promoter' />
            </div>
        </div>
        <h3>OTP Verification</h3>
        <div className="verify">
            Enter the OTP you received to <span>{phoneNumber}</span>
        </div>
        <form className="content-input">
            <div className="input-container">
                <input 
                    type="number" 
                    name="otp1" 
                    id="otp" 
                    value={input1}
                    autoComplete="off"
                    tabIndex="1"
                    maxLength="1"
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                />
                <input 
                    type="number" 
                    name="otp2" 
                    id="otp" 
                    value={input2}
                    autoComplete="off"
                    tabIndex="2"
                    maxLength="1"
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                />
                <input 
                    type="number" 
                    name="otp3" 
                    id="otp" 
                    autoComplete="off"
                    tabIndex="3"
                    maxLength="1"
                    value={input3}
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                />
                <input 
                    type="number" 
                    name="otp4" 
                    id="otp" 
                    value={input4}
                    autoComplete="off"
                    tabIndex="4"
                    maxLength="1"
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                />     
            </div>
            <p>Didn’t get anything? <span onClick={handleResend}>Resend OTP</span></p>
        </form>
        <button onClick={handleSubmit} className={isOtpWithValue ? 'content-btn' : 'inactive'}>{isLoading || isVerificationLoading ? <Spinner /> :'Submit'}</button>
    </VerificationMobile>
    </>
  )
}

export default Verification