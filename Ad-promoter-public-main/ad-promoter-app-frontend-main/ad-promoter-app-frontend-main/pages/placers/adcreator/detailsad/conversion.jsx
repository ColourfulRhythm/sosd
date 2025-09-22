import { StyledDirectLinkConversion } from '@/styles/placersCreator.styles'
import React, { useContext, useEffect } from 'react'
import ProgressCheck from '@/public/assets/progress-check'
import Arrow from '@/public/assets/arrow-3'
import NairaIcon from '@/public/assets/naira-icon'
import UserIcon from '@/public/assets/user-icon'
import { useRouter } from 'next/router'
import AdPlacerContext from '@/context/adPlacerContext'
import { useToast } from '@chakra-ui/react'
const Conversion = () => {
    const router = useRouter()
    const {productName,redirectUrl,cta,visitors,productDescription,webAddress,setAmount,setVisitors,amount,advertType,tags,containAdultContent,images} = useContext(AdPlacerContext)
    const toast = useToast()

    useEffect(()=>{
        setVisitors(amount/50)
    })

    const handlePush = () =>{
        if(amount >= 1000){
            router.push('summary')
        }else{
            toast({
                title: 'Amount must not be less than 1,000',
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom-left",
                size: "lg"
            });
        }
    }
  return (
    <StyledDirectLinkConversion>
        <div className="header">
            <div className="header-text">
                <h4>Details</h4>
                <h4>Conversion</h4>
                <h4>Payment</h4>
            </div>
            <div className="progress-bar">
                <ProgressCheck />
            </div>
        </div>

        <div className="modal">
            <div className="modal-head">
                <h4>Creating a Details Advert</h4>
                <p>Use the Ad-Converter to determine the pricing</p>
            </div>

            <div className="modal-body">
                <div className="modal-body-item-container">
                    <div className="text">
                        <h4>Details Advert Rate</h4>
                        <h3>₦50/Conversion</h3>
                    </div>
                    <div className="conversions">
                        <div className="head">
                            <h4>Amount</h4>
                            <h4>Conversion</h4>
                        </div>
                        <div className="conversions-body">
                            <div className="amount-conversion">
                                <div className="icon">
                                    <NairaIcon />
                                </div>
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e)=>setAmount(e.target.value)}/>
                            </div>
                            <div className='arrow'>
                                <Arrow />
                            </div>
                            <div className="visitor-conversion">
                                <div className="icon">
                                    <UserIcon />
                                </div>
                                <input type="number" value={visitors}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="btns">
            <div className="prev" onClick={()=>router.back()}>Prev</div>
            <div className="next" onClick={handlePush}>Next</div>
        </div>
    </StyledDirectLinkConversion>
  )
}

export default Conversion;