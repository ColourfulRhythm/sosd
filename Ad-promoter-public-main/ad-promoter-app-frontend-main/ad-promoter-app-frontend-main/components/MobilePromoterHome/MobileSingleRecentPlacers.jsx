import React, { useEffect, useRef, useState } from 'react'
import more from '@/public/assets/ellipsis.svg'
import info from '@/public/assets/info-circle.svg'
import remove from '@/public/assets/remove.svg'
import vector from '@/public/assets/Vector.svg'
import cup from '@/public/assets/cupIcon.svg'
import currency from '@/public/assets/money-send.svg'
import download from '@/public/assets/downloadIcon3.svg'
import archive from '@/public/assets/shareIcon1.svg'
import exportLink from '@/public/assets/bookmarkIcon1.svg'
import Image from 'next/image'
import Copy from '@/public/assets/copy-icon'
import { BackdropContainer, Feed, ModalContainer } from './style'
import { directlinkAd, visualAd } from '../PromoterHomeAdDetail/data'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import TimeAgo from '../timeAgo'
import { Spinner } from '@chakra-ui/react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import JobsContext from '@/context/jobsContext'
import { useContext } from 'react'
import axios from '@/pages/api/axios'

const MobileRecentPlacers = ({handleShowReport,handleAdRemoval,showReport,setShowReport,showReportModal,setShowReportModal,showDropdown,setShowDropdown,isReadMore,setIsReadMore,currentIndex,setCurrentIndex,listValue,setListValue,ClickedList,toggleReadMore,previousImage,nextImage,dashboardEndDate,dashboardStartDate}) => {
    const {recentJobs,setRecentJobs,isLoading,setIsLoading} = useContext(JobsContext)
    const token = useRef('')
    const dropdownRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            for (const itemId in dropdownRefs.current) {
                if(showReport[itemId]){
                    setShowReport(false)
                }
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [setShowReport, showReport]);

    const assignDropdownRef = (itemId, ref) => {
        dropdownRefs.current[itemId] = ref;
    };

    useEffect(()=>{
        const userToken = JSON.parse(localStorage.getItem("user-token"));
        if (userToken) {
            token.current = userToken
        }
    
        const fetchRecentJobs = async () => {
            let apiUrl = '/api/v1/ads/recent-ads?page=1&pageSize=10';
          
            if (dashboardStartDate) {
              apiUrl += `&startDate=${dashboardStartDate}`;
            }
            if (dashboardEndDate) {
              apiUrl += `&endDate=${dashboardEndDate}`;
            }
          
            setIsLoading(true);
          
            try {
              const response = await axios.get(apiUrl, {
                headers: {
                  Authorization: `Bearer ${token.current}`,
                },
              });
          
              const result = response.data;
          
              setRecentJobs(result.data.data);
          
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching recent jobs:', error);
              setIsLoading(false);
              toast({
                title: 'Unable to fetch feed',
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom-left",
                size: "lg"
                });
            }
        };
    
        if(token.current){
            fetchRecentJobs()
        }
    },[dashboardEndDate, dashboardStartDate, setIsLoading, setRecentJobs])

    const toggleDropdown = (itemId) => {
        setShowReport((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };
      
    const handleButtonClick = (event, itemId) => {
        // Prevent event propagation for the specific button
        event.stopPropagation();
        toggleDropdown(itemId); // Toggle the dropdown without affecting the global click event
    };

    
  return (
    <>
        {recentJobs.length === 0 && isLoading ? (
            <Spinner 
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#4F00CF'
            size='xl'
            />
        ):(
            <>
                {recentJobs.length === 0 ?(
                    <p>Your recent adverts will appear here</p>
                ):(
                    <>
                        {recentJobs.map((item) => (
                            <Feed bg={item.type === 'direct-link' ? '#0594FB': item.type === 'detail' ? 'var(--yellow)':'var(--green)'} key={item._id}>
                                <div className="product-summary">
                                    <div className="product-summary-head">
                                        <div className="ad-type-container">
                                            <div className="adtype">{item.type}</div>
                                            <div className='dot' ref={(ref) => assignDropdownRef(item.id, ref)} onClick={() => toggleDropdown(item.id)}>
                                                <div onClick={(e) => handleButtonClick(e, item.id)}>
                                                    <Image src={more} alt="more"/>
                                                </div>
                                                {showReport[item.id] && (<ul>
                                                    <li onClick={handleShowReport}>Report this advert</li>
                                                    <li onClick={()=>handleAdRemoval(item.id)}>Remove from feed</li>
                                                </ul>)}
                                            </div>
                                        </div>
                                        <div className="business-name-container">
                                            <h3>{item.productName}</h3>
                                            <div className="tag-container">
                                                <p>Tags:</p>
                                                <div className="tag">
                                                    {item.tags.map((tag) => (
                                                    <div key={tag}>{tag}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-summary-text">
                                        <p>
                                        {isReadMore ? item.description.slice(0, 156) : item.description}
                                            {item.description.length > 156 ? (
                                                <span onClick={toggleReadMore}>
                                                    {isReadMore ? " Read more" : " Show less"}
                                                </span>
                                            ):(
                                            <p></p>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="product-plan">
                                    <div className="price">
                                        <div className="head">
                                            <Image src={currency} alt="currency"/>
                                            <h4>Price</h4>
                                        </div>
                                        {item.type === 'detail' ? (
                                            <p>₦50/Conversion</p>
                                        ): item.type === 'direct-link'? (
                                            <p>₦25/Visitor</p>
                                        ):(
                                            <p>₦5,000/Video</p>
                                        )}
                                    </div>
                                    <div className="aim">
                                        <div className="head">
                                            <Image src={cup} alt="cup"/>
                                            <h4>Aim</h4>
                                        </div>
                                        {item.type === 'detail' ? (
                                            <p>{item.target} Conversions</p>
                                        ): item.type === 'direct-link'? (
                                            <p>{item.target} Visitors</p>
                                        ):(
                                            <p>{item.target} Videos</p>
                                        )}
                                    </div>
                                    <div className="achieved">
                                        <div className="head">
                                            <Image src={vector} alt="vector"/>
                                            <h4>Achieved</h4>
                                        </div>
                                        {item.type === 'detail' ? (
                                            <p>{item.achieved} Conversions</p>
                                        ) : item.type === 'direct-link' ? (
                                            <p>{item.achieved} Visitors</p>
                                        ) : (
                                            <p>{item.achieved} Videos</p>
                                        )}
                                    </div>
                                </div>

                                {item.images.length === 0 ?(
                                    <></>
                                    ):(
                                    <div className="product-img-container">
                                    <div className='carousel-container'>
                                        {item.images.length > 1 &&(
                                            <div onClick={() => previousImage(item.images)} className='left-arrow' style={{width: '20px'}}>
                                                <BsFillArrowLeftCircleFill />
                                            </div>
                                        )}
                                        <div className='img-container'>
                                            <Image src={item.images[currentIndex]} alt='product' width={360} height={236}/>
                                        </div>
                                        {item.images.length > 1 &&(
                                            <div onClick={() => nextImage(item.images)} className='right-arrow' style={{width: '20px'}}>
                                                <BsFillArrowRightCircleFill />
                                            </div>
                                        )}
                                    </div>
                                    </div>
                                )}

                                <div className="bottom">
                                    <div className="user-details">
                                    <p>Posted <TimeAgo dateTime={item.dateCreated} /></p>
                                    </div>
                                </div>
                            </Feed>
                        ))}
                        
                        {showReportModal && (
                            <BackdropContainer onClick={()=>setShowReportModal(false)}>
                                <ModalContainer onClick={e => e.stopPropagation()}>
                                    <div className='report'>
                                        <p className='advert'>Report Advert</p>
                                        <p className='reason'>Tell us why you want to report this advert?</p>
                                    </div>
                                    <div className='language'>Why are you reporting this advert</div>
                                    <div className="input-container">
                                        <div className='inputArea' onClick={() => setShowDropdown(!showDropdown)}>
                                            <div className='inputText'>{listValue}</div>
                                            {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
                                        </div>
                                        {showDropdown && (
                                            <ul>
                                                <li onClick={ClickedList}>It has gory images</li>
                                                <li onClick={ClickedList}>It is a scam advert</li>
                                                <li onClick={ClickedList}>It has nudity or sexual content</li>
                                                <li onClick={ClickedList}>Other reasons</li>
                                            </ul>
                                        )}
                                    </div>
                                    <div className='reportButton'>
                                        <button>Send Report</button>
                                    </div>
                                </ModalContainer>
                            </BackdropContainer>
                        )}
                    </>
                )} 
            </>
        )} 
    </>
  )
}

export default MobileRecentPlacers;
