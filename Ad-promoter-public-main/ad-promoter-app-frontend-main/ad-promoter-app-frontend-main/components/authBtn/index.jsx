import Link from "next/link"
import { StyledBtn } from "./styles"
import { useRouter } from "next/router"
import { useContext } from "react";
import { useSignup } from '@/hooks/useSignup'
import SignupContext from "@/context/signupContext";
import { useRef } from "react";

const Index = ({text,path}) => {
  const router = useRouter();
  const {isLoading} = useSignup()
  const {isInputWithValue} = useContext(SignupContext)

  return (
    <StyledBtn>
      {router.pathname.startsWith('/signup') || router.pathname === '/login' || router.pathname.startsWith('/password-recovery') ? (
        <button disabled={isLoading} className={isInputWithValue ? 'btn-lg' : 'btn-lg-inactive'} type="submit">
          {text}
        </button>
      ):(
        <button onClick={()=>router.push(path)} className="btn-sm">
          
          <p>{text}</p>
           
        </button>
      )}
 
    </StyledBtn>
  )
}

export default Index