import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Image from 'next/image'
import { Container } from '@/styles/adminHome.style'
import { Line } from 'react-chartjs-2'
import adminframe from '@/public/assets/admin-frame.svg'
import adminGraph from '@/public/assets/admin-graph.svg'
import adminProfile from '@/public/assets/admin-profile.svg'
import edit from '@/public/assets/edit-2.svg'
import gallery from '@/public/assets/gallery-tick.svg'
import people from '@/public/assets/people.svg'
import profileCircle from '@/public/assets/profile-circle.svg'
import profileDelete from '@/public/assets/profile-delete.svg'
import userSquare from '@/public/assets/user-square.svg'
import userMariam from '@/public/assets/userMariam.svg'
import userMo from '@/public/assets/userMo.svg'
import userTom from '@/public/assets/userTom.svg'
import flash from '@/public/assets/flash.svg'
import cup from '@/public/assets/cupIcon.svg'
import hands from '@/public/assets/hands.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import arrowUp from '@/public/assets/arrow-up.svg'
import ChevronRight from "@/public/assets/chevron-right"
import ChevronLeft from "@/public/assets/chevron-left"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Index = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 6],
        borderColor: '#00B068',
        backgroundColor: '#f4f4f4',
      },
    ],
  };
  const summary = [
    {
      icon: userSquare,
      name: 'Total No. of Users',
      num: '10,000',
      bg: '#D2EFFF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: edit,
      name: 'No. of Placers',
      num: '2,135',
      bg: '#FFE2C7',
      shadow: '1px 2px 4px rgba(60, 41, 24, 0.2)'
    },
    {
      icon: cup,
      name: 'No. of Promoters',
      num: '7,200',
      bg: '#FFE2E4',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: flash,
      name: 'Total Adverts Placed',
      num: '13,000',
      bg: '#D2FFE4',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: gallery,
      name: 'Approved Visual Ads',
      num: '120',
      bg: '#F4D4FF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: gallery,
      name: 'Pending Visual Ads',
      num: '40',
      bg: '#DDECF2',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: profileCircle,
      name: 'No. of Admins',
      num: '2',
      bg: '#D2EFFF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: people,
      name: 'No. of Sub-Admins',
      num: '5',
      bg: '#C8C7FF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
    {
      icon: profileDelete,
      name: 'Blocklisted Users',
      num: '3',
      bg: '#FBC4BC',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)'
    },
  ]
  const promoters = [
    {
      picture: userMariam,
      name: 'Maharm Hassanli',
      email: 'maharmhassa@gmail.com',
      adverts: '16',
      earning: '#8,000'
    },
    {
      picture: userMo,
      name: 'Mariam Garza',
      email: 'maharmhassa@gmail.com',
      adverts: '15',
      earning: '#4,000'
    },
    {
      picture: userTom,
      name: 'Brian Reed',
      email: 'maharmhassa@gmail.com',
      adverts: '06',
      earning: '#7,000'
    },
    {
      picture: userMariam,
      name: 'Tommy Spencer',
      email: 'maharmhassa@gmail.com',
      adverts: '02',
      earning: '#500'
    },
    {
      picture: userMo,
      name: 'Brian Brooks',
      email: 'maharmhassa@gmail.com',
      adverts: '10',
      earning: '#6,000'
    },
  ]

  return (
    <Container>
      <div className='grid'>
        <div className='col1'>
          <div className='welcome'>
            <div className='user'>
              <Image src={adminProfile} alt='profile'/>
              <div className='name'>
                <p className='greet'>Hi, Isaiah McCLean</p>
                <div className='wave'>
                  <Image src={hands} alt='hand'/>
                  <p>Welcome back!</p>
                </div>
              </div>
            </div>
            <Image src={adminframe} alt='frame'/>
          </div>
          <div className='dashboard'>
            <p className='dash'>Dashboard Summary</p>
            <div className='card'>
              {summary.map((item, index) => (
                <div key={index} className='card-info' style={{backgroundColor: item.bg, boxShadow: item.shadow}}>
                  <div className='card-column'>
                    <div className='item-icon'>
                      <Image src={item.icon} alt='icon'/>
                      <p>{item.name}</p>
                    </div>
                    <p className='amount'>{item.num}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='graph'>
            <div className='income'>
              <p className='income-text'>Income Graph</p>
              <div className='calendar'>
                <div className='week'>
                  <p>Week 1</p>
                  <Image src={arrowUp} alt='arrow'/>
                </div>
                <div className='month'>
                  <ChevronLeft />
                  <h4>Aug 2021</h4>
                  <ChevronRight />
                </div>
              </div>
            </div>
            <div className='lineGraph'>
              <Line options={options} data={data} height={90}/>
            </div>
          </div>
        </div>
        <div className='col2'>
          <div className='filter' onClick={() => setShowDropdown(!showDropdown)}>
            <p>This week</p>
            {showDropdown ? <Image src={arrowDown} alt='arrow'/> : <Image src={arrowUp} alt='arrow'/>}
          </div>
          {showDropdown && (
            <ul>
              <li>Today</li>
              <li>This week</li>
              <li>2 weeks ago</li>
              <li>Last 30 days</li>
            </ul>
          )}
          <div className='ad-graph'>
            <h2>Advert Graph</h2>
            <div className='pie'>
              <Image src={adminGraph} alt='graph'/>
              <div className='adType'>
                <div className='ad'>
                  <div className='blue'></div>
                  <p>Directlink Ad</p>
                </div>
                <div className='ad'>
                  <div className='yellow'></div>
                  <p>Details Ad</p>
                </div>
                <div className='ad'>
                  <div className='green'></div>
                  <p>Visual Ad</p>
                </div>
              </div>
            </div>
          </div>
          <div className='adPromoters'>
            <h2>Top Advert Promoters</h2>
            {promoters.map((item, index) => (
              <div className='topPromoters' key={index}>
                <div className='user'>
                  <Image src={item.picture} alt='picture'/>
                  <div className='name'>
                    <p className='userName'>{item.name}</p>
                    <p className='email'>{item.email.length > 17 ? `${item.email.substring(0, 17)}..` : item.email}</p>
                  </div>
                </div>
                <div className='result'>
                  <p className='adResult'>Adverts: <span>{item.adverts}</span></p>
                  <div className='line'></div>
                  <p className='earning'>Earning: <span>{item.earning}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className='adPromoters'>
            <h2>Top Advert Placers</h2>
            {promoters.map((item, index) => (
              <div className='topPromoters' key={index}>
                <div className='user'>
                  <Image src={item.picture} alt='picture'/>
                  <div className='name'>
                    <p className='userName'>{item.name}</p>
                    <p className='email'>{item.email.length > 17 ? `${item.email.substring(0, 17)}..` : item.email}</p>
                  </div>
                </div>
                <div className='result'>
                  <p className='adResult'>Adverts: <span>{item.adverts}</span></p>
                  <div className='line'></div>
                  <p className='earning'>Earning: <span>{item.earning}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Index