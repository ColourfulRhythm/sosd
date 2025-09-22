import React, { useState } from 'react'
import profile1 from '@/public/assets/hassan.svg';
import profile2 from '@/public/assets/mh.svg';
import profile3 from '@/public/assets/oldlad.svg';
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import trash from '@/public/assets/trash.svg'
import close from '@/public/assets/close-circle-small.svg'
import Image from 'next/image'
import { UndoContainer, Container } from '@/styles/adminActivities.style';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';


const Activities = () => {
  const gridData = [
    {
      id: 1,
      name: [{ profile: profile1, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Sent a message to customer service',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 2,
      name: [{ profile: profile2, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Payment request',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 3,
      name: [{ profile: profile3, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Visual Ad request',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 4,
      name: [{ profile: profile1, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Edit Ad request',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 5,
      name: [{ profile: profile3, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Reported an Advert',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 6,
      name: [{ profile: profile2, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Sent a request to customer service',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 7,
      name: [{ profile: profile1, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Edit Ad request',
      date: '20/09/2022 11:52PM',
      value: false,
    },
    {
      id: 8,
      name: [{ profile: profile2, user: 'Maharm Hassanli' }],
      userId: '#300187634',
      action: 'Social Ad request',
      date: '20/09/2022 11:52PM',
      value: false,
    },
  ];

  const [showDropdown, setShowDropdown] = useState(false)
    const [rowData, setRowData] = useState(gridData)
    const [showBackdrop, setShowBackdrop] = useState(false)

    const handleCheckbox = (e) => {
      const id = e.target.id
      const data = [...rowData]
      const checkedValue = data.map((data) => data.id === +id ? {...data, value: !data.value} : data)
      setRowData(checkedValue)
    }

    const handleDelete = () => {
      const data = [...rowData]
      const rows = data.filter(item => !item.value)
      setRowData(rows)
      if (rows.length !== data.length) {
        setShowBackdrop(true)
      }
    }
  return (
    <Container>
      {showBackdrop && <Backdrop onCancel={() => setShowBackdrop(false)}/>}
      <UndoContainer style={{transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)'}}>
        <div className='activity'>Activity deleted</div>
        <div className='undo' onClick={() => setShowBackdrop(false)}>
          <p>Undo</p>
          <Image src={close} alt='close'/>
        </div>
      </UndoContainer>
      <div className='log'>
        <p>Activity Log</p>
        <div onClick={() => setShowDropdown(!showDropdown)} className='filter'>
            <div>Filter</div>
            {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
        </div>
        {showDropdown && (
            <ul>
              <li>Recent</li>
              <li>Popular</li>
              <li>A week ago</li>
              <li>Less than 2 weeks</li>
              <li>Last 30 days</li>
            </ul>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>User ID</th>
            <th>Action</th>
            <th>Date</th>
            <th onClick={handleDelete}><Image src={trash} alt='trash'/></th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((data) => (
            <tr className='row' key={data.id}>
              <td>{data.id}</td>
              <td>{data.name.map((name, index) => (
                <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}} key={index}>
                  <Image src={name.profile} alt='profile'/>
                  <p>{name.user}</p>
                </div>
              ))}</td>
              <td>{data.userId}</td>
              <td>{data.action}</td>
              <td>{data.date}</td>
              <td><input type="checkbox" id={data.id} checked={data.value} onChange={handleCheckbox}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default Activities