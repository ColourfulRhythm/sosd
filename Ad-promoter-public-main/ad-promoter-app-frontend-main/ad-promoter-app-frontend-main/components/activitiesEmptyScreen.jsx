import { EmptyCreatorScreen } from '@/styles/placersCreator.styles'
import React from 'react'
import Empty from '@/public/assets/empty-activities.svg'
import Image from 'next/image'
const ActivitiesEmptyScreen = () => {
  return (
    <EmptyCreatorScreen>
        
        <div>
            <Image src={Empty} alt='empty activities image'/>
            <h3>No activities yet</h3>
            <p>Your activities will appear here.</p>
        </div>
    </EmptyCreatorScreen>
  )
}

export default ActivitiesEmptyScreen