import React, {useEffect, useRef, useState} from 'react'
import { Feed } from './discovery.style'
import Image from 'next/image'
import more from '@/public/assets/ellipsis.svg'
import vector from '@/public/assets/Vector.svg'
import cup from '@/public/assets/cupIcon.svg'
import currency from '@/public/assets/money-send.svg'
import download from '@/public/assets/downloadIcon3.svg'
import bookmarkIcon from '@/public/assets/bookmarkIcon1.svg'
import shareIcon from '@/public/assets/shareIcon1.svg'
import { detailsAd } from './data'


const DetailedAdRec = ({click}) => {
  const [showReport, setShowReport] = useState(false)
  const [isReadMore, setIsReadMore] = useState(true);
  
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const ref = useRef(null)
 
  useEffect(() => {
    const onClickOutside = () => {
      setShowReport(false)
    }
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    }
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [])

  return (
    <>
      {detailsAd.map((item, index) => (
            <Feed bg='var(--yellow)' key={index}>
            <div className='type'>
              <div className='recAd'>
                <div className='recDirect'>{item.type}</div>
                <div className='recDot' onClick={()=> setShowReport(true)}>
                  {showReport ? (<ul ref={ref}>
                    <li onClick={click}>Report this advert</li>
                    <li>Remove from feed</li>
                  </ul>) : <Image src={more} alt="more"/>}
                </div>
              </div>
              <div className='reclink'>
                <div className='stack'>
                  <p style={{fontWeight: 'bold', fontSize: '1.6rem'}}>{item.product}</p>
                  <div className='recProfile'>
                    <p>Tags:</p>
                    {item.tags.map((tag, index) => (
                      <div className='recTag' key={index}>{tag}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='recProduct'>
                <p>
                  {isReadMore ? item.desc.slice(0, 156) : item.desc}
                  {item.desc.length > 156 ? (
                      <span onClick={toggleReadMore}>
                          {isReadMore ? " Read more" : " Show less"}
                      </span>
                  ):(
                      <p></p>
                  )}
                </p>
              </div>
              <div className='recDesc'>
                <div>
                  <div className='recAim'>
                    <Image src={currency} alt="currency"/>
                    <p>Price</p>
                  </div>
                  <p className='recPara'>{item.price}/Video</p>
                </div>
                <div>
                  <div className='recAim'>
                    <Image src={cup} alt="cup"/>
                    <p>Aim</p>
                  </div>
                  <p className='recPara'>{item.aim} Videos</p>
                </div>
                <div>
                  <div className='recAim'>
                    <Image src={vector} alt="vector"/>
                    <p>Achieved</p>
                  </div>
                  <p className='recPara'>{item.conversions} Videos</p>
                </div>
              </div>
              <div className='adImage'>
                <Image src={item.productImg} alt=""/>
              </div>
              <div className='recTime'>
                <div>
                  <div className='recUser'>
                    <Image src={item.userImg} width={20} alt='product'/>
                    <div>{item.userName}</div>
                  </div>
                  <p>Posted {item.timePosted}</p>
                </div>
                <div className='recPost'>
                  <div className='recIcons'>
                    <Image src={download} alt=""/>
                  </div>
                  <div className='recIcons'>
                    <Image src={shareIcon} alt=""/>
                  </div>
                  <div className='recIcons'>
                    <Image src={bookmarkIcon} alt=""/>
                  </div>
               </div>
              </div>
            </div>
          </Feed>
      ))}
    </>
  )
}

export default DetailedAdRec
