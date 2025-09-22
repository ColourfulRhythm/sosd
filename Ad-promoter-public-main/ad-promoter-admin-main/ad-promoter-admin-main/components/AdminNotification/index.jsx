import { NotificationModalContainer } from './styles';
import CloseIcon from '@/public/assets/close-circle';
import { useContext } from 'react';
import NotificationContext from '@/context/notificationContext';
import image from '@/public/assets/Ellipse 3.svg';
import Image from 'next/image';
import { useWidth } from '@/hooks';
import {BsArrowLeftCircle} from 'react-icons/bs'

const breakpoint = 1024;

const Index = () => {
  const { responsive } = useWidth(breakpoint);
  const { isNotifClicked, setIsNotifClicked } = useContext(NotificationContext);
  const notifications = [
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 1,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 2,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 3,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 4,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 5,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 6,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 7,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 8,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 9,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 10,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 11,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 12,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 13,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 14,
    },
    {
      img: image,
      type: 'New Advert Alert',
      text: 'Tina Couture just placed a new Visual Advert (Sizzling beef sauce...), be among the first promoters to promote her advert.',
      time: 'Mar 30-3:12 PM',
      key: 15,
    },
  ];

  return (
    <NotificationModalContainer>
      {responsive ? (
        <div className="notification-modal">
          <div className="notification-modal-head">
            <div className="notification-modal-head-inner">
              <h3>notifications</h3>
              <div
                className="close-icon"
                onClick={() => setIsNotifClicked(!isNotifClicked)}
              >
                <CloseIcon />
              </div>
            </div>
          </div>
          <div className="notification-modal-body">
            {notifications.map(({ key, img, type, text, time }, index) => (
              <div className="notification-modal-body-item" key={index}>
                <div className="notification-modal-body-item-textContainer">
                  <Image src={img} alt="notification image"/>
                  <div className="notification-modal-body-item-textContainer-text">
                    <div className="notification-modal-body-item-textContainer-text-head">
                      <h3>{type}</h3>
                      <div className="red-circle"></div>
                    </div>
                    <div className="notification-modal-body-item-textContainer-text-info">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
                <div className="time-stamp">
                  <p>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="notification-modal-small">
          <div className="notification-modal-small-head">
            <div className="notification-modal-small-head-inner">
              <span></span>
              <h3>notifications</h3>
              <div
                className="close-icon"
                onClick={() => setIsNotifClicked(!isNotifClicked)}
              >
                <BsArrowLeftCircle className='arrow-back'/>
              </div>
            </div>
          </div>
          <div className="notification-modal-small-body">
            {notifications.map(({ key, img, type, text, time }, index) => (
              <div className="notification-modal-small-body-item" key={index}>
                <div className="notification-modal-small-body-item-textContainer">
                  <Image src={img} alt="notification image" />
                  <div className="notification-modal-small-body-item-textContainer-text">
                    <div className="notification-modal-small-body-item-textContainer-text-head">
                      <h3>{type}</h3>
                      <div className="red-circle"></div>
                    </div>
                    <div className="notification-modal-small-body-item-textContainer-text-info">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
                <div className="time-stamp">
                  <p>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}{' '}
    </NotificationModalContainer>
  );
};

export default Index;
