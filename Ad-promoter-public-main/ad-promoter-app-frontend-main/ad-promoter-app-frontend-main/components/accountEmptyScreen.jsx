import { EmptyCreatorScreen } from '@/styles/placersCreator.styles'
import React from 'react'
import Empty from '@/public/assets/Wallet2.svg'
import Image from 'next/image'
const AccountEmptyScreen = () => {
  return (
    <EmptyCreatorScreen>
        
        <div>
            <Image src={Empty} alt='empty transaction image'/>
            <h3>No Account Info Yet</h3>
            <p className='grey'>Looks like you haven’t added any account info.</p>
        </div>
    </EmptyCreatorScreen>
  )
}

export default AccountEmptyScreen