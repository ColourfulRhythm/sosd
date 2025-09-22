import Image from "next/image"
import { StyledBtn, StyledBtn1 } from "./style"
import { useRouter } from "next/router"
const Index = ({icon,text}) => {
  const router = useRouter();
  return (
    <>
      {router.pathname.startsWith('/login') ?(
        <StyledBtn1>
          <Image src={icon} alt={`${text} logo`}/>
          <p>Continue with {text}</p>
        </StyledBtn1>
      ):(
        <StyledBtn>
          <Image src={icon} alt={`${text} logo`}/>
          <p>Continue with {text}</p>
        </StyledBtn>
      )}
    </>
  )
}

export default Index