// eslint-disable-next-line react-hooks/exhaustive-deps
import { BgContainer } from '@/components/onboardingBg/styles'
import { Overlay, ReqMobile } from '@/styles/visualReq.styles'
import Close from '@/public/assets/close-icon'
import bg from '@/public/assets/bg.png'
import Image from 'next/image'
import logo from '@/public/assets/newOnboardLogo.svg'
import Link from 'next/link'
import Button from '@/components/authBtn/index'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import { useContext } from "react";
import BackArrow from '@/public/assets/back-arrow'
import SignupContext from '@/context/signupContext'
import { useSendOtp } from '@/hooks/useSendOtp'
import { AddUserPref } from '@/hooks/addUserPref'
import { Spinner } from '@chakra-ui/react'
const VisualReq = () => {
    const {sendOtp,isLoading} = useSendOtp()
    const {phoneNumber} = useContext(SignupContext)
    const {setIsInputWithValue,userVisualReq,setUserVisualReq,seeVisualAd,setSeeVisualAd,userPref,linkValue} = useContext(SignupContext)
    const router = useRouter();
    const [yes, setYes] = useState(false)
    const [no, setNo] = useState(false)
    const [remind, setRemind] = useState(false)
    const [user, setUser] = useState(false)
    const {addUserPref,isPrefLoading} = AddUserPref()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user-detail"));
        setUser(user)
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!user){
            if(userVisualReq === 'yes'){
                router.push("/signup/visualverification")
            }
            else{
                sendOtp(phoneNumber)
            }
        }else{
            if(user.role){
                if(userVisualReq === 'yes'){
                    router.push("/signup/visualverification")
                }
                else{
                    sendOtp(phoneNumber)
                }
            }
            else{
                if(userVisualReq === 'yes'){
                    router.push("/signup/visualverification")
                }
                else{
                    addUserPref(userPref,seeVisualAd,linkValue)
                }
            }
        }

    }

    useEffect(()=>{
        setIsInputWithValue(false)
    },[setIsInputWithValue])
    useEffect(() => {
    router.prefetch('/signup/verification')
    if(userVisualReq === 'yes'){
        setSeeVisualAd(true)
    }else{
        setSeeVisualAd(false)
    }
  }, [router,setIsInputWithValue,seeVisualAd,setSeeVisualAd,userVisualReq])

  const toggleYes = () => {
    if(yes) {
        setYes(false)
    }
    return;
  }
  const toggleNo = () => {
    if(no) {
        setNo(false)
    }
    return;
  }
  const toggleRemind = () => {
    if(remind) {
        setRemind(false)
    }
    return;
  }
  const selectYes = (event) => {
    setUserVisualReq(event.target.value);
    setIsInputWithValue(true)
    setYes(true)
    toggleNo()
    toggleRemind()
    setIsInputWithValue(true)
  }
  const selectNo = (event) => {
    setUserVisualReq(event.target.value);
    setIsInputWithValue(true)
    setNo(true)
    toggleYes()
    toggleRemind()
  }
  const selectRemind = (event) => {
    setUserVisualReq(event.target.value);
    setIsInputWithValue(true)
    setRemind(true)
    toggleYes()
    toggleNo()
  }

  return (
    <>
    <BgContainer image={bg}>
        <Overlay className='overlay'>
            <div className='back' onClick={()=>router.back()}>
                <BackArrow />
            </div>
            <div className="close" onClick={()=>router.push('/')}>
                <Close />
            </div> 
            <div className="content">
                <div className="welcome">
                    <Image src={logo} alt='ad-promoter logo'/>
                    <div className="welcome-text">
                        <h3>Do you want to recieve visual ads?</h3>
                        <p>What are visual ads? <Link href='#'><a>Learn more</a></Link> </p>
                    </div>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="yes" onClick={selectYes}>
                        <input 
                            type="radio" 
                            id="yes" 
                            value='yes' 
                            name='visual'
                            checked={yes}
                        />
                        <label htmlFor="yes">Yes, I do</label>
                    </div>
                    <div className="no" onClick={selectNo}>
                        <input 
                            type="radio" 
                            id="no" 
                            value='no' 
                            name='visual' 
                            checked={no}
                            />
                        <label htmlFor='no'>No, I don&apos;t</label>
                    </div>
                    <div className="remind" onClick={selectRemind}>
                        <input 
                            type="radio" 
                            id="remind" 
                            value='remind' 
                            name='visual' 
                            checked={remind}
                            />
                        <label htmlFor='remind'>Remind me later</label>
                    </div>
                    <Button text={isLoading || isPrefLoading ? <Spinner />:'Sign me in'} />
                </form>
            </div>
        </Overlay>
    </BgContainer>
    <ReqMobile>
      <div>
        <div className='back' onClick={()=>router.back()}>
            <BackArrow />
        </div>
        <div className='logo'>
            <Image src={logo} alt='ad-promoter logo'/>
        </div>
      </div>
      <h3>Do you want to receive <br /> visual ads?</h3>
      <p>
        What are visual ads? Learn more
      </p>
      <form action="" onSubmit={handleSubmit}>
        <div className="yes" onClick={selectYes}>
            <input 
                type="radio" 
                id="yes" 
                value='yes' 
                name='visual'
                checked={yes}
                
            />
            <label htmlFor="yes">Yes, I do</label>
        </div>
        <div className="no" onClick={selectNo}>
            <input 
                type="radio" 
                id="no" 
                value='no' 
                name='visual' 
                checked={no}
                />
            <label htmlFor='no'>No, I don&apos;t</label>
        </div>
        <div className="remind" onClick={selectRemind}>
            <input 
                type="radio" 
                id="remind" 
                value='remind' 
                name='visual' 
                checked={remind}
                />
            <label htmlFor='remind'>Remind me later</label>
        </div>
        <Button text={isLoading || isPrefLoading ? <Spinner />:'Sign me in'} />
    </form>
    </ReqMobile>
    </>
  )
}

export default VisualReq