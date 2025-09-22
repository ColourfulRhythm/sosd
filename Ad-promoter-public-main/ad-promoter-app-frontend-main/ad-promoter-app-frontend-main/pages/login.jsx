import { BgContainer } from "@/components/onboardingBg/styles"
import bg from '@/public/assets/bg.png'
import { MobileLogin, Overlay } from "@/styles/login.styles"
import Close from '@/public/assets/close-icon'
import Image from "next/image"
import logo from '@/public/assets/newOnboardLogo.svg'
import SocialBtn from '@/components/socialMediaBtn/index';
import google from '@/public/assets/google.svg';
import fb from '@/public/assets/fb.svg';
import Button from '@/components/authBtn/index'
import { useRouter } from "next/router"
import Link from "next/link"
import { useContext, useState,useEffect } from "react"
import { BsEyeFill,BsEyeSlashFill } from "react-icons/bs"
import { useLogin } from "@/hooks/useLogin"
import { useAuthContext } from "@/hooks/useAuth"
import SignupContext from "@/context/signupContext"
import { Spinner } from "@chakra-ui/react"

const Login = () => {
  const router = useRouter();
  const [isPasswordShown,setIsPasswordShown] = useState(false)
  const [userEmail,setUserEmail] = useState('')
  const [userPassword,setUserPassword] = useState('')
  const {setIsInputWithValue} = useContext(SignupContext)
  const {login,isLoading} = useLogin()
  
  useEffect(() => {
    if(userEmail !== '' && userPassword !== '' ){
      setIsInputWithValue(true)
    }else{
      setIsInputWithValue(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
   if(userEmail && userPassword !== ''){
    login(userEmail,userPassword)    
   }
  }

  const handleGoogleSignIn = () => {
    window.open('https://add-promoter-backend.onrender.com/api/v1/auth/google', '_self');
  };

  const handleFbSignIn = () => {
    window.open('https://add-promoter-backend.onrender.com/api/v1/auth/facebook', '_self');
  };

  return (
    <>
    <BgContainer image={bg}>
    <Overlay className='overlay'>
        <div className="close" onClick={()=>router.push('/')}>
          <Close />
        </div>
        <div className="content">
          <div className="content-header">
            <Image src={logo} alt='ad-promoter logo'/>
            <div className="content-header-text">
              <h3>Log in</h3>
              <p>Don’t have an account? <Link href='/signup'><a>Sign up</a></Link></p>
            </div>
          </div>
          <div className="content-socials">
            <div onClick={handleGoogleSignIn}>
              <SocialBtn icon={google} text="Google" />
            </div>
            <div onClick={handleFbSignIn}>
              <SocialBtn icon={fb} text="Facebook" />
            </div>
          </div>
          <div className="divider">
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="email">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                />
            </div>
            <div className="password">
              <div className="input-container">
                <div className="label">
                  <label htmlFor="password">Your password</label>
                  <div className="hide" onClick={()=>setIsPasswordShown(!isPasswordShown)}>
                    {isPasswordShown ? (
                      <BsEyeSlashFill style={{color: 'rgba(102,102,102,0.8)'}} />
                      ):(
                      <BsEyeFill style={{color: 'rgba(102,102,102,0.8)'}} />
                    )}
                    {isPasswordShown ? (
                      <p>Hide</p>
                    ):(
                      <p>Show</p>
                    )}
                  </div>
                </div>
                <input  
                  id="password"
                  name='password'
                  required
                  type={isPasswordShown ? "text" : "password"}
                  value={userPassword}
                  onChange={e => setUserPassword(e.target.value)}
                />
              </div>
              <div style={{cursor: 'pointer'}} onClick={()=>router.push('/password-recovery')} className="error-container">
                <p>Forgot your password</p>
              </div>
            </div>
            <Button text={isLoading ? <Spinner /> : 'Log in'} />
          </form>
        </div>
      </Overlay>
    </BgContainer>
    <MobileLogin>
      <div className="logo">
        <Image src={logo} alt='ad-promoter logo'/>
        <div className="login">
          <h3>Log in</h3>
          <p>Don’t have an account? <Link href='/signup'><a>Sign up</a></Link></p>
        </div>
      </div>
      <div className="content-socials">
        <SocialBtn icon={google} text="Google" />
        <SocialBtn icon={fb} text="Facebook" />
      </div>
      <div className="divider">
        <div></div>
        <p>or</p>
        <div></div>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Your Email</label>
          <input 
            type="email" 
            id="memail" 
            required
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            />
        </div>
        <div className="password">
          <div className="input-container">
            <div className="label">
              <label htmlFor="password">Your password</label>
              <div className="hide" onClick={()=>setIsPasswordShown(!isPasswordShown)}>
                {isPasswordShown ? (
                  <BsEyeSlashFill style={{color: 'rgba(102,102,102,0.8)'}} />
                  ):(
                  <BsEyeFill style={{color: 'rgba(102,102,102,0.8)'}} />
                )}
                {isPasswordShown ? (
                  <p>Hide</p>
                ):(
                  <p>Show</p>
                )}
              </div>
            </div>
            <input  
              id="mpassword"
              name='password'
              required
              type={isPasswordShown ? "text" : "password"}
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
            />
          </div>
          <p style={{cursor: 'pointer'}} onClick={()=>router.push('/password-recovery')}>Forgot your password</p>
        </div>
        <Button text={isLoading ? <Spinner /> : 'Log in'} />
      </form>
    </MobileLogin>
    </>
  )
}

export default Login