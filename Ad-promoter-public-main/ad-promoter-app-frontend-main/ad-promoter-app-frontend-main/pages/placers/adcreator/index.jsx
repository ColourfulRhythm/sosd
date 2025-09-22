import { MobileCreator, ModalBackground, StyledCreator, TopStyledCreator } from "@/styles/placersCreator.styles"
import userTag from '@/public/assets/user-tag.svg'
import Image from "next/image"
import send from '@/public/assets/send-2.svg'
import cup from '@/public/assets/cup-2.svg'
import refresh from '@/public/assets/refresh-2.svg'
import money from '@/public/assets/money-send.svg'
import statusIcon from '@/public/assets/status.svg'
import { useContext, useEffect, useRef, useState } from "react"
import link from '@/public/assets/link-2.svg'
import document from '@/public/assets/document-text.svg'
import video from '@/public/assets/video.svg'
import ArrowRight from "@/public/assets/arrow-right"
import CloseCircle from "@/public/assets/close-circle"
import { useRouter } from "next/router"
import AdPlacerContext from "@/context/adPlacerContext"
import { Spinner, useToast } from "@chakra-ui/react"
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import SingleAdContext from "@/context/singleAdContext"
import { getThirtyDaysAgoRange, getTwoWeeksAgoRange, getWeekAgoRange } from "@/utils/formatFilterDate"
import AdCreatorEmptyScreen from "@/components/adCreatorEmptyScreen"
import axios from "@/pages/api/axios"

const Adcreator = () => {
  const [toPlace,setToPlace] = useState(false)
  const router = useRouter()
  const token = useRef('')
  const id = useRef('')
  const {setAdvertType} = useContext(AdPlacerContext)
  const [activeAds, setActiveAds] = useState()
  const [isLoading,setIsLoading] = useState(false)
  const [clickedFilter,setClickedFilter] = useState('Filter')
  const [showDropdown, setShowDropdown] = useState(false)
  const {setAdData} = useContext(SingleAdContext)
  const [dashboardStartDate,setDashboardStartDate] = useState('')
  const [dashboardEndDate,setDashboardEndDate] = useState('')
  const toast = useToast()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user-detail"));
    const userToken = JSON.parse(localStorage.getItem("user-token"));
    if (user) {
    token.current = userToken
    id.current = user._id
    }

    const fetchActiveAds = async () => {
      let apiUrl = `/api/v1/ads/all/user-ads/${id.current}?active=true`;
    
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
    
        setActiveAds(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast({
          title: 'An Error occured while fetching active Ad',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      }
    };

    if(id.current){
      fetchActiveAds()
    }
  },[dashboardEndDate, dashboardStartDate, id, toast, token])

  const handleSetAdId = async (id, ref) => {
    try {
      const response = await axios.get(`https://api.ad-promoter.com/api/v1/ads/${id}`);
      const data = response.data.data;
      setAdData(data);
  
      router.push({
        pathname: `/placers/adcreator/${id}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'An Error occured while fetching Ad details',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
  };
  

  const openModal = () =>{
    setToPlace(true)
  }
  const closeModal = () =>{
    setToPlace(false)
  }

  const handleFilterText = (e) =>{
    setClickedFilter(e.target.innerText)
    if(e.target.innerText === 'Recent'){
      setDashboardStartDate('')
      setDashboardEndDate('')
    }
    if(e.target.innerText === 'A week ago'){
      const { startOfWeek, endOfWeek } = getWeekAgoRange();
      setDashboardStartDate(startOfWeek)
      setDashboardEndDate(endOfWeek)
    }
    if(e.target.innerText === 'Less than 2 weeks'){
      const { startOfWeek, endOfWeek } = getTwoWeeksAgoRange();
      setDashboardStartDate(startOfWeek)
      setDashboardEndDate(endOfWeek)
    }
    if(e.target.innerText === 'Last 30 days'){
      const { startOfWeek, endOfWeek } = getThirtyDaysAgoRange();
      setDashboardStartDate(startOfWeek)
      setDashboardEndDate(endOfWeek)
    }
    setShowDropdown(false)
  }

  return (
    <TopStyledCreator>
      <StyledCreator>
        <div className="creator-head">
          <h3>Active Ads - ({activeAds ? activeAds.length : 0})</h3>
          <div onClick={() => setShowDropdown(!showDropdown)} className='filter'>
            <div>{clickedFilter}</div>
            {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
          </div>
          {showDropdown && (
            <ul>
              <li onClick={handleFilterText}>Recent</li>
              <li onClick={handleFilterText}>A week ago</li>
              <li onClick={handleFilterText}>Less than 2 weeks</li>
              <li onClick={handleFilterText}>Last 30 days</li>
            </ul>
          )}
        </div>
        {!activeAds || isLoading ? (
          <div className="spinner">
            <Spinner 
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#4F00CF'
            size='xl'/>
          </div>
        ):(
          <>        
            {activeAds.length > 0 ? (
              <div className="creator-body">
                {[...activeAds].reverse().map(({productName,type,target,achieved,price,adStatus,bg,id,conversions,paymentRef})=>(
                  <div className="item" key={id}>
                    <div className="item-details">
                      <div className="product-name">
                        <div>
                          <Image src={userTag} alt='user tag'/>
                          <p>Product Name</p>
                        </div>
                        <p>{productName}</p>
                      </div>
      
                      <div className="ad-type">
                        <div>
                          <Image src={send} alt='send'/>
                          <p>Advert Type</p>
                        </div>
                        <p>{type + ' ad'}</p>
                      </div>
      
                      <div className="aim">
                        <div>
                          {/* <Cup /> */}
                          <Image src={cup} alt='cup'/>
                          <p>Aim</p>
                        </div>
                        {type === 'detail' ? (
                          <p>{target} Conversions</p>
                        ): type === 'direct-link'? (
                          <p>{target} Visitors</p>
                        ):(
                          <p>{target} Videos</p>
                        )}
                      </div>
      
                      <div className="achieved">
                        <div>
                          <Image src={refresh} alt='achieved icon'/>
                          <p>Achieved</p>
                        </div>
                        <p>{achieved}</p>
                      </div>
      
                      <div className="price">
                        <div>
                          <Image src={money} alt='money'/>
                          <p>Price</p>
                        </div>
                        {type === 'detail' ? (
                          <p>₦50/Conversion</p>
                        ): type === 'direct-link'? (
                          <p>₦25/Visitor</p>
                        ):(
                          <p>₦5,000/Video</p>
                        )}
                      </div>
      
                      <div className="status">
                        <div>
                          <Image src={statusIcon} alt='status'/>
                          <p>Status</p>
                        </div>
                        <p className='status-text' style={adStatus === 'incomplete' ? {backgroundColor:'#ED9005'} : adStatus === 'completed' ? {backgroundColor:'#00B068'}: adStatus === 'paused' ? {backgroundColor: '#EB1E1E'}:{backgroundColor: '#5C85FF'}}>{adStatus}</p>
                      </div>
      
                    </div>
                    <div onClick={() => handleSetAdId(id,paymentRef)} className="cta">View</div>
                  </div>
                ))}
              </div>
            ):(
                <AdCreatorEmptyScreen />
              )
            }
          </>
        )}
      <div className="creator-btn" onClick={openModal}>Place new Advert</div>
        
      

      {toPlace && (
        <ModalBackground>
          <div className="modal">
            <div onClick={closeModal} className='close-btn'>
              <CloseCircle />
            </div>
            <div className="modal-head">
              <h3>What type of Advert would you like to place?</h3>
              <p>Select one to continue.</p>
            </div>
            <div className="modal-body">
              <div className="ad-type" onClick={()=>{router.push('/placers/adcreator/directlink'),setAdvertType('direct-link')}}>
                <Image src={link} alt='link'/>
                <div className="vertical"></div>
                <div className="ad-type-name">
                  <div className="ad-type-name-text">
                    <h5>Directlink Ad</h5>
                    <p>Get Web Visitors</p>
                  </div>
                  <ArrowRight />
                </div>
              </div>

              <div className="ad-type" onClick={()=>{router.push('/placers/adcreator/detailsad'),setAdvertType('detail')}}>
                <Image src={document} alt='link'/>
                <div className="vertical"></div>
                <div className="ad-type-name">
                  <div className="ad-type-name-text">
                    <h5>Details Ad</h5>
                    <p>Get Buyers to patronize your business</p>
                  </div>
                  <ArrowRight />
                </div>
              </div>

              <div className="ad-type" onClick={()=>{router.push('/placers/adcreator/visualad'),setAdvertType('visual')}}>
                <Image src={video} alt='link'/>
                <div className="vertical"></div>
                <div className="ad-type-name">
                  <div className="ad-type-name-text">
                    <h5>Visual Ad</h5>
                    <p>Get Instagram And Tiktok Publicity</p>
                  </div>
                  <ArrowRight />
                </div>
              </div>
              
            </div>
          </div>
        </ModalBackground>
      )}
    </StyledCreator>
    <MobileCreator>
      <h4>Active Ads - ({activeAds ? activeAds.length : 0})</h4>
        <div className="">
          {!activeAds || isLoading ? (
            <div className="spinner">
              <Spinner 
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#4F00CF'
              size='xl'/>
            </div>
          ):(
          <>
            {activeAds.length > 0 ? (
              <div className="body">
                {[...activeAds].reverse().map(({productName,type,target,achieved,price,adStatus,bg,id,conversions,paymentRef})=>(
                  <div key={id} className="creator">
                    <div className="product">
                      <h3>{productName}</h3>
                      <p style={adStatus === 'incomplete' ? {backgroundColor:'#ED9005'} : adStatus === 'completed' ? {backgroundColor:'#00B068'}: adStatus === 'paused' ? {backgroundColor: '#EB1E1E'}:{backgroundColor: '#5C85FF'}}>{adStatus}</p>
                    </div>
                    <div className="types">
                      <div className="type">
                        <div className="icon">
                          <Image src={money} alt="money"/>
                          <p>Price</p>
                        </div>
                        {type === 'detail' ? (
                          <h4>₦50/Visitor</h4>
                        ): type === 'direct-link'? (
                          <h4>₦25/Visitor</h4>
                        ):(
                          <h4>₦5,000/Video</h4>
                        )}
                      </div>
                      <div className="type">
                        <div className="icon">
                          <Image src={cup} alt="money"/>
                          <p>Aim</p>
                        </div>
                        {type === 'detail' ? (
                          <h4>{target} Conversions</h4>
                        ): type === 'direct-link'? (
                          <h4>{target} Visitors</h4>
                        ):(
                          <h4>{target} Videos</h4>
                        )}
                      </div>
                      <div className="type">
                        <div className="icon">
                          <Image src={refresh} alt="money"/>
                          <p>Achieved</p>
                        </div>
                        <h4>{achieved}</h4>
                      </div>
                      <div className="type">
                        <div className="icon">
                          <Image src={send} alt="money"/>
                          <p>Advert Type</p>
                        </div>
                        <h4>{type}</h4>
                      </div>
                    </div>
                    <div onClick={() => handleSetAdId(id,paymentRef)} className="view">
                      View
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <AdCreatorEmptyScreen />
            )}        
          </>
        )}
        <div className="creator-btn" onClick={openModal}>Place new Advert</div>
        </div>
      
      {toPlace && (
        <ModalBackground>
          <div className="modal">
            <div onClick={()=>setToPlace(!toPlace)} className='close-btn'>
              <CloseCircle />
            </div>
            <div className="modal-head">
              <h3>What type of Advert would you like to place?</h3>
              <p>Select one to continue.</p>
            </div>
            <div className="modal-body">
              <div className="ad-type" onClick={()=>{router.push('/placers/adcreator/directlink'),setAdvertType('direct-link')}}>
                <Image src={link} alt='link'/>
                <div className="vertical"></div>
                <div className="ad-type-name">
                  <div className="ad-type-name-text">
                    <h5>Directlink Ad</h5>
                    <p>Get Web Visitors</p>
                  </div>
                  <ArrowRight />
                </div>
              </div>

              <div className="ad-type" onClick={()=>{router.push('/placers/adcreator/detailsad'),setAdvertType('detail')}}>
                <Image src={document} alt='link'/>
                <div className="vertical"></div>
                <div className="ad-type-name">
                  <div className="ad-type-name-text">
                    <h5>Details Ad</h5>
                    <p>Get Buyers to patronize your business</p>
                  </div>
                  <ArrowRight />
                </div>
              </div>

              <div className="ad-type" onClick={()=>{router.push('/placers/adcreator/visualad'),setAdvertType('visual')}}>
                <Image src={video} alt='link'/>
                <div className="vertical"></div>
                <div className="ad-type-name">
                  <div className="ad-type-name-text">
                    <h5>Visual Ad</h5>
                    <p>Get Instagram And Tiktok Publicity</p>
                  </div>
                  <ArrowRight />
                </div>
              </div>
              
            </div>
          </div>
        </ModalBackground>
      )}
    </MobileCreator>
    </TopStyledCreator>
  )
}

export default Adcreator