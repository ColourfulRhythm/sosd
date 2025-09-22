import { StyledDirectLinkPayment } from '@/styles/placersCreator.styles'
import React from 'react'
import ProgressCheck from '@/public/assets/progress-check-1'
import { useRouter } from 'next/router'
const Payment = () => {
    const router = useRouter()
    const handlePush = () =>{
        router.push('summary')
    }
  return (
    <StyledDirectLinkPayment>
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
                <p>Kindly input your card details</p>
            </div>
            <form action="">
                <div className="card-name">
                    <label htmlFor="">Cardholder name</label>
                    <input type="text" />
                </div>

                <div className="card-number">
                    <label htmlFor="">Cardholder number</label>
                    <input type="text" />
                </div>

                <div className="card-back">
                    <div className="cvv">
                        <label htmlFor="">CVV</label>
                        <input type="text" />
                    </div>
                    <div className="expiry-date">
                        <label htmlFor="">Expiry date</label>
                        <input type="text" placeholder='MM/YY'/>
                    </div>
                </div>
            </form>
        </div>

        <div className="btns">
            <div className="prev" onClick={()=>router.back()}>Prev</div>
            <div className="next" onClick={handlePush}>Next</div>
        </div>
    </StyledDirectLinkPayment>
  )
}

export default Payment