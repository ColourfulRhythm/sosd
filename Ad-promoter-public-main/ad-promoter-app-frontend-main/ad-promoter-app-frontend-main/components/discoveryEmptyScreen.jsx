import { EmptyCreatorScreen } from '@/styles/placersCreator.styles'
import React from 'react'
import Empty from '@/public/assets/emptyDiscovery.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
const DiscoveryEmptyScreen = () => {
    const router = useRouter()
  return (
    <EmptyCreatorScreen>
        <div className='container'>
            <Image src={Empty} alt='empty transaction image'/>
            <div className='loading-block'>
                <h2>Loading up feed</h2>
                <p className='discovery-p'>We are currently preparing your feed, Please be patient or click the button below.</p>
            </div>
            <button onClick={()=>router.reload()}>Reload feed</button>
        </div>
    </EmptyCreatorScreen>
  )
}

export default DiscoveryEmptyScreen