/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect,useRef } from 'react'
import { Container, TopContainer, UndoContainer } from './style'
import {  MobileActivities, TabActivities } from './style'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import trash from '@/public/assets/trash.svg'
import Image from 'next/image'
import group from '@/public/assets/group.svg'
import Backdrop from '../DiscoveryFolder/ReportModal/Backdrop'
import { Spinner } from '@chakra-ui/react'
import { getThirtyDaysAgoRange, getTwoWeeksAgoRange, getWeekAgoRange } from '@/utils/formatFilterDate'
import ActivitiesEmptyScreen from '../activitiesEmptyScreen'
import axios from '@/pages/api/axios'

const PlacersActivities = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showBackdrop, setShowBackdrop] = useState(false)
    const token = useRef('')
    const id = useRef('')
    const [activities, setActivities] = useState([])
    const [totalactivities, setTotalActivities] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [checkedItems, setCheckedItems] = useState([]);
    const [clickedFilter,setClickedFilter] = useState('Filter')
    const [dashboardStartDate,setDashboardStartDate] = useState('')
    const [dashboardEndDate,setDashboardEndDate] = useState('')

    const pageNumbers = [];
    const activitiesPerPage = 8;

    const paginate = (pageNumber) => {
      setPageNumber(pageNumber)
    }

    for(let i = 1; i<= Math.ceil(totalactivities / activitiesPerPage); i++){
      pageNumbers.push(i)
    }

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user-detail"));
      const userToken = JSON.parse(localStorage.getItem("user-token"));
      if (user) {
        token.current = userToken
        id.current = user._id
      }

      if(id.current){
        fetchActivities()
      }
    },[dashboardStartDate,dashboardEndDate,pageNumber])

    const fetchActivities = async () => {
      let apiUrl = `/api/v1/activities/all/${id.current}?page=${pageNumber}&pageSize=${activitiesPerPage}`;
    
      if (dashboardStartDate) {
        apiUrl += `&startDate=${dashboardStartDate}`;
      }
    
      if (dashboardEndDate) {
        apiUrl += `&endDate=${dashboardEndDate}`;
      }
    
      try {
        setIsLoading(true);
    
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        });
    
        if (response.status === 200) {
          const result = response.data;
          setActivities(result.data.data);
          setTotalActivities(result.data.total);
          console.log(result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setIsLoading(false);
        toast({
          title: 'Error fetching activities',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });
      }
    };
    
    const changeToLocalTIme = (utc) =>{
      const date = new Date(utc);
      const localTime = date.toLocaleString(); // adjust to local time zone
      return localTime;
    }

    const handleCheckboxChange = (itemId) => {
      const isChecked = checkedItems.includes(itemId);
  
      if (isChecked) {
        setCheckedItems(checkedItems.filter((id) => id !== itemId));
      } else {
        setCheckedItems([...checkedItems, itemId]);
      }
    };

    const handleDelete = async () => {
      try {
        const response = await axios.delete('https://api.ad-promoter.com/api/v1/activities', {
          headers: {
            Authorization: `Bearer ${token.current}`,
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          data: {
            activities: checkedItems,
          },
        });
    
        if (response.status === 200) {
          const json = response.data;
          console.log(json);
          console.log(checkedItems);
        } else {
          console.log('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting activities:', error);
      }
    };

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
    <TopContainer>
      <Container>
      {showBackdrop && <Backdrop onCancel={() => setShowBackdrop(false)}/>}
      <UndoContainer style={{transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)'}}>
        <div className='activity'>Activity deleted</div>
        <div className='undo' onClick={() => setShowBackdrop(false)}>Undo</div>
      </UndoContainer> 
      {isLoading && activities.length === 0 ? (
        <div className='spinner'>
          <Spinner 
           thickness='4px'
           speed='0.65s'
           emptyColor='gray.200'
           color='#4F00CF'
           size='xl'
           />
        </div>
      ):(
        <div className='log-container'>
          <div className='log'>
            <p>Activity Log</p>
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

          {activities.length === 0 ?(
            <ActivitiesEmptyScreen />
          ):(
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>User ID</th>
                    <th>Action</th>
                    <th>Date</th>
                    <th style={{cursor:'pointer'}} onClick={()=>handleDelete(checkedItems)}><Image src={trash} alt='trash'/></th>
                  </tr>
                </thead>
                <tbody>
                  {[...activities].reverse().map((data,index) => (
                    <tr className='row' key={data._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                          <Image src={data.sender?.profilePicture} width={36} height={36} alt='profile' style={{borderRadius: '50%'}}/>
                          <p>{data.sender?.accountName}</p>
                        </div>
                      </td>
                      <td>{data.sender?._id}</td>
                      <td>{data.body}</td>
                      <td>{changeToLocalTIme(data.createdAt)}</td>
                      <td><input type="checkbox" name='select' id={data._id} checked={checkedItems.includes(data._id)} onChange={() => handleCheckboxChange(data._id)}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='pagination-style'>
                {pageNumbers.map((number)=>(
                  <div className={pageNumber === number ? 'pagination-style-child-active':'pagination-style-child'} key={number} onClick={() => paginate(number)}>{number}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
    <MobileActivities>
      <div className='adcreator'>
        <h4>Activity Log</h4>
        <Image onClick={() => setShowDropdown(!showDropdown)} src={group} alt='group'/>
      </div>
      {/* {showDropdown && (
        <ul>
          <li onClick={handleFilterText}>Recent</li>
          <li onClick={handleFilterText}>Popular</li>
          <li onClick={handleFilterText}>A week ago</li>
          <li onClick={handleFilterText}>Less than 2 weeks</li>
          <li onClick={handleFilterText}>Last 30 days</li>
        </ul>
      )} */}
      {isLoading && activities.length === 0 ? (
        <div className='spinner'>
          <Spinner 
           thickness='4px'
           speed='0.65s'
           emptyColor='gray.200'
           color='#4F00CF'
           size='xl'
           />
        </div>
      ):(     
        <>
          {activities.length === 0 ? (
            <ActivitiesEmptyScreen />
          ):(
            <div className='body-container'>
              <div className='body'>
                {[...activities].reverse().map((data) => (
                  <div key={data._id} className='activity'>
                    
                    <div className='user'>
                      <Image src={data.sender?.profilePicture} width={36} height={36} alt='profile' style={{borderRadius: '50%'}}/>
                      <h3>{data.sender?.accountName}</h3>
                    </div>
                    
                    <div className='userId'>
                      <p>User ID</p>
                      <h2>{data.sender?._id}</h2>
                    </div>
                    <div className='action'>
                      <p>Action</p>
                      <h2>{data.body}</h2>
                    </div>
                    <div className='userId'>
                      <p>Date</p>
                      <h2>{changeToLocalTIme(data.createdAt)}</h2>
                    </div>
                    {/* <div className='time'>
                      <p>Time</p>
                      <h2>{data.time}</h2>
                    </div> */}
                  </div>
                ))}
              </div>
              <div className='pagination-style'>
                {pageNumbers.map((number)=>(
                  <div className={pageNumber === number ? 'pagination-style-child-active':'pagination-style-child'} key={number} onClick={() => paginate(number)}>{number}</div>
                ))}
              </div>
            </div>
          )}        
        </>   
      )}
    </MobileActivities>
    <TabActivities>
      <div className='log'>
        <p>Activity Log</p>
        <div onClick={() => setShowDropdown(!showDropdown)} className='filter'>
            <div>{clickedFilter}</div>
            {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
        </div>
        {showDropdown && (
            <ul>
              <li onClick={handleFilterText}>Recent</li>
              <li onClick={handleFilterText}>Popular</li>
              <li onClick={handleFilterText}>A week ago</li>
              <li onClick={handleFilterText}>Less than 2 weeks</li>
              <li onClick={handleFilterText}>Last 30 days</li>
            </ul>
        )}
      </div>

      {isLoading && activities.length === 0 ? (
        <div className='spinner'>
          <Spinner 
           thickness='4px'
           speed='0.65s'
           emptyColor='gray.200'
           color='#4F00CF'
           size='xl'
           />
        </div>
      ):(
        <>
          {activities.length === 0 ? (
            <ActivitiesEmptyScreen />
          ):(
            <div className='body-container'>
              <div className='body'>
                {[...activities].reverse().map((data) => (
                  <div key={data._id} className='activity'>
                    
                    <div className='user'>
                      <Image src={data.sender?.profilePicture} width={36} height={36} alt='profile' style={{borderRadius: '50%'}} />
                      <h3>{data.sender?.accountName}</h3>
                    </div>

                    <div className='userId'>
                      <p>User ID</p>
                      <h2>{data.sender?._id}</h2>
                    </div>
                    <div className='action'>
                      <p>Action</p>
                      <h2>{data.body}</h2>
                    </div>
                    <div className='userId'>
                      <p>Date</p>
                      <h2>{changeToLocalTIme(data.createdAt)}</h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className='pagination-style'>
                {pageNumbers.map((number)=>(
                  <div className={pageNumber === number ? 'pagination-style-child-active':'pagination-style-child'} key={number} onClick={() => paginate(number)}>{number}</div>
                ))}
              </div>
            </div>
          )}        
        </>
      )}
    </TabActivities>
    </TopContainer>
  )
}

export default PlacersActivities
