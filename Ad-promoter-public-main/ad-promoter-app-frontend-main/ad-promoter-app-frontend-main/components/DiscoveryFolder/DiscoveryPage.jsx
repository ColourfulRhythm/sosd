/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import { Filterstyled, Container, DiscoveryPageContainer, Desktop } from './discovery.style'
import DiscoveryFeed from './DiscoveryFeed'
import DiscoveryJob from './DiscoveryJob'
import Modal from './ReportModal/Modal'
import Backdrop from './ReportModal/Backdrop'
import { getThirtyDaysAgoRange, getTwoWeeksAgoRange, getWeekAgoRange } from '@/utils/formatFilterDate'
import DiscoveryEmptyScreen from '../discoveryEmptyScreen'
import SearchEmptyScreen from '../failedSearch'
import axios from '@/pages/api/axios'
import { useToast } from '@chakra-ui/react'

const DiscoveryPage = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [searchTag,setSearchTag] = useState('')
    const token = useRef('')
    const [recommendedJobs,setRecommendedJobs] = useState([])
    const [feed,setFeed] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isRecLoading,setIsRecLoading] = useState(false)
    const [clickedFilter,setClickedFilter] = useState('Filter')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [adType,setAdType] = useState('')
    const [recent,setRecent] = useState()
    const [popular,setPopular] = useState()
    const [page, setPage] = useState(1);
    const [recPage, setRecPage] = useState(1);
    const toast = useToast()
    useEffect(()=>{
        const userToken = JSON.parse(localStorage.getItem("user-token"));
        if (userToken) {
            token.current = userToken
        }

        if(token.current){
            fetchFeed()
            fetchRecommended()
        }
    },[recent,popular,adType,endDate,startDate])

    useEffect(() => {
        const handleClickOutside = (event) => {
            setShowDropdown(false)
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchFeed = async () => {
      let apiUrl = `/api/v1/ads/personal?page=1&pageSize=10`;
    
      if (startDate) {
        apiUrl += `&startDate=${startDate}`;
      }
    
      if (endDate) {
        apiUrl += `&endDate=${endDate}`;
      }
    
      if (searchTag) {
        apiUrl += `&query=${searchTag}`;
      }
    
      if (adType) {
        apiUrl += `&adType=${adType}`;
      }
    
      if (recent) {
        apiUrl += `&recent=${recent}`;
      }
    
      if (popular) {
        apiUrl += `&popular=${popular}`;
      }
    
      setIsLoading(true);
    
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        });
    
        setFeed(response.data.data);
        setIsLoading(false);
        setSearchTag('');
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast({
          title: 'Unable to fetch feed at the moment',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      }
    };
    const fetchRecommended = async () => {
      let apiUrl = `/api/v1/ads/recommended?page=1&pageSize=10`;
    
      if (searchTag) {
        apiUrl += `&name=${searchTag}`;
      }
    
      if (startDate) {
        apiUrl += `&startDate=${startDate}`;
      }
    
      if (endDate) {
        apiUrl += `&endDate=${endDate}`;
      }
    
      if (adType) {
        apiUrl += `&adType=${adType}`;
      }
    
      if (recent) {
        apiUrl += `&recent=${recent}`;
      }
    
      if (popular) {
        apiUrl += `&popular=${popular}`;
      }
    
      setIsRecLoading(true);
    
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        });
    
        setRecommendedJobs(response.data.data.data);
        setIsRecLoading(false);
      } catch (error) {
        console.error(error);
        setIsRecLoading(false);
        toast({
          title: 'Unable to fetch recommended jobs at the moment',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      }
    };

    const handleFilterSelect = (e) =>{
        setClickedFilter(e.target.innerText)
        if(e.target.innerText === 'Recent'){
          setRecent(true)
          setStartDate('')
          setEndDate('')
          setPopular()
          setAdType('')
        }
        if(e.target.innerText === 'Popular'){
          setPopular(true)
          setRecent()
          setStartDate('')
          setEndDate('')
          setAdType('')
        }
        if(e.target.innerText === 'Link-only Ads'){
          setAdType('direct-link')
          setRecent()
          setStartDate('')
          setEndDate('')
          setPopular()
        }
        if(e.target.innerText === 'Visual Ads'){
          setAdType('visual')
          setRecent()
          setStartDate('')
          setEndDate('')
          setPopular()
        }
        if(e.target.innerText === 'Details Ads'){
          setAdType('detail')
          setRecent()
          setStartDate('')
          setEndDate('')
          setPopular()
        }
        if(e.target.innerText === 'A week ago'){
          const { startOfWeek, endOfWeek } = getWeekAgoRange();
          setStartDate(startOfWeek)
          setEndDate(endOfWeek)
          setRecent()
          setAdType('')
          setPopular()
        }
        if(e.target.innerText === 'Less than 2 weeks'){
          const { startOfWeek, endOfWeek } = getTwoWeeksAgoRange();
          setStartDate(startOfWeek)
          setEndDate(endOfWeek)
          setRecent()
          setAdType('')
          setPopular()
        }
        if(e.target.innerText === 'Last 30 days'){
          const { startOfWeek, endOfWeek } = getThirtyDaysAgoRange();
          setStartDate(startOfWeek)
          setEndDate(endOfWeek)
          setRecent()
          setAdType('')
          setPopular()
        }
        setShowDropdown(false)
    }

    const handleSearch = (event) =>{
        if (event.key === 'Enter') {
            if(!searchTag){
                return
            }else{
                fetchFeed(searchTag)
                fetchRecommended(searchTag)
            }
        }
    }
    
    const handleShowReport = () => {
        setShowReport(true)
    }


  return (
    <Desktop>
        {showReport && <Backdrop onCancel={() => setShowReport(false)}/>}
        {showReport && <Modal />}
        <Filterstyled>
            <div className='searchFilter'>
                <div className='search'>
                  <span>
                      <svg className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20"
                          height="20" viewBox="0 0 30 30">
                      <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971  23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                      </path>
                      </svg>
                  </span>
                  <input name='search' id='search' value={searchTag} onKeyDown={handleSearch} onChange={(e)=>setSearchTag(e.target.value)} placeholder='Search ad niche...'/>
                </div>  
                <div className='select' style={{cursor: 'pointer'}} onClick={(e) => {setShowDropdown(!showDropdown); e.stopPropagation()}}>
                    <div>{clickedFilter}</div>
                    {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
                    {showDropdown && (
                    <ul onClick={(e)=>e.stopPropagation()}>
                      <li onClick={handleFilterSelect}>Recent</li>
                      <li onClick={handleFilterSelect}>Popular</li>
                      <li onClick={handleFilterSelect}>Link-only Ads</li>
                      <li onClick={handleFilterSelect}>Visual Ads</li>
                      <li onClick={handleFilterSelect}>Details Ads</li>
                      <li onClick={handleFilterSelect}>A week ago</li>
                      <li onClick={handleFilterSelect}>Less than 2 weeks</li>
                      <li onClick={handleFilterSelect}>Last 30 days</li>
                    </ul>
                )}
                </div>
            </div>
        </Filterstyled>
        <Container>
          {isLoading ? (
            <DiscoveryEmptyScreen />
          ):(
          <>
            {!isLoading && searchTag && feed.length === 0 && recommendedJobs.length === 0 ? (
              <SearchEmptyScreen />
            ):(
              <div className='jobs'>
                <div className='col1'>
                    <DiscoveryFeed isLoading={isLoading} feed={feed} fetchFeed={fetchFeed} clickShow={handleShowReport}/>
                </div>
                <div className='col2'>
                    <h3 style={{fontWeight: 'bold', fontSize: '2rem',marginBottom:'1rem'}}>Recommended Jobs</h3>
                    <DiscoveryJob isLoading={isLoading} recommendedJobs={recommendedJobs} fetchRecommended={fetchRecommended} clickShow={handleShowReport}/>
                </div>
              </div>
            )}
          </>
          )}
        </Container>
    </Desktop>
    
  )
}

export default DiscoveryPage
