import { NotificationModalContainer } from "./styles"
import CloseIcon from '@/public/assets/close-circle'
import { useContext, useEffect, useRef, useState } from 'react'
import NotificationContext from '@/context/notificationContext'
import image from '@/public/assets/Ellipse 3.svg'
import Image from "next/image"
import axios from "axios"
import { GlobalStyle } from "@/styles/global"
import NotificationEmptyScreen from "../notificationEmptyScreen"
import { ButtonSpinner } from "@chakra-ui/react"
import DefaultPic from '@/public/assets/squared-profile.png'

const Index = ({notificationData,isLoading}) => {
  const { isNotifClicked,setIsNotifClicked } = useContext(NotificationContext)
  
  return (
    <>
      <NotificationModalContainer>
        <div className="notification-modal" onClick={(e)=>e.stopPropagation()}>
          <div className="notification-modal-head">
            <div className="notification-modal-head-inner">
              <h3>notifications</h3>
              <div className="close-icon" onClick={()=>setIsNotifClicked(!isNotifClicked)}>
                <CloseIcon />
              </div>
            </div>
          </div>
          {notificationData.length === 0 && isLoading ? (
            <div>
              <ButtonSpinner 
              thickness='4px'
              speed='0.65s'
              emptycolor='gray.200'
              color='#4F00CF'
              size='xl'
              />
            </div>
          ):(
            <>
              {notificationData.length === 0 ? (
                <NotificationEmptyScreen />
              ):(
                <div className="notification-modal-body">
                  {notificationData.map((item)=> (
                    <div className="notification-modal-body-item" key={item._id}>
                      <div className="notification-modal-body-item-textContainer">
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
                        <div className="notification-modal-body-item-textContainer-text">
                          <div className="notification-modal-body-item-textContainer-text-head">
                            <h3>{item.title}</h3>
                            {/* {!item.isRead && (
                              <div className="red-circle"></div>
                            )} */}
                          </div>
                          <div className="notification-modal-body-item-textContainer-text-info">
                            <p>{item.body}</p>
                          </div>
                        </div>
                      </div>
                      <div className="time-stamp">
                        {/* <p>{time}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}          
            </>
          )}
        </div>
      </NotificationModalContainer>
      {/* <GlobalStyle /> */}
    </>
  )
}

export default Index