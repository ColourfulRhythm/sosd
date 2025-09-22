import React, { useEffect, useRef, useState } from 'react'
import vector from '@/public/assets/Vector.svg'
import cup from '@/public/assets/cupIcon.svg'
import currency from '@/public/assets/money-send.svg'
import download from '@/public/assets/downloadIcon3.svg'
import archive from '@/public/assets/shareIcon1.svg'
import exportLink from '@/public/assets/bookmarkIcon1.svg'
import more from '@/public/assets/ellipsis.svg'
import { Feed } from './discovery.style'
import Image from 'next/image'
import { detailsAd } from './data'

const DetailedAd = ({click}) => {
    const [showReport, setShowReport] = useState(false)
    const [isReadMore, setIsReadMore] = useState(true);
    const ref = useRef(null)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

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
            <Feed bg="var(--yellow)" key={index}>
            <div className='type'>
                <div className='more'>
                    <div className='direct'>{item.type}</div>
                    <div className='dot' onClick={()=> setShowReport(true)}>
                        {showReport ? (<ul ref={ref}>
                            <li onClick={click}>Report this advert</li>
                            <li>Remove from feed</li>
                        </ul>) : <Image src={more} alt="more"/>}
                    </div>
                </div>
                <div className='adlink'>
                    <div>
                        <p style={{fontWeight: 'bold', fontSize: '1.6rem'}}>{item.product}</p>
                        <div className='profile'>
                            <p>Tags:</p>
                            {item.tags.map((tag, index) => (
                                <div className='tag' key={index}>{tag}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='product'>
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
                <div className='desc'>
                    <div>
                        <div className='aim'>
                            <Image src={currency} alt="currency"/>
                            <p>Price</p>
                        </div>
                        <p className='para'>{item.price}/Conversion</p>
                    </div>
                    <div>
                        <div className='aim'>
                            <Image src={cup} alt="cup"/>
                            <p>Aim</p>
                        </div>
                        <p className='para'>{item.aim} Conversions</p>
                    </div>
                    <div>
                        <div className='aim'>
                            <Image src={vector} alt="vector"/>
                            <p>Achieved</p>
                        </div>
                        <p className='para'>{item.conversions} Conversions</p>
                    </div>
                </div>
                <div className='adImage'>
                    <Image src={item.productImg} alt=""/>
                </div>
                <div className='time'>
                    <div>
                        <div className='user'>
                            <Image src={item.userImg} width={20} alt='product'/>
                            <div>{item.userName}</div>
                        </div>
                        <p>Posted {item.timePosted}</p>
                    </div>
                    <div className='post'>
                        <div className='icons'>
                            <Image src={download} alt=""/>
                        </div>
                        <div className='icons'>
                            <Image src={exportLink} alt=""/>
                        </div>
                        <div className='icons'>
                            <Image src={archive} alt=""/>
                        </div>
                    </div>
                </div>  
            </div>
          </Feed>
        ))}
    </>
  )
}

export default DetailedAd
