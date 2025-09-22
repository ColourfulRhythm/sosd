import { StyledDirectLinkSuccess } from "@/styles/placersCreator.styles"
import Image from "next/image"
import sucess from '@/public/assets/success-mark.gif'
import { useRouter } from "next/router"
const Success = () => {
    const router = useRouter()
  return (
    <StyledDirectLinkSuccess>
        <div className="modal">
            <div className="head">
                <h4>Success!</h4>
                <p>Congrats, Your advert has finally been published</p>
            </div>
            <div className="success">
                <div className="check">
                    <Image src={sucess} alt='success-mark'/>
                </div>
                <p>Click home to access your dashboard.</p>
            </div>
        </div>

        <div className="btn" onClick={()=>router.push("/placers")}>
            Home
        </div>
    </StyledDirectLinkSuccess>
  )
}

export default Success