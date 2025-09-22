/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Image from "next/image"
import back from '@/public/assets/back-icon.svg'
import { NotificationStyle } from './style'
import { Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { useRef } from 'react'
import NotificationEmptyScreen from '../notificationEmptyScreen'
import axios from '@/pages/api/axios'
import DefaultPic from '@/public/assets/squared-profile.png'

const Index = ({goBack,setHasNewNotification}) => {
  const [isLoading,setIsLoading] = useState(null)
  const [notificationData,setNotificationData] = useState([])
  const token = useRef()

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user-token"));

    if (userToken) {
      token.current = userToken
    }
  },[]);

  useEffect(() => {
    // Fetch initial notifications on component mount
    fetchNotification();

    // Check for new notifications every 10 seconds
    const intervalId = setInterval(() => {
      checkNewNotifications();
    }, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const fetchNotification = async() =>{
    try{
      setIsLoading(true)
      const result = await axios.get(`/api/v1/notifications?page=1&pageSize=10`,{
        headers:{
          Authorization: `Bearer ${token.current}`
        }
      })
      setNotificationData(result.data.data.data)
      setIsLoading(false)
    }catch{
      console.error('Error fetching notifications:');
    }
  }

  const checkNewNotifications = async () => {
    try {
      const response = await axios.get('https://api.ad-promoter.com/api/v1/notifications?page=1&pageSize=10', {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
  
      const data = response.data;
      const hasNew = data.length > notificationData.length;
      setHasNewNotification(hasNew);
    } catch (error) {
      console.error('Error checking new notifications:', error);
    }
  };
  return (
    <NotificationStyle>
      <div className='notif'>
        <Image src={back} alt="back" onClick={goBack}/>
        <p>Notification</p>
      </div>

      {notificationData.length === 0 && isLoading ? (
        <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#4F00CF'
        size='xl'
        />
      ):(
        <>
          {notificationData.length === 0 ? (
            <div style={{margin: 'auto'}}>
              <NotificationEmptyScreen />
            </div>
          ):(
            <>
              <div className='notifications'>
                {notificationData.map((item) => (
                    <div key={item._id} className="each">
                        <div className='type'>
                        {item.sender?.profilePicture ? (
                          <Image style={{borderRadius: '50%'}} src={item.sender?.profilePicture} alt='notification image' width={'48px'} height={'48px'}/>
                        ):(
                          <div style={{ width: '52px', height: '52px' }}>
                            <Image
                              src={DefaultPic}
                              alt="profile picture"
                              width={'100%'}
                              height={'100%'}
                              style={{objectFit: 'fill', borderRadius: '100px' }}
                            />
                          </div>
                        )}
                            <div className='text'>
                                <div className='advert'>
                                    <p>{item.title}</p>
                                    {!item.isRead && (
                                      <div className='red-dot'></div>
                                    )}
                                </div>
                                <span>{item.body}</span>
                            </div>
                        </div>
                        {/* <div className='date'>{item.time}</div> */}
                    </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </NotificationStyle>
  )
}

export default Index
