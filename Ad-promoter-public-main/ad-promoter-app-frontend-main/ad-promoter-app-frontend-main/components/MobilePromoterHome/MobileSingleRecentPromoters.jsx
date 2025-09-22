/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import more from '@/public/assets/ellipsis.svg'
import info from '@/public/assets/info-circle.svg'
import remove from '@/public/assets/remove.svg'
import vector from '@/public/assets/Vector.svg'
import cup from '@/public/assets/cupIcon.svg'
import currency from '@/public/assets/money-send.svg'
import download from '@/public/assets/downloadIcon3.svg'
import exportLink from '@/public/assets/shareIcon1.svg'
import archive from '@/public/assets/bookmarkIcon1.svg'
import copyLink from '@/public/assets/bottom-link-icon.svg'
// import { Feed } from '@/components/DiscoveryFolder/discovery.style'
import Image from 'next/image'
import Copy from '@/public/assets/copy-icon'
// import { directlinkAd } from '@/components/DiscoveryFolder/data'
import { BackdropContainer, Feed, ModalContainer } from './style'
import { directlinkAd, visualAd } from '../PromoterHomeAdDetail/data'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import TimeAgo from '../timeAgo'
import { Spinner, useToast } from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg'
import ShareDialogue from '../shareDialogue'
import linkFrame from '@/public/assets/linkframe.svg'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useContext } from 'react'
import JobsContext from '@/context/jobsContext'
import axios from '@/pages/api/axios'

