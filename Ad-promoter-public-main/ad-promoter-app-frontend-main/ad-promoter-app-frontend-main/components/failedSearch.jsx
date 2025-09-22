import { EmptyCreatorScreen } from '@/styles/placersCreator.styles'
import React from 'react'
import Empty from '@/public/assets/emptyDiscovery.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
const SearchEmptyScreen = () => {
    const router = useRouter()
  return (
    <EmptyCreatorScreen>
        <div className='container'>
            <Image src={Empty} alt='empty transaction image'/>
            <div className='loading-block'>
                <h2>Result Not Found</h2>
                <p className='discovery-p'>Please try again with another keywords or maybe use generic term</p>
            </div>
            <button onClick={()=>router.reload()}>Search again</button>
        </div>
    </EmptyCreatorScreen>
  )
}

export default SearchEmptyScreen