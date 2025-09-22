import { EmptyCreatorScreen } from '@/styles/placersCreator.styles'
import React from 'react'
import Empty from '@/public/assets/no-notification.svg'
import Image from 'next/image'
const NotificationEmptyScreen = () => {
  return (
    <EmptyCreatorScreen>
        <div>
            <Image src={Empty} alt='empty activities image'/>
            <h3>No Notifications Yet</h3>
            <p>When you get notifications, they’ll show up here</p>
        </div>
    </EmptyCreatorScreen>
  )
}

export default NotificationEmptyScreen