import { EmptyCreatorScreen } from '@/styles/placersCreator.styles'
import React from 'react'
import Empty from '@/public/assets/Wallet.svg'
import Image from 'next/image'
const WalletEmptyScreen = () => {
  return (
    <EmptyCreatorScreen>
        
        <div>
            <Image src={Empty} alt='empty transaction image'/>
            <h3>No Transaction Yet</h3>
            <p className='grey'>You have 0 transactions.</p>
        </div>
    </EmptyCreatorScreen>
  )
}

export default WalletEmptyScreen