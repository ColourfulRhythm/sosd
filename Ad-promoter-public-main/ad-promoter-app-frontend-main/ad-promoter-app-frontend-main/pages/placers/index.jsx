/* eslint-disable react-hooks/exhaustive-deps */
import {
  DashboardContainer,
  DashboardSummaryContainer,
  MobilePlacers,
  StyledHome,
  TabPlacers,
} from '@/styles/placerHome.styles';
import RecentMobile from '@/components/MobilePromoterHome/Recent';
import MobileNotif from '@/components/MobileNotification/index';
import notif from '@/public/assets/notif.svg';
import inactiveNotif from '@/public/assets/Inactive notification Icon.svg';
import Image from 'next/image';
import hands from '@/public/assets/hands.svg';
import Placers from '@/public/assets/placers-frame';
import Placer from '@/public/assets/placers-frame.svg';
import Flash from '@/public/assets/flash';
import Cup from '@/public/assets/cup';
import DefaultPic from '@/public/assets/squared-profile.png'
import cup from '@/public/assets/cupIcon.svg';
import Trend from '@/public/assets/trending-up';
import ArrowDown from '@/public/assets/arrow-down';
import { StyledHomeContainer, TabContainer } from '@/styles/promoters/home';
import { useEffect, useRef, useState, useContext, useMemo } from 'react';
import ArrowUp from '@/public/assets/arrow-up';
import useDraggableScroll from 'use-draggable-scroll';
import more from '@/public/assets/ellipsis.svg';
import {
  BackdropContainer,
  Feed,
  ModalContainer,
} from '@/components/PromoterHomeAdDetail/styles';
import currency from '@/public/assets/money-send.svg';
import vector from '@/public/assets/Vector.svg';
import arrowUp from '@/public/assets/arrow-up.svg';
import arrowDown from '@/public/assets/arrow-down.svg';
import bell from '@/public/assets/notif.svg';
import ScrollIntoView from 'react-scroll-into-view';
import TimeAgo from '@/components/timeAgo';
import { useRouter } from 'next/router';
import { Spinner, useToast } from '@chakra-ui/react';
import {
  getThirtyDaysAgoRange,
  getTwoWeeksAgoRange,
  getWeekAgoRange,
} from '@/utils/formatFilterDate';
import JobsContext from '@/context/jobsContext';
import dynamic from 'next/dynamic';
import PlacersChart from '@/components/placersChart';
import axios from '../api/axios';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

const Index = () => {  
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showRecentJobs, setShowRecentJobs] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [listValue, setListValue] = useState('It has gory images');
  const [userName, setUserName] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const token = useRef('');
  const ref = useRef(null);
  const [runningAds, setRunningAds] = useState('');
  const [completeAds, setCompleteAds] = useState('');
  const [conversionGrowth, setConversionGrowth] = useState('');
  const Router = useRouter();
  const [isReportLoading, setIsReportLoading] = useState(null);
  const [ setClickedFilter] = useState('Sort');
  const toast = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dashboardStartDate, setDashboardStartDate] = useState('');
  const [dashboardEndDate, setDashboardEndDate] = useState('');
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const {recentJobs,setRecentJobs,isLoading,setIsLoading} = useContext(JobsContext)
  const scrollRef = useRef(null);
  const { onMouseDown } = useDraggableScroll(scrollRef, { direction: 'vertical' });
  const axiosPrivate = useAxiosPrivate()
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-detail'));
    if(!user?.profilePicture || user?.profilePicture === ''){
      setProfileImage('')
    }else{
      setProfileImage(user.profilePicture);
    }
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    if (user && userToken && user.role === 'placer') {
      setUserName(user.accountName);
      token.current = userToken;
    }

    if (token.current) {
      fetchDashboardData()
      fetchRecentJobs();
    }

  }, [Router, token,dashboardEndDate, dashboardStartDate]);

  const fetchDashboardData = async() =>{
    const controller = new AbortController()
    try {
      const response = await axios.get('/api/v1/user/dashboard', {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
    
      const dashboardData = response.data;
      console.log(dashboardData);
      setRunningAds(dashboardData.data.adCount.runningAds);
      setCompleteAds(dashboardData.data.adCount.completedAds);
      setConversionGrowth(dashboardData.data.conversionRate+'%');
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }   
  }

  const fetchRecentJobs = async () => {
    let apiUrl = `/api/v1/ads/recent-ads?page=1&pageSize=10`;

    if (dashboardStartDate) {
      apiUrl += `&startDate=${dashboardStartDate}`;
    }

    if (dashboardEndDate) {
      apiUrl += `&endDate=${dashboardEndDate}`;
    }

    setIsLoading(true);
    try{
      const result = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
      setRecentJobs(result.data.data.data);
      setIsLoading(false);
    }catch(error){
      setIsLoading(false)
      console.log(error);
      toast({
        title: 'Unable to load data. Check your connection',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const ClickedList = (e) => {
    setListValue(e.target.innerText);
    setShowDropdown(false);
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
  
      setIsReportLoading(false);
      setShowReportModal(false);
  
      if (response.status === 200) {
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
      setIsReportLoading(false);
      setShowReportModal(false);
  
      toast({
        title: 'An error occurred while processing the report',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
  };

  const handleShowReport = () => {
    setShowReportModal(true);
    setShowReport(false);
  };

  const handleClickedFilter = (e) => {
    setClickedFilter(e.target.innerText);

    if (e.target.innerText === 'Recent') {
      setDashboardStartDate('');
      setDashboardEndDate('');
    }
    if (e.target.innerText === 'A week ago') {
      const { startOfWeek, endOfWeek } = getWeekAgoRange();
      setDashboardStartDate(startOfWeek);
      setDashboardEndDate(endOfWeek);
    }
    if (e.target.innerText === 'Less than 2 weeks') {
      const { startOfWeek, endOfWeek } = getTwoWeeksAgoRange();
      setDashboardStartDate(startOfWeek);
      setDashboardEndDate(endOfWeek);
    }
    if (e.target.innerText === 'Last 30 days') {
      const { startOfWeek, endOfWeek } = getThirtyDaysAgoRange();
      setDashboardStartDate(startOfWeek);
      setDashboardEndDate(endOfWeek);
    }

    setShowSortDropdown(false);
  };

  const handleAdRemoval = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/ads/${id}`, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
  
      const json = response.data;
  
      if (response.status === 200) {
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
        title: 'An error occurred while removing the ad',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
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

  const summary = [
    {
      Icon: Flash,
      name: 'Running Ads',
      num: runningAds,
      bg: '#D2EFFF',
    },
    {
      Icon: Cup,
      name: 'Complete',
      num: completeAds,
      bg: '#FFE2C7',
    },
    {
      Icon: Trend,
      name: 'Overall Conv. growth',
      num: conversionGrowth,
      bg: '#FFE2E4',
    },
  ];
  
  return (
        <>
          <StyledHomeContainer>
            <StyledHome>
              <DashboardContainer>
                <div className="welcome">
                  {profileImage === '' ? (
                    <Image
                      src={DefaultPic}
                      width={'145px'}
                      height={'134px'}
                      style={{borderRadius: '16px'}}
                      alt="profile picture"
                    />
                  ):(
                    <Image
                      src={profileImage}
                      width={'145px'}
                      height={'134px'}
                      style={{borderRadius: '16px'}}
                      alt="profile picture"
                    />
                  )}
                 
                  <div className="welcome-text">
                    <h3>Hi, {userName}</h3>
                    <div className="welcome-text-sub">
                      <Image src={hands} alt="waving hands" />
                      <p>Welcome back!</p>
                    </div>

                    <div className="bell">
                      <Image src={bell} alt="notification bell" />
                    </div>
                  </div>
                  <div className="placers-frame">
                    <Placers />
                  </div>
                </div>
                <DashboardSummaryContainer>
                  <div className="header-text">
                    <h3>Dashboard Summary</h3>
                  </div>

                  <div className="dashboard-info">
                    <div className="dashboard-info-board">
                      {summary.map(({ Icon, name, num, bg }) => (
                        <div
                          key={name}
                          className="dashboard-info-board-item"
                          style={{ backgroundColor: bg }}
                        >
                          <div className="dashboard-info-board-item-text">
                            <div className="dashboard-info-board-item-text-icon">
                              <Icon />
                              <h3>{name}</h3>
                            </div>
                            <h2>{num}</h2>
                          </div>
                        </div>
                      ))}
                    </div>
                    <PlacersChart />
                  </div>
                </DashboardSummaryContainer>
              </DashboardContainer>
              <TabContainer>
                <div className="tab-head">
                  <div className="tab-container">
                    <div className="tab">
                      <p>Recent</p>
                      <div className="bottom-dash"></div>
                    </div>
                  </div>

                  <div
                    className="sort-btn"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <p>Sort</p>
                    <div className="arrow">
                      {showSortDropdown ? <ArrowDown /> : <ArrowUp />}
                    </div>
                  </div>
                  {showSortDropdown && (
                    <ul>
                      <li onClick={handleClickedFilter}>Recent</li>
                      <li onClick={handleClickedFilter}>Two days ago</li>
                      <li onClick={handleClickedFilter}>A week ago</li>
                      <li onClick={handleClickedFilter}>Less than 2 weeks</li>
                      <li onClick={handleClickedFilter}>Last 30 days</li>
                    </ul>
                  )}
                </div>
                <>
                  {recentJobs.length === 0 && isLoading ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="#4F00CF"
                      size="xl"
                    />
                  ) : (
                    <>
                      {recentJobs.length === 0 ? (
                        <p>Your recent adverts will appear here</p>
                      ) : (
                        <div ref={scrollRef} onMouseDown={onMouseDown} className="tab-body">
                          {recentJobs.map((item) => (
                            <Feed
                              bg={
                                item.type === 'direct-link'
                                  ? '#0594FB'
                                  : item.type === 'detail'
                                  ? 'var(--yellow)'
                                  : 'var(--green)'
                              }
                              key={item._id}
                            >
                              <div className="product-summary">
                                <div className="product-summary-head">
                                  <div className="ad-type-container">
                                    <div className="adtype">{item.type}</div>
                                    <div
                                      className="dot"
                                      onClick={() => setShowReport(!showReport)}
                                    >
                                      {showReport ? (
                                        <ul ref={ref}>
                                          <li onClick={handleShowReport}>
                                            Report this advert
                                          </li>
                                          <li
                                            onClick={() =>
                                              handleAdRemoval(item.id)
                                            }
                                          >
                                            Remove from feed
                                          </li>
                                        </ul>
                                      ) : (
                                        <Image src={more} alt="more" />
                                      )}
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
                                    {isReadMore
                                      ? item.description.slice(0, 156)
                                      : item.description}
                                    {item.description.length > 156 ? (
                                      <span onClick={toggleReadMore}>
                                        {isReadMore
                                          ? ' Read more'
                                          : ' Show less'}
                                      </span>
                                    ) : (
                                      <p></p>
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="product-plan">
                                <div className="price">
                                  <div className="head">
                                    <Image src={currency} alt="currency" />
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
                                    <Image src={cup} alt="cup" />
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
                                    <Image src={vector} alt="vector" />
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

                              {item.images.length === 0 ? (
                                <></>
                              ) : (
                                <div className="product-img-container">
                                  <div className="carousel-container">
                                    <div
                                      onClick={() => previousImage(item.images)}
                                      className="left-arrow"
                                    >
                                      ❮
                                    </div>
                                    <div className="img-container">
                                      <Image
                                        src={item.images[currentIndex]}
                                        alt="product"
                                        width={360}
                                        height={236}
                                      />
                                    </div>
                                    <div
                                      onClick={() => nextImage(item.images)}
                                      className="right-arrow"
                                    >
                                      ❯
                                    </div>
                                  </div>
                                </div>
                              )}

                              <hr style={{ width: 350 }} />

                              <div className="bottom">
                                <div className="user-details">
                                  <p>
                                    Posted{' '}
                                    <TimeAgo dateTime={item.dateCreated} />
                                  </p>
                                </div>
                              </div>
                              {showReportModal && (
                                <BackdropContainer
                                  onClick={() => setShowReportModal(false)}
                                >
                                  <ModalContainer
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="report">
                                      <p className="advert">Report Advert</p>
                                      <p className="reason">
                                        Tell us why you want to report this
                                        advert?
                                      </p>
                                    </div>
                                    <div className="language">
                                      Why are you reporting this advert
                                    </div>
                                    <div className="input-container">
                                      <div
                                        className="inputArea"
                                        onClick={() =>
                                          setShowDropdown(!showDropdown)
                                        }
                                      >
                                        <div className="inputText">
                                          {listValue}
                                        </div>
                                        {showDropdown ? (
                                          <Image src={arrowDown} alt="" />
                                        ) : (
                                          <Image src={arrowUp} alt="" />
                                        )}
                                      </div>
                                      {showDropdown && (
                                        <ul>
                                          <li onClick={ClickedList}>
                                            It has gory images
                                          </li>
                                          <li onClick={ClickedList}>
                                            It is a scam advert
                                          </li>
                                          <li onClick={ClickedList}>
                                            It has nudity or sexual content
                                          </li>
                                          <li onClick={ClickedList}>
                                            Other reasons
                                          </li>
                                        </ul>
                                      )}
                                    </div>
                                    <div
                                      onClick={() =>
                                        handleReport(item.id, listValue)
                                      }
                                      className="reportButton"
                                    >
                                      <button>
                                        {isReportLoading
                                          ? 'Reporting..'
                                          : 'Send Report'}
                                      </button>
                                    </div>
                                  </ModalContainer>
                                </BackdropContainer>
                              )}
                            </Feed>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              </TabContainer>
            </StyledHome>
          </StyledHomeContainer>
          <MobilePlacers>
            {showNotif ? (
              <MobileNotif setHasNewNotification={setHasNewNotification} goBack={() => setShowNotif(false)} />
            ) : (
              <>
                <div className="welcome">
                  <div className="userProfile">
                  <div style={{ width: '52px', height: '52px' }}>
                    {profileImage === '' ? (
                      <Image
                        src={DefaultPic}
                        alt="profile picture"
                        width={'100%'}
                        height={'100%'}
                        style={{objectFit: 'fill', borderRadius: '100px' }}
                      />
                    ):(
                      <Image
                        src={profileImage}
                        alt="profile picture"
                        width={'100%'}
                        height={'100%'}
                        style={{objectFit: 'fill', borderRadius: '100px' }}
                      />
                    )}
                  </div>
                    <div className="username">
                      <p>Hi, {userName}</p>
                      <div className="wave">
                        <Image src={hands} alt="hands waving" />
                        <p className="greeting">Welcome back!</p>
                      </div>
                    </div>
                  </div>
                  <div className="promo">
                    {hasNewNotification ? (
                      <Image
                        src={notif}
                        alt="notification"
                        onClick={() => setShowNotif(true)}
                      />
                    ):(
                      <Image
                        src={inactiveNotif}
                        alt="notification"
                        onClick={() => setShowNotif(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="dashboard-container">
                  <h2>Dashboard Summary</h2>
                  <div className="dashboard">
                    {summary.map(({ Icon, name, num, bg }) => (
                      <div
                        key={name}
                        className="info"
                        style={{ backgroundColor: bg }}
                      >
                        <div className="amount">
                          <Icon />
                          <h3>{name}</h3>
                          <p>{num}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <PlacersChart />
                
                {!isLoading && recentJobs.length!==0 && (
                  <>                
                    <div className="sort">
                      <div className="tabs">
                        <ScrollIntoView selector="#inView" className="tab-sort">
                          <div
                            className={showRecentJobs ? 'active-job' : 'non-active'}
                            onClick={() => setShowRecentJobs(true)}
                          >
                            Recent
                          </div>
                        </ScrollIntoView>
                      </div>
                      <div
                        className="arrow-sort"
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                      >
                        <p>Sort</p>
                        {showSortDropdown ? <ArrowUp /> : <ArrowDown />}
                      </div>
                      {showSortDropdown && (
                        <ul className="list">
                          <li onClick={handleClickedFilter}>Recent</li>
                          <li onClick={handleClickedFilter}>Two days ago</li>
                          <li onClick={handleClickedFilter}>A week ago</li>
                          <li onClick={handleClickedFilter}>Less than 2 weeks</li>
                          <li onClick={handleClickedFilter}>Last 30 days</li>
                        </ul>
                      )}
                    </div>
                    
                    <RecentMobile
                      dashboardStartDate={dashboardStartDate}
                      dashboardEndDate={dashboardEndDate}
                      handleShowReport={handleShowReport}
                      handleAdRemoval={handleAdRemoval}
                      showReport={showReport}
                      setShowReport={setShowReport}
                      showReportModal={showReportModal}
                      setShowReportModal={setShowReportModal}
                      showDropdown={showDropdown}
                      setShowDropdown={setShowDropdown}
                      isReadMore={isReadMore}
                      setIsReadMore={setIsReadMore}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                      listValue={listValue}
                      setListValue={setListValue}
                      ClickedList={ClickedList}
                      toggleReadMore={toggleReadMore}
                      previousImage={previousImage}
                      nextImage={nextImage}
                    />
                  </>
                )}
              </>
            )}
          </MobilePlacers>
          <TabPlacers>
            <div className="welcome">
              <div className="userProfile">
                <div className="profile-img" style={{ borderRadius: '45%' }}>
                  {profileImage === '' ? (
                    <Image
                      src={DefaultPic}
                      width={'145px'}
                      height={'134px'}
                      style={{borderRadius: '16px'}}
                      alt="profile picture"
                    />
                  ):(
                    <Image
                      src={profileImage}
                      width={'145px'}
                      height={'134px'}
                      style={{borderRadius: '16px'}}
                      alt="profile picture"
                    />
                  )}
                </div>
                <div className="username">
                  <p>Hi, {userName}</p>
                  <div className="wave">
                    <Image src={hands} alt="hands waving" />
                    <p className="greeting">Welcome back!</p>
                  </div>
                </div>
              </div>
              <Image src={Placer} alt="bell" />
            </div>
            <div className="dashboard-summary">
              <h3>Dashboard Summary</h3>
              <div className="dashboard">
                {summary.map(({ Icon, name, num, bg }) => (
                  <div
                    key={name}
                    className="info"
                    style={{ backgroundColor: bg }}
                  >
                    <div className="amount">
                      <Icon />
                      <h3>{name}</h3>
                      <p>{num}</p>
                    </div>
                  </div>
                ))}
              </div>
              <PlacersChart />
            </div>

            {!isLoading && recentJobs.length!==0 && (
              <>              
                <div className="sort">
                  <div className="tabs">
                    <ScrollIntoView selector="#inView" className="tab-sort">
                      <div
                        className={showRecentJobs ? 'active-job' : 'non-active'}
                        onClick={() => setShowRecentJobs(true)}
                      >
                        Recent
                      </div>
                    </ScrollIntoView>
                  </div>
                  <div
                    className="arrow-sort"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <p>Sort</p>
                    {showSortDropdown ? <ArrowUp /> : <ArrowDown />}
                  </div>
                  {showSortDropdown && (
                    <ul className="list">
                      <li>Recent</li>
                      <li>Two days ago</li>
                      <li>A week ago</li>
                      <li>Less than 2 weeks</li>
                      <li>Last 30 days</li>
                    </ul>
                  )}
                </div>
                
                <div id="inView">
                    <RecentMobile
                      dashboardStartDate={dashboardStartDate}
                      dashboardEndDate={dashboardEndDate}
                      handleShowReport={handleShowReport}
                      handleAdRemoval={handleAdRemoval}
                      showReport={showReport}
                      setShowReport={setShowReport}
                      showReportModal={showReportModal}
                      setShowReportModal={setShowReportModal}
                      showDropdown={showDropdown}
                      setShowDropdown={setShowDropdown}
                      isReadMore={isReadMore}
                      setIsReadMore={setIsReadMore}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                      listValue={listValue}
                      setListValue={setListValue}
                      ClickedList={ClickedList}
                      toggleReadMore={toggleReadMore}
                      previousImage={previousImage}
                      nextImage={nextImage}
                    />
                </div>
              </>
            )}
          </TabPlacers>
        </>
     
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
