import UserTagBlue from '@/public/assets/user-tag-blue'
import { StyledDirectLinkSummary } from '@/styles/placersCreator.styles'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdPlacerContext from '@/context/adPlacerContext'
import { formatCurrencyWithoutStyle } from '@/utils/formatCurrency'
import { useCreateAds } from '@/hooks/useCreateAds'
import BackArrow from '@/public/assets/back-arrow'
const Summary = () => {
    const router = useRouter()
    const {productName,redirectUrl,cta,visitors,productDescription,webAddress,amount,advertType,tags,containAdultContent,images} = useContext(AdPlacerContext)
    const {createAd,isLoading} = useCreateAds()

    
    const handlePush = async () =>{
        try {
            await createAd(productName,redirectUrl,productDescription,tags,advertType,cta,images,webAddress,amount,containAdultContent)
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <StyledDirectLinkSummary>
        <div className="modal">
            <div onClick={()=>router.back()} className='back-arrow'>
                <BackArrow />
            </div>
            <div className="head">
                <h4>Summary</h4>
                <p>Confirm all the details you have provided and click “Run Advert” to publish.</p>
            </div>
            <div className="ad-banner">
                <div className="product-name">
                    <div className="head">
                        <UserTagBlue />
                        <h3>Product Name</h3>
                    </div>
                    <p>{productName}</p>
                </div>

                <div className="aim">
                    <div className="head">
                        <UserTagBlue />
                        <h3>Aim</h3>
                    </div>
                    <p>{visitors} Visitors </p>
                </div>

                <div className="price">
                    <div className="head">
                        <UserTagBlue />
                        <h3>Price</h3>
                    </div>
                    <p>₦25/Visitor</p>
                </div>
            </div>

            <div className="desc">
                <div className='description'>
                    <h4>Product Description</h4>
                    <p>{productDescription}</p>
                </div>
                <div className='web-address'>
                    <h4>Company web address</h4>
                    <p>{webAddress}</p>
                </div>
                <div className='amount'>
                    <h4>Ad amount</h4>
                    <p>₦ {formatCurrencyWithoutStyle(amount)}</p>
                </div>
            </div>
        </div>

        <div className="btn" onClick={handlePush}>{isLoading ? 'Running' : 'Run Advert'}</div>
    </StyledDirectLinkSummary>
  )
}

export default Summary