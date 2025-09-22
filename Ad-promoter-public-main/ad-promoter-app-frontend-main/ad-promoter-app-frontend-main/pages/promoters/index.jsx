/* eslint-disable react-hooks/exhaustive-deps */
import {
  MobileCotainer,
  StyledHome,
  StyledHomeContainer,
  TabContainer,
  TabletContainer,
} from '@/styles/promoters/home';
import wave from '@/public/assets/wave-hands.svg';
import Image from 'next/image';
import money from '@/public/assets/money.svg';
import wallet from '@/public/assets/empty-wallet-change.svg';
import card from '@/public/assets/card-switch.svg';
import chart from '@/public/assets/chart-square.svg';
import RecentMobile from '../../components/MobilePromoterHome/Recent';
import SavedJobsMobile from '../../components/MobilePromoterHome/SavedJobs';
import Recent from '@/components/PromoterHomeAdDetail/recent';
import SavedJobs from '@/components/PromoterHomeAdDetail/savedJobs';
import Link from 'next/link';
import promo from '@/public/assets/pr.svg';
import notif from '@/public/assets/notif.svg';
import { useRouter, withRouter } from 'next/router';
import ArrowDown from '@/public/assets/arrow-down';
import ArrowUp from '@/public/assets/arrow-up';
import { useEffect, useRef, useState } from 'react';
import userStatus from '@/public/assets/promoters-logo.svg';
import MobileNotif from '@/components/MobileNotification/index';
import ScrollContainer from 'react-indiana-drag-scroll';
import ScrollIntoView from 'react-scroll-into-view';
import {
  getThirtyDaysAgoRange,
  getTwoWeeksAgoRange,
  getWeekAgoRange,
} from '@/utils/formatFilterDate';
import DefaultPic from '@/public/assets/squared-profile.png'
import useDraggableScroll from 'use-draggable-scroll';
import axios from '../api/axios';
import { useToast } from '@chakra-ui/react';

const Index = ({ router }) => {
  const {
    query: { tab },
  } = router;
  const Router = useRouter();
  const isTabOne = tab === 'recent' || tab == null;
  const isTabTwo = tab === 'saved jobs';
  const [showRecentJobs, setShowRecentJobs] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [userName, setUserName] = useState('');
  const token = useRef('');
  const [totalBalance, setTotalBalance] = useState('');
  const [adsPromoted, setAdsPromoted] = useState('');
  const [videosAccepted, setVideosAccepted] = useState('');
  const [pendingWithdrawals, setPendingWithdrawals] = useState('');
  const [adsConverted, setAdsConverted] = useState('');
  const [noVisitors, setNoVisitors] = useState('');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [clickedFilter, setClickedFilter] = useState('Filter');
  const [clickedSort, setClickedSort] = useState('Sort');
  const [dashboardStartDate, setDashboardStartDate] = useState('');
  const [dashboardEndDate, setDashboardEndDate] = useState('');
  const [sortStartDate, setSortStartDate] = useState('');
  const [sortEndDate, setSortEndDate] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const ref = useRef(null);
  const toast = useToast();
  const { onMouseDown } = useDraggableScroll(ref, { direction: 'vertical' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-detail'));
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    if(!user.profilePicture || user.profilePicture === ''){
      setProfileImage('')
    }else{
      setProfileImage(user.profilePicture);
    }

    if (user && userToken && user.role === 'promoter') {
      setUserName(user.accountName);
      token.current = userToken;
    } else {
      Router.push('/login');
    }

    if (token.current) {
      fetchDashboard();
    }
  }, [Router, dashboardEndDate, dashboardStartDate, setUserName]);

  const fetchDashboard = async () => {
    let apiUrl = '/api/v1/user/dashboard';
  
    if (dashboardStartDate || dashboardEndDate) {
      apiUrl += '?';
    }
  
    if (dashboardStartDate) {
      apiUrl += `startDate=${dashboardStartDate}`;
    }
  
    if (dashboardEndDate) {
      apiUrl += `${dashboardStartDate ? '&' : ''}endDate=${dashboardEndDate}`;
    }
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
  
      const data = response.data.data;
  
      setTotalBalance(data.totalBalance);
      setAdsPromoted(data.adsPromoted);
      setVideosAccepted(data.noOfVideosAccepted);
      setPendingWithdrawals(data.pendingWithdrawals);
      setAdsConverted(data.noOfAdsConverted);
      setNoVisitors(data.noOfVisitors);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Unable to fetch dashboard data',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
  };

  const handleFilterSelect = (e) => {
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
    setShowDropdown(false);
  };

  const handleSortSelect = (e) => {
    setClickedSort(e.target.innerText);
    if (e.target.innerText === 'Recent') {
      setSortStartDate('');
      setSortEndDate('');
    }
    if (e.target.innerText === 'A week ago') {
      const { startOfWeek, endOfWeek } = getWeekAgoRange();
      setSortStartDate(startOfWeek);
      setSortEndDate(endOfWeek);
    }
    if (e.target.innerText === 'Less than 2 weeks') {
      const { startOfWeek, endOfWeek } = getTwoWeeksAgoRange();
      setSortStartDate(startOfWeek);
      setSortEndDate(endOfWeek);
    }
    if (e.target.innerText === 'Last 30 days') {
      const { startOfWeek, endOfWeek } = getThirtyDaysAgoRange();
      setSortStartDate(startOfWeek);
      setSortEndDate(endOfWeek);
    }
    setShowSortDropdown(false);
  };

  const mobileSummary = [
    {
      icon: money,
      name: 'Total Balance',
      price: `₦${totalBalance}`,
      bg: '#D2EFFF',
      nameClass: 'balance',
    },
    {
      icon: wallet,
      name: 'Pending Withdrawal',
      price: `₦${pendingWithdrawals}`,
      bg: '#FFE2C7',
    },
    {
      icon: card,
      name: 'No. of Ads Promoted',
      price: `${adsPromoted}`,
      bg: '#C8C7FF',
    },
    {
      icon: chart,
      name: 'No. of Ads Converted',
      price: `${adsConverted}`,
      bg: '#C7FFDD',
    },
    {
      icon: chart,
      name: 'No. of Visitors',
      price: `${noVisitors}`,
      bg: '#FFE2E4',
    },
    {
      icon: chart,
      name: 'No. of Videos accepted',
      price: `${videosAccepted}`,
      bg: '#F4D5FF',
    },
  ];
  const tabSummary = [
    {
      icon: money,
      name: 'Total Balance',
      price: `₦${totalBalance}`,
      bg: '#D2EFFF',
    },
    {
      icon: wallet,
      name: 'Pending Withdrawal',
      price: `₦${pendingWithdrawals}`,
      bg: '#FFE2C7',
    },
    {
      icon: card,
      name: 'No. of Ads Promoted',
      price: `${adsPromoted}`,
      bg: '#C8C7FF',
    },
    {
      icon: chart,
      name: 'No. of Videos accepted',
      price: `${videosAccepted}`,
      bg: '#F4D5FF',
    },
    {
      icon: chart,
      name: 'No. of Visitors',
      price: `${noVisitors}`,
      bg: '#FFE2E4',
    },
    {
      icon: chart,
      name: 'No. of Ads Converted',
      price: `${adsConverted}`,
      bg: '#C7FFDD',
      nameClass: 'balance',
    },
  ];

  const summary = [
    {
      icon: money,
      name: 'Total Balance',
      price: `₦${totalBalance}`,
      bg: '#D2EFFF',
    },
    {
      icon: wallet,
      name: 'Pending Withdrawal',
      price: `₦${pendingWithdrawals}`,
      bg: '#FFE2C7',
    },
    {
      icon: card,
      name: 'No. of Ads Promoted',
      price: `${adsPromoted}`,
      bg: '#C8C7FF',
    },
    {
      icon: chart,
      name: 'No. of Ads Converted',
      price: `${adsConverted}`,
      bg: '#C7FFDD',
    },
    {
      icon: chart,
      name: 'No. of Visitors',
      price: `${noVisitors}`,
      bg: '#FFE2E4',
    },
    {
      icon: chart,
      name: 'No. of Videos accepted',
      price: `${videosAccepted}`,
      bg: '#F4D5FF',
    },
  ];

  return (
    <>
      {token.current && (
        <>
          <StyledHomeContainer>
            <StyledHome>
              <ScrollContainer className="home-dashboard">
                <div className="welcome">
                  <div className="profile-img">
                    {profileImage === '' ? (
                      <Image
                        src={DefaultPic}
                        width={145}
                        height={134}
                        style={{borderRadius: '16px'}}
                        alt="profile picture"
                      />
                    ):(
                      <Image
                        src={profileImage}
                        width={145}
                        height={134}
                        style={{borderRadius: '16px'}}
                        alt="profile picture"
                      />
                    )}
                  </div>

                  <div className="user-details">
                    <p>Hi, {userName}</p>
                    <div className="sub-user-details">
                      <Image src={wave} alt="hands waving" />
                      <p>Welcome back!</p>
                    </div>
                  </div>

                  <div className="user-status">
                    <Image src={userStatus} alt="user-status" />
                  </div>
                </div>

                <div className="dashboard-summary">
                  <div className="dashboard-summary-header">
                    <h3>Dashboard Summary</h3>

                    <div
                      className="filter"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <p>{clickedFilter}</p>
                      <div className="arrow-drop">
                        {showDropdown ? <ArrowUp /> : <ArrowDown />}
                      </div>
                    </div>
                    {showDropdown && (
                      <ul>
                        <li onClick={handleFilterSelect}>Recent</li>
                        <li onClick={handleFilterSelect}>A week ago</li>
                        <li onClick={handleFilterSelect}>Less than 2 weeks</li>
                        <li onClick={handleFilterSelect}>Last 30 days</li>
                      </ul>
                    )}
                  </div>

                  <div className="dashboard-summary-info">
                    {summary.map(({ icon, name, price, bg }) => (
                      <div
                        className="dashboard-summary-info-item"
                        key={name}
                        style={{ backgroundColor: bg }}
                      >
                        <div className="dashboard-summary-info-item-child">
                          <div className="title">
                            <Image src={icon} alt={`${icon} icon`} />
                            <p>{name}</p>
                          </div>
                          <h3>{price}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollContainer>

              <TabContainer>
                <div className="tab-head">
                  <div className="tab-container">
                    <div className="tab">
                      <Link
                        href={{
                          pathname: '/promoters',
                          query: { tab: 'recent' },
                        }}
                      >
                        <a className={isTabOne ? 'active' : ''}>Recent</a>
                      </Link>
                      {isTabOne && <div className="bottom-dash"></div>}
                    </div>

                    <div className="tab">
                      <Link
                        href={{
                          pathname: '/promoters',
                          query: { tab: 'saved jobs' },
                        }}
                      >
                        <a className={isTabTwo ? 'active' : ''}>Saved Jobs</a>
                      </Link>
                      {isTabTwo && <div className="bottom-dash"></div>}
                    </div>
                  </div>

                  <div
                    className="sort-btn"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <p>Sort</p>
                    <div className="arrow">
                      {showSortDropdown ? <ArrowUp /> : <ArrowDown />}
                    </div>
                  </div>
                  {showSortDropdown && (
                    <ul>
                      <li onClick={handleSortSelect}>Recent</li>
                      <li onClick={handleSortSelect}>A week ago</li>
                      <li onClick={handleSortSelect}>Less than 2 weeks</li>
                      <li onClick={handleSortSelect}>Last 30 days</li>
                    </ul>
                  )}
                </div>
                <div ref={ref} onMouseDown={onMouseDown} className="tab-body">
                  {isTabOne && (
                    <Recent
                      sortStartDate={sortStartDate}
                      setSortStartDate={setSortStartDate}
                      setSortEndDate={setSortEndDate}
                      sortEndDate={sortEndDate}
                    />
                  )}
                  {isTabTwo && 
                    <SavedJobs 
                      sortStartDate={sortStartDate}
                      setSortStartDate={setSortStartDate}
                      setSortEndDate={setSortEndDate}
                      sortEndDate={sortEndDate} 
                    />
                  }
                </div>
              </TabContainer>
            </StyledHome>
          </StyledHomeContainer>

          <MobileCotainer>
            {showNotif ? (
              <MobileNotif goBack={() => setShowNotif(false)} />
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
                        <Image src={wave} alt="hands waving" />
                        <p className="greeting">Welcome back!</p>
                      </div>
                    </div>
                  </div>
                  <div className="promo">
                    <Image src={promo} alt="promoter" />
                    <Image
                      src={notif}
                      alt="notification"
                      onClick={() => setShowNotif(true)}
                    />
                  </div>
                </div>
                <div className="dashboard">Dashboard Summary</div>
                <div className="summary-info">
                  {mobileSummary.map((item, index) => (
                    <div
                      key={index}
                      className={item.nameClass ? 'balance' : 'card'}
                      style={{ backgroundColor: item.bg }}
                    >
                      <div className="amount">
                        <div className="icon">
                          <Image src={item.icon} alt="icon" />
                          <p>{item.name}</p>
                        </div>
                        <h3>{item.price}</h3>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sort">
                  
                    <ScrollIntoView selector="#inView" className="tab-sort">
                      <div onClick={() => setShowRecentJobs(true)}>
                        <p className={showRecentJobs ? 'active-job' : ''}>
                          Recent
                        </p>
                      </div>
                      {showRecentJobs && <div className="dash-bottom"></div>}
                    </ScrollIntoView>
                  
                  
                  <ScrollIntoView selector="#inView" className="tab-sort">
                    <div onClick={() => setShowRecentJobs(!showRecentJobs)}>
                      <p
                        className={showRecentJobs !== true ? 'active-job' : ''}
                      >
                        Saved Jobs
                      </p>
                    </div>
                    {showRecentJobs !== true && (
                      <div className="dash-bottom"></div>
                    )}
                  </ScrollIntoView>
                  
                  
                    <div
                      className={showSortDropdown ? 'arrow-sort' : 'no-sort'}
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      <p>Sort</p>
                      {showSortDropdown ? <ArrowUp /> : <ArrowDown />}
                    </div>
                  {showSortDropdown && (
                    <ul className="list">
                      <li onClick={handleSortSelect}>Recent</li>
                      <li onClick={handleSortSelect}>A week ago</li>
                      <li onClick={handleSortSelect}>Less than 2 weeks</li>
                      <li onClick={handleSortSelect}>Last 30 days</li>
                    </ul>
                  )}
                </div>
                  <div id="inView">
                    {showRecentJobs ? 
                      <RecentMobile 
                        sortStartDate={sortStartDate}
                        setSortStartDate={setSortStartDate}
                        setSortEndDate={setSortEndDate}
                        sortEndDate={sortEndDate}
                      /> : 
                      <SavedJobsMobile 
                        sortStartDate={sortStartDate}
                        setSortStartDate={setSortStartDate}
                        setSortEndDate={setSortEndDate}
                        sortEndDate={sortEndDate}
                      />
                    }
                  </div>
              </>
            )}
          </MobileCotainer>

          <TabletContainer>
            <div className="welcome">
              <div className="userProfile">
                {profileImage === '' ? (
                  <Image
                    src={DefaultPic}
                    width={145}
                    height={134}
                    style={{borderRadius: '16px'}}
                    alt="profile picture" 
                  />
                ):(
                  <Image
                    src={profileImage}
                    width={145}
                    height={134}
                    style={{borderRadius: '16px'}}
                    alt="profile picture" 
                  />
                )}
                <div className="username">
                  <p>Hi, {userName}</p>
                  <div className="wave">
                    <Image src={wave} alt="hands waving" />
                    <p className="greeting">Welcome back!</p>
                  </div>
                </div>
              </div>
              <Image src={userStatus} alt="user-status" />
            </div>
            <div className="dashboard-summary">
              <h3>Dashboard Summary</h3>

              <div
                className="filter"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <p>{clickedFilter}</p>
                <div className="arrow-drop">
                  {showDropdown ? <ArrowUp /> : <ArrowDown />}
                </div>
              </div>
              {showDropdown && (
                <ul>
                  <li onClick={handleFilterSelect}>Recent</li>
                  <li onClick={handleFilterSelect}>A week ago</li>
                  <li onClick={handleFilterSelect}>Less than 2 weeks</li>
                  <li onClick={handleFilterSelect}>Last 30 days</li>
                </ul>
              )}
            </div>
            <div className="summary-info">
              {tabSummary.map((item, index) => (
                <div
                  key={index}
                  className={item.nameClass ? 'balance' : 'card'}
                  style={{ backgroundColor: item.bg }}
                >
                  <div className="amount">
                    <div className="icon">
                      <Image src={item.icon} alt="icon" />
                      <p>{item.name}</p>
                    </div>
                    <h3>{item.price}</h3>
                  </div>
                </div>
              ))}
            </div>
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
               
                
                <ScrollIntoView selector="#inView" className="tab-sort">
                  <div
                    className={
                      showRecentJobs !== true ? 'active-job' : 'non-active'
                    }
                    onClick={() => setShowRecentJobs(!showRecentJobs)}
                  >
                    Saved Jobs
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
                  <li onClick={handleSortSelect}>Recent</li>
                  <li onClick={handleSortSelect}>A week ago</li>
                  <li onClick={handleSortSelect}>Less than 2 weeks</li>
                  <li onClick={handleSortSelect}>Last 30 days</li>
                </ul>
              )}
            </div>
            <div id="inView">
              {showRecentJobs ? 
                <RecentMobile 
                  sortStartDate={sortStartDate}
                  setSortStartDate={setSortStartDate}
                  setSortEndDate={setSortEndDate}
                  sortEndDate={sortEndDate}
                /> : 
                <SavedJobsMobile 
                  sortStartDate={sortStartDate}
                  setSortStartDate={setSortStartDate}
                  setSortEndDate={setSortEndDate}
                  sortEndDate={sortEndDate}
                />
              }
            </div>
          </TabletContainer>
        </>
      )}
    </>
  );
};

export default withRouter(Index);
