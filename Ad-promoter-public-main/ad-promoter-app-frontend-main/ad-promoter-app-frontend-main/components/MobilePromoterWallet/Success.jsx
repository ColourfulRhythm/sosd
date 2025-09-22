import React from 'react'
import success from '@/public/assets/success-mark.gif'
import Image from 'next/image'
import Link from 'next/link'
import { SuccessContainer } from './mobileWallet.style'

const Success = () => {
  return (
    <SuccessContainer>
      <div className='success'>
        <p>Success!</p>
        <div className='gif'>
            <Image src={success} alt="success"/>
        </div>
      </div>
      <p>Congrats, You have just successfully saved a new payment detail</p>
      <Link href="/promoters">
        <a>Go back home</a>
      </Link>
    </SuccessContainer>
  )
}

export default Success