const MobileRecentPromoters = ({sortStartDate,setSortStartDate,setSortEndDate,sortEndDate}) => {
    const [showReport, setShowReport] = useState([])
    const toast = useToast()
    const ref = useRef(null)
    const token = useRef('')
    const [isReportLoading, setIsReportLoading] = useState(null);
    const [isReadMore, setIsReadMore] = useState(true);
    const [showReportModal,setShowReportModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [listValue, setListValue] = useState('It has gory images')
    const [currentIndex,setCurrentIndex] = useState(0)
    // const {recentJobs,setRecentJobs,isLoading,setIsLoading} = useContext(JobsContext)
    const [recentJobs,setRecentJobs] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [showSubmit,setShowSubmit] = useState(true)
    const [showPaste,setShowPaste] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [showDialogue, setShowDialogue] = useState({});
    const [page, setPage] = useState(1);
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
    }, [showReport]);

    const assignDropdownRef = (itemId, ref) => {
        dropdownRefs.current[itemId] = ref;
    };


    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem("user-token"));
        if (userToken) {
            token.current = userToken
        }

        if(token.current){
            fetchRecentJobs()
        }

    }, [sortEndDate,sortStartDate]);


    const fetchRecentJobs = async () => {
        let apiUrl = `/api/v1/ads/recent-ads?page=${page}&pageSize=10`;
      
        if (sortStartDate) {
          apiUrl += `&startDate=${sortStartDate}`;
        }
        if (sortEndDate) {
          apiUrl += `&endDate=${sortEndDate}`;
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
            title: 'Error fetching recent jobs',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };
    
    const ClickedList = (e) =>{
      setListValue(e.target.innerText)
      setShowDropdown(false)
    }

    const handleJobSave = async (id) => {
        try {
          const response = await axios.put(`/api/v1/user/save-job/${id}`, null, {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          });
      
          const result = response.data;
      
          console.log(result.data);
      
          toast({
            title: result.data,
            status: result.success ? 'success' : 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        } catch (error) {
          console.error('Error saving job:', error);
      
          toast({
            title: 'Error saving job',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };

    const handleOpenDialogue = (itemId) => {
        setShowDialogue((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };
    
    const goToPrevious = () =>{
        visualAd.map(({productImg})=>{
            currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(productImg.length -1)
        })
    }

    const goToNext = () =>{
        visualAd.map(({productImg})=>{
            currentIndex <  productImg.length -1 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0) 
        })
    }

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

  
    const togglePaste = () =>{
        setShowSubmit(false)
        setShowPaste(true)
    }

    const handleCopyLink = async (id) => {
        try {
          const response = await axios.get(`/api/v1/promotion/promote/${id}`, {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          });
      
          const data = response.data;
      
          if (response.status === 200) {
            navigator.clipboard.writeText(`https://app.ad-promoter.com/ad/${id}?ref=${data.promotionRef}`)
              .then(() => {
                toast({
                  title: 'Link copied to clipboard!',
                  status: 'success',
                  duration: '5000',
                  isClosable: true,
                  position: 'bottom-left',
                  size: 'lg',
                });
              })
              .catch((error) => {
                console.error('Failed to copy link:', error);
                toast({
                  title: 'Failed to copy link:',
                  status: 'error',
                  duration: '5000',
                  isClosable: true,
                  position: 'bottom-left',
                  size: 'lg',
                });
              });
            // handleCountClick(data.promotionRef);
          }
        } catch (error) {
          console.error('Error fetching ad data:', error);
          toast({
            title: 'Error Copying Link', // Display the error message
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
    };

    const handleReport = async (id, report) => {
        setIsReportLoading(true);
      
        try {
          const response = await axios.post('/api/v1/reports/create', {
            adsId: id,
            report: report,
          }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.current}`,
            },
          });
      
          const json = response.data;
      
          if (!response.status === 200) {
            setIsReportLoading(false);
            setShowReportModal(false);
            toast({
              title: json.msg,
              status: 'error',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
          } else {
            setIsReportLoading(false);
            setShowReportModal(false);
            toast({
              title: json.msg,
              status: 'success',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
          }
        } catch (error) {
          console.error('Error creating report:', error);
          setIsReportLoading(false);
          setShowReportModal(false);
          toast({
            title: 'Error creating report',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };

    const handleShowReport = () =>{
        setShowReportModal(true)
        setShowReport(false)
    }

    const handleAdRemoval = async (id) => {
        try {
          const response = await axios.delete(`/api/v1/ads/${id}`, {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          });
      
          const json = response.data;
      
          if (!response.status === 200) {
            toast({
              title: json.msg,
              status: 'error',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
          } else {
            fetchRecentJobs();
            toast({
              title: json.msg,
              status: 'success',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
          }
        } catch (error) {
          console.error('Error removing ad:', error);
          toast({
            title: 'Error removing ad',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };

    const handleDownload = (url) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleVisualSubmit = async (id, link) => {
        const data = {
          adID: id,
          link: link,
        };
      
        try {
          const response = await axios.post(
            '/api/v1/promotion/visual',
            data,
            {
              headers: {
                Authorization: `Bearer ${token.current}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          const json = response.data;
      
          if (!response.status === 200) {
            toast({
              title: json.msg,
              status: 'error',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
            setInputValue('');
          } else {
            toast({
              title: 'Link Submitted',
              status: 'success',
              duration: '5000',
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
            setInputValue('');
          }
        } catch (error) {
          console.error('Error submitting visual link:', error);
          toast({
            title: 'Error submitting visual link',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };

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
                {recentJobs.length === 0 && !isLoading ?(
                    <p>Your recent adverts will appear here</p>
                ):(
                    <>
                        {recentJobs.map((item) => (
                            <Feed bg={item.type === 'direct-link' ? '#0594FB': item.type === 'detail' ? 'var(--yellow)':'var(--green)'} key={item.id}>
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
                                            <></>
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
                                    <div className='submit-image-container'>                                    
                                        <div className="product-img-container">
                                            <div className='carousel-container'>
                                                {item.images.length > 1 &&(
                                                    <div onClick={goToPrevious} className='left-arrow' style={{width: '20px'}}>
                                                        <BsFillArrowLeftCircleFill />
                                                    </div>
                                                )}
                                                <div className='img-container' style={{borderRadius:'36px'}}>
                                                    <Image src={item.images[currentIndex]} alt='product' width={360} height={236}/>
                                                </div>
                                                {item.images.length > 1 &&(
                                                    <div onClick={goToNext} className='right-arrow' style={{width: '20px'}}>
                                                        <BsFillArrowRightCircleFill />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
        
                                        {item.type === 'visual'&&(
                                            <div className='submit' ref={ref}>
                                                {showSubmit && <button className='btn' onClick={togglePaste}>Submit</button>}
                                                {showPaste && (
                                                    <form className='paste' onSubmit={(e)=>e.preventDefault()}>
                                                        <div className='pasteLink'>
                                                            <Image src={linkFrame} alt=""/>
                                                        </div>
                                                        <input 
                                                            type="text"
                                                            id="inputValue"
                                                            name="inputValue"
                                                            onChange={(e)=>setInputValue(e.target.value)}
                                                            value={inputValue}
                                                        />
                                                        <button onClick={() => handleVisualSubmit(item.id,inputValue)} className='pasteButton'>
                                                            Submit
                                                        </button>
                                                        
                                                    </form>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="bottom">
                                    <div className="user-details">
                                        <div className="user-details-text">
                                            {item.creator?.profilePicture?(
                                                <Image src={item.creator?.profilePicture} width={20} height={20} alt={item.creator.accountName}/>
                                            ):(
                                                <CgProfile width={20} height={20}/>
                                            )}
                                            <h5>{item.creator?.accountName}</h5>
                                        </div>
                                        <p>Posted <TimeAgo dateTime={item.dateCreated}/></p>
                                    </div>
                                    <div className="share-container">
                                        {item.type === 'visual' ? (
                                            <div className='icons' onClick={() => handleDownload(item.images)}>
                                                <Image src={download} alt=""/>
                                            </div>
                                        ):(
                                            <div className='icons' onClick={()=>handleCopyLink(item.id)}>
                                                <Image src={copyLink} alt=""/>
                                            </div>
                                        )}

                                        {item.type !== 'visual' && (
                                          <div className='icons' onClick={()=>handleOpenDialogue(item.id)}>
                                              <Image src={exportLink} alt=""/>
                                          </div>
                                        )}
                                        <div className='icons' onClick={()=>handleJobSave(item.id)}>
                                            <Image src={archive} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                {showDialogue[item.id] && <ShareDialogue id={item.id}  />}
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
                                            <div onClick={()=>handleReport(item.id,listValue)} className='reportButton'>
                                                <button>{isReportLoading ? 'Reporting..' : 'Send Report'}</button>
                                            </div>
                                        </ModalContainer>
                                    </BackdropContainer>
                                )}

                            </Feed>
                        ))}
                        
                    </>
                )} 
            </>
        )} 
    </>
  )
}

export default MobileRecentPromoters;
