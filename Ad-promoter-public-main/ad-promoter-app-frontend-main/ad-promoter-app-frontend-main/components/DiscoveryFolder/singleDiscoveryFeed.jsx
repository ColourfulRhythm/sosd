/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import more from '@/public/assets/ellipsis.svg'
import vector from '@/public/assets/Vector.svg'
import cup from '@/public/assets/cupIcon.svg'
import currency from '@/public/assets/money-send.svg'
import download from '@/public/assets/downloadIcon3.svg'
import exportLink from '@/public/assets/shareIcon1.svg'
import archive from '@/public/assets/bookmarkIcon1.svg'
import copyLink from '@/public/assets/bottom-link-icon.svg'
import { Feed } from './discovery.style'
import Image from 'next/image'
import TimeAgo from '../timeAgo'
import { CgProfile } from 'react-icons/cg'
import linkFrame from '@/public/assets/linkframe.svg'
import { Spinner, useToast } from '@chakra-ui/react'
import ShareDialogue from '../shareDialogue'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import { BackdropContainer, ModalContainer } from '../PromoterHomeAdDetail/styles'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { id } from 'date-fns/locale'
import axios from '@/pages/api/axios'

const SingleDiscoveryFeed = ({isLoading,feed,fetchFeed}) => {
    const [showReport, setShowReport] = useState({})
    const [showDropdown, setShowDropdown] = useState(false)
    const [showPaste, setShowPaste] = useState(false)
    const [showSubmit, setShowSubmit] = useState(true)
    const [inputValue, setInputValue] = useState('');
    const [isReportLoading, setIsReportLoading] = useState(null);
    const ref = useRef(null)
    const [isReadMore, setIsReadMore] = useState(true);
    const token = useRef('')
    const toast = useToast()
    const [currentIndex,setCurrentIndex] = useState(0)
    const [showDialogue, setShowDialogue] = useState({});
    const [showReportModal,setShowReportModal] = useState(false)
    const [listValue, setListValue] = useState('It has gory images')

    useEffect(()=>{
        const userToken = JSON.parse(localStorage.getItem("user-token"));
        if (userToken) {
            token.current = userToken
        }
    },[])

    useEffect(() => {
        // Function to send data to the API endpoint
        const sendDataToEndpoint = () => {
            const storedTags = localStorage.getItem('adTags');
            if (!storedTags) {
              return;
            }
          
            // Perform your API request here to send the data to the endpoint
            axios.post('https://api.ad-promoter.com/api/v1/user/tags', storedTags, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                // Handle the response data from the endpoint
                console.log(response.data);
              })
              .catch((error) => {
                // Handle any errors that occur during the API request
                console.error(error);
              });
          
            // Clear the tags array from local storage
            localStorage.removeItem('adTags');
        };
    
        const interval = setInterval(sendDataToEndpoint, 600000); // Send data every 10 minutes (600,000 milliseconds)
    
        return () => {
          clearInterval(interval);
        };
    }, []);

    // Function to add tags to the local storage
    const addTagsToLocalStorage = (tags) => {
        const storedTags = localStorage.getItem('adTags');
        let tagsArray = [];

        if (storedTags) {
        tagsArray = JSON.parse(storedTags);
        }

        // Remove duplicates by filtering the tags
        const uniqueTags = tags.filter((tag) => !tagsArray.includes(tag));

        // Add new tags to the array
        tagsArray.push(...uniqueTags);

        // Store the updated tags array in local storage
        localStorage.setItem('adTags', JSON.stringify(tagsArray));
    };

    const handleAdInteraction = (tags) => {
        addTagsToLocalStorage(tags);
    };

    const handleOpenDialogue = (itemId) => {
        setShowDialogue((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
 
  const ClickedList = (e) =>{
    setListValue(e.target.innerText)
    setShowDropdown(false)
  }

    const handleAdRemoval = async (id) => {
        try {
        const response = await axios.delete(`/api/v1/ads/${id}`, {
            headers: {
            Authorization: `Bearer ${token.current}`,
            },
        });
    
        const json = response.data;
    
        if (response.status === 201) {
            fetchFeed();
            toast({
            title: json.msg,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
            });
        } else {
            toast({
            title: json.msg,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
            });
        }
        } catch (error) {
            console.error(error);
            toast({
                title: 'An error occured',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
                size: 'lg',
            });
        }
    };

    const handleReport = async (id, report) => {
        setIsReportLoading(true);
      
        try {
          const response = await axios.post(
            '/api/v1/reports/create',
            {
              adsId: id,
              report: report,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.current}`,
              },
            }
          );
      
          const json = response.data;
      
          if (response.status === 201) {
            setIsReportLoading(false);
            setShowReportModal(false);
            toast({
              title: json.msg,
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
          } else {
            setIsReportLoading(false);
            setShowReportModal(false);
            toast({
              title: json.msg,
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
          }
        } catch (error) {
          console.error(error);
          toast({
            title: 'Something went wrong',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };


    const handleJobSave = async (id) => {
        try {
          const response = await axios.put(`/api/v1/user/save-job/${id}`, null, {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          });
      
          const result = response.data;
      
          toast({
            title: result.data,
            status: result.success ? 'success' : 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        } catch (error) {
          console.error(error);
          toast({
            title: 'Something went wrong',
            status: 'error',
            duration: '5000',
            isClosable: true,
            position: 'bottom-left',
            size: 'lg',
          });
        }
    };

    const handleCopyLink = async (id) => {
        try {
          const response = await axios.get(`/api/v1/promotion/promote/${id}`, {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          });
      
          const data = response.data;
      
          if (!response.status === 201) {
            throw new Error(data.msg);
          }
      
          if (response.status === 201) {
            const linkToCopy = `https://app.ad-promoter.com/ad/${id}?ref=${data.promotionRef}`;
      
            navigator.clipboard.writeText(linkToCopy)
              .then(() => {
                toast({
                  title: 'Link copied to clipboard!',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                  position: 'bottom-left',
                  size: 'lg',
                });
              })
              .catch((error) => {
                console.error('Failed to copy link:', error);
                toast({
                  title: `Failed to copy link: ${error}`,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position: 'bottom-left',
                  size: 'lg',
                });
              });
          }
        } catch (error) {
          console.error('Error fetching ad data:', error);
          toast({
            title: 'Something went wrong', // Display the error message
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
    };

    const handleShowPaste = () => {
        setShowSubmit(false)
        setShowPaste(true)
    }

    const goToPrevious = () =>{
        feed.map(({images})=>{
            currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(images.length -1)
        })
    }

    const goToNext = () =>{
        feed.map(({images})=>{
            currentIndex <  images.length -1 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0) 
        })
    }

    const handleShowReport = () =>{
        setShowReportModal(true)
        setShowReport(false)
    }

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

    const handleDownload = (url) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.jpg'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const nextImage = (images) => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const previousImage = (images) => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleVisualSubmit = async (id, link) => {
        const data = {
          adID: id,
          link: link,
        };
      
        try {
          const response = await axios.post('/api/v1/promotion/visual', data, {
            headers: {
              Authorization: `Bearer ${token.current}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 201) {
            toast({
              title: 'Link Submitted',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
            setInputValue('');
          } else {
            const json = response.data;
            toast({
              title: json.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'bottom-left',
              size: 'lg',
            });
            setInputValue('');
          }
        } catch (error) {
          console.error('Error submitting visual data:', error);
          if(error.response?.status === 403){
            toast({
                title: "You're not allowed to promote the same advert twice",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
                size: 'lg',
            });
            }else{
                toast({
                title: 'Error submitting visual data',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
                size: 'lg',
                });
            }
        }
    };
  return (   
            <>
                {feed.length && !isLoading === 0 ?(
                    <p>Your feed will appear here</p>
                ):(
                    <>
                        {[...feed].reverse().map((item) => (
                            <Feed bg={item.type === 'direct-link' ? '#0594FB': item.type === 'detail' ? 'var(--yellow)':'var(--green)'} key={item.id}>
                            <div className='type'>
                                <div className='more'>
                                    <div className='direct'>{item.type + ' ad'}</div>
                                    <div className='dot' ref={(ref) => assignDropdownRef(item.id, ref)} onClick={() => toggleDropdown(item.id)}>
                                        <div onClick={(e) => handleButtonClick(e, item.id)}>
                                            <Image src={more} alt="more"/>
                                        </div>
                                        {showReport[item.id] && (
                                            <ul>
                                                <li onClick={handleShowReport}>Report this advert</li>
                                                <li onClick={()=>handleAdRemoval(item.id)}>Remove from feed</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                
                                <div className='adlink'>
                                    <div>
                                        <h3 style={{fontWeight: '600', fontSize: '1.6rem',color: '#2C2828'}}>{item.productName}</h3>
                                        <div className='profile'>
                                            <p>Tags:</p>
                                            {item.tags.map((tag, index) => (
                                                <div key={index} className='tag'>{tag}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='product'>
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
                                <div className='desc'>
                                    <div>
                                        <div className='aim'>
                                            <Image src={currency} alt="currency"/>
                                            <p>Price</p>
                                        </div>
                                        {item.type === 'detail' ? (
                                            <p>₦50/Conversion</p>
                                        ): item.type === 'direct-link'? (
                                            <p>₦25/Visitor</p>
                                        ):(
                                            <p>₦5,000/Video</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className='aim'>
                                            <Image src={cup} alt="cup"/>
                                            <p>Aim</p>
                                        </div>
                                        {item.type === 'detail' ? (
                                            <p>{item.target} Conversions</p>
                                        ): item.type === 'direct-link'? (
                                            <p>{item.target} Visitors</p>
                                        ):(
                                            <p>{item.target} Videos</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className='aim'>
                                            <Image src={vector} alt="vector"/>
                                            <p>Achieved</p>
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
                                    <>
                                        <div className="product-img-container">
                                            <div className='carousel-container'>
                                                {item.images.length > 1 &&(
                                                    <div onClick={() => previousImage(item.images)} className='left-arrow' style={{width: '20px'}}>
                                                        < BsFillArrowLeftCircleFill />
                                                    </div>
                                                )}
                                                <div className='img-container' style={{borderRadius:'36px'}}>
                                                    <Image src={item.images[currentIndex]} alt='product' width={360} height={236}/>
                                                </div>
                                                {item.images.length > 1 &&(
                                                    <div onClick={() => nextImage(item.images)} className='right-arrow' style={{width: '20px'}}>
                                                        <BsFillArrowRightCircleFill />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {item.type === 'visual'&&(
                                            <div className='submit' ref={ref}>
                                                {showSubmit && <button onClick={handleShowPaste}>Submit</button>}
                                                {showPaste && (
                                                    <form className='paste' onSubmit={(e)=>e.preventDefault()}>
                                                        <div className='pasteLink'>
                                                            <Image src={linkFrame} alt=""/>
                                                        </div>

                                                        <button onClick={() => handleVisualSubmit(item.id,inputValue)} className='pasteButton'>
                                                            Submit
                                                        </button>
                                                        <input 
                                                            type="text"
                                                            id="inputValue"
                                                            name="inputValue"
                                                            onChange={handleChange}
                                                            value={inputValue}
                                                        />
                                                    </form>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className='time'>
                                    <div>
                                        <div className='user'>
                                            {item.creator?.profilePicture?(
                                                <Image src={item.creator?.profilePicture} width={20} height={20} alt={item.creator.accountName}/>
                                            ):(
                                                <CgProfile width={20} height={20}/>
                                            )}
                                            <div>{item.creator?.accountName}</div>
                                        </div>
                                        <p>Posted <TimeAgo dateTime={item.dateCreated}/></p>
                                    </div>
                                    <div className='post'>
                                        {item.type === 'visual' ? (
                                            <div className='icons' onClick={() =>{ handleDownload(item.images); handleAdInteraction(item.tags)}}>
                                                <Image src={download} alt=""/>
                                            </div>
                                        ):(
                                            <div className='icons' onClick={()=>{handleCopyLink(item.id); handleAdInteraction(item.tags)}}>
                                                <Image src={copyLink} alt=""/>
                                            </div>
                                        )}
                                        <div className='icons' onClick={()=>{handleOpenDialogue(item.id); handleAdInteraction(item.tags)}}>
                                            <Image src={exportLink} alt=""/>
                                        </div>
                                        <div className='icons' onClick={()=>{handleJobSave(item.id); handleAdInteraction(item.tags)}}>
                                            <Image src={archive} alt=""/>
                                        </div>
                                    </div>
                                </div>      
                            </div>
                            {showDialogue[item.id] && <ShareDialogue id={item.id} />}
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
                {isLoading && <Spinner 
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#4F00CF'
            size='xl'/>
        }
            </>
  )
}

export default SingleDiscoveryFeed
