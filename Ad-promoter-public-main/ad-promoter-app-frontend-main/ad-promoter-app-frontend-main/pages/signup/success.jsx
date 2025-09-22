import { BgContainer } from "@/components/onboardingBg/styles"
import bg from '@/public/assets/bg.png'
import { Overlay, SuccessMobile } from "@/styles/success"
import logo from '@/public/assets/newOnboardLogo.svg'
import Image from "next/image"
import successMark from '@/public/assets/success-mark.gif'
import { useContext } from "react";
import { useRouter } from "next/router"
import SignupContext from "@/context/signupContext"
import { useState } from "react"
import { Spinner } from "@chakra-ui/react"
const Success = () => {
  const {userPref} = useContext(SignupContext)
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
 
  const handleSubmit = ()=>{
    setIsLoading(true)
    if(userPref === 'promoter'){
      router.push('/promoters')
      setIsLoading(false)
    }
    else{
      router.push('/placers')
      setIsLoading(false)
    }
  }
  return (
    <>
    <BgContainer image={bg}>
      <Overlay className="overlay">
          <Image src={logo} alt='ad-promoter'/>
          <div className="content">
            <h3>Success!</h3>
            <div className="img">
              <Image 
                src={successMark} 
                unoptimized={true}
                alt='success'/>
            </div>
            <p>Congratulations, You have successfully created an account. Click on the link below to go home.</p>
            <div className="btn" onClick={handleSubmit}>{isLoading ? <Spinner />:'Take me home'}</div>
          </div>
      </Overlay>
    </BgContainer>
    <SuccessMobile>
      <div className="logo">
        <Image src={logo} alt='ad-promoter'/>
        <h3>Success!</h3>
        <div className="img">
          <Image 
            src={successMark} 
            unoptimized={true}
            alt='success'/>
        </div>
        <p>Congratulations, You have successfully created an account. Click on the link below to go home.</p>
        <div className="btn" onClick={handleSubmit}>{isLoading ? <Spinner />:'Take me home'}</div>
      </div>
    </SuccessMobile>
    </>
  )
}

export default Success