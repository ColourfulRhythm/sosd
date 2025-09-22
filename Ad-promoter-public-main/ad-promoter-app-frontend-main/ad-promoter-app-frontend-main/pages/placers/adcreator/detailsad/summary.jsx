import UserTagBlue from '@/public/assets/user-tag-blue'
import { StyledDirectLinkSummary } from '@/styles/placersCreator.styles'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Img1 from '@/public/assets/Component 20.jpg'
import Img2 from '@/public/assets/Component 21.jpg'
import Image from 'next/image'
import { useCreateAds } from '@/hooks/useCreateAds'
import AdPlacerContext from '@/context/adPlacerContext'
import BackArrow from '@/public/assets/back-arrow'
const Summary = () => {
    const router = useRouter()
    const [token ,setToken] = useState('')
    const {productName,redirectUrl,cta,visitors,productDescription,webAddress,amount,advertType,tags,containAdultContent,images} = useContext(AdPlacerContext)
    const {createAd,isLoading} = useCreateAds()

    useEffect(()=>{
        const userToken = JSON.parse(localStorage.getItem('token'));
        if (userToken) {
        setToken(userToken.token);
        }
        
    },[setToken])

    const handlePush = () =>{
        createAd(productName,redirectUrl,productDescription,tags,advertType,cta,images,webAddress,amount,containAdultContent)
    }
  return (
    <StyledDirectLinkSummary>
        <div className="modal">
            <div className='back-arrow'>
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
                    <p>{visitors} Conversions </p>
                </div>

                <div className="price">
                    <div className="head">
                        <UserTagBlue />
                        <h3>Price</h3>
                    </div>
                    <p>₦50/Conversion</p>
                </div>
            </div>

            <div className="desc">
                <div className='description'>
                    <h4>Product Description</h4>
                    <p>{productDescription}</p>
                </div>

                <div className="product-img">
                    <h4>Product Images</h4>
                    <div className="img-container">
                        {images.map((image, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <Image src={image} alt="image" height={80} width={80} />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='web-address'>
                    <h4>Company web address</h4>
                    <p>{webAddress}</p>
                </div>
                <div className='amount'>
                    <h4>Ad amount</h4>
                    <p>{amount}</p>
                </div>
            </div>
        </div>

        <div className="btn" onClick={handlePush}>{isLoading ? 'Running':'Run Advert'}</div>
    </StyledDirectLinkSummary>
  )
}

export default Summary