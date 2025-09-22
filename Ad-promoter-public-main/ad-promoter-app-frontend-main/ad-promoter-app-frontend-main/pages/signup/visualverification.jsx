import { BgContainer } from "@/components/onboardingBg/styles"
import bg from '@/public/assets/bg.png'
import { Overlay } from "@/styles/visualReq.styles"
import Close from '@/public/assets/close-icon'
import Copy from '@/public/assets/copy-icon'
import { useRouter } from 'next/router'
import { StyledContent, VerifyVisual } from "@/styles/visualverification.styled"
import Image from "next/image"
import BackArrow from "@/public/assets/back-arrow"
import logo from '@/public/assets/newOnboardLogo.svg'
import Button from '@/components/authBtn/index'
import { useContext, useEffect, useState } from "react"
import SignupContext from "@/context/signupContext"
import { useSendOtp } from "@/hooks/useSendOtp"
import { AddUserPref } from "@/hooks/addUserPref"
import { Spinner } from "@chakra-ui/react"

const Visualverification = () => {
    const {setIsInputWithValue,linkValue,setLinkValue,userPref,seeVisualAd} = useContext(SignupContext)
    const router = useRouter()
    const {sendOtp,isLoading} = useSendOtp()
    const {phoneNumber} = useContext(SignupContext)
    const [user, setUser] = useState(false)
    const {addUserPref,isPrefLoading} = AddUserPref()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user-detail"));
        setUser(user)
    },[])

    useEffect(() =>{
        setIsInputWithValue(false)
        if(linkValue !== ''){
            setIsInputWithValue(true)
        }else{
            setIsInputWithValue(false)
        }
    })
    const handleClick = () =>{
        if(!user){
            if(linkValue !== ''){
                sendOtp(phoneNumber)
            }
        }else{
            if(user.role){
                if(linkValue !== ''){
                    sendOtp(phoneNumber)
                }
            }else{
                addUserPref(userPref,seeVisualAd,linkValue)
            }
        }
        
    }
    const handleChange = event => {
        setLinkValue(event.target.value);
    };
  return (
    <>
    <BgContainer image={bg}>
        <Overlay className="overlay">
            <div className='back' onClick={()=>router.back()}>
                <BackArrow />
            </div>
            <div className="close" onClick={()=>router.push('/')}>
                <Close />
            </div>
            <StyledContent>
                <div className="header">
                    <Image src={logo} alt='ad-promoter logo'/>
                    <div className="header-text">
                        <h3>Kindly submit a link to your social media account.</h3>
                        <p>We just want to verify if you’re fit to recieve visual adverts from AD-PROMOTER.</p>
                    </div>
                </div>
                <div className="submitform">
                    <div className="paste-input-container">
                        <div className="paste-input">
                            <div className="copy-icon">
                                <Copy />
                            </div>
                            <div className="input">
                                <input 
                                    type="text" 
                                    onChange={handleChange}
                                    value = {linkValue}
                                    required    
                                />
                            </div>
                            <div className="button">
                                <p>Paste</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleClick}>
                        <Button text={isLoading || isPrefLoading ? <Spinner />:'Submit'}/>
                    </div>
                </div>
            </StyledContent>
        </Overlay>
    </BgContainer>
    <VerifyVisual>
      <div>
        <div className='back' onClick={()=>router.back()}>
            <BackArrow />
        </div>
        <div className='logo'>
            <Image src={logo} alt='ad-promoter logo'/>
        </div>
      </div> 
      <h3>Kindly submit a link to your social media account</h3>
      <p>
        We just want to verify if you’re fit to recieve visual adverts from AD-PROMOTER. 
      </p>
      <div className="submitform">
        <div className="paste-input-container">
            <div className="paste-input">
                <div className="copy-icon">
                    <Copy />
                </div>
                <div className="input">
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value = {linkValue}
                        required    
                    />
                </div>
                <div className="button">
                    <p>Paste</p>
                </div>
            </div>
        </div>
        <div onClick={handleClick}>
            <Button text={isLoading || isPrefLoading ? <Spinner />:'Submit'}/>
        </div>
      </div>
    </VerifyVisual>
    </>
  )
}

export default Visualverification