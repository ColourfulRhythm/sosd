import React, { useState } from 'react'
import Image from 'next/image'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import { Filterstyled, Container, DiscoveryPageContainer, Desktop } from './discovery.style'
import DiscoveryFeed from './DiscoveryFeed'
import DiscoveryJob from './DiscoveryJob'
import Modal from './ReportModal/Modal'
import Backdrop from './ReportModal/Backdrop'

const DiscoveryPage = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showReport, setShowReport] = useState(false)

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
                        <svg class="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20"
                            height="20" viewBox="0 0 30 30">
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971  23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                        </path>
                        </svg>
                    </span>
                    <input placeholder='Search ad niche...'/>
                </div>  
                <div className='select' onClick={() => setShowDropdown(!showDropdown)}>
                    <div>Filter</div>
                    {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
                    {showDropdown && (
                    <ul>
                        <li>Recent</li>
                        <li>Popular</li>
                        <li>Link-only Ads</li>
                        <li>Visual Ads</li>
                        <li>Detailed Ads</li>
                        <li>A week ago</li>
                        <li>Less than 2 weeks</li>
                        <li>Last 30 days</li>
                    </ul>
                )}
                </div>
            </div>
        </Filterstyled>
        <Container>
            <div className='jobs'>
                <div className='col1'>
                    <DiscoveryFeed clickShow={handleShowReport}/>
                </div>
                <div className='col2'>
                    <DiscoveryJob clickShow={handleShowReport}/>
                </div>
            </div>
        </Container>
    </Desktop>
    
  )
}

export default DiscoveryPage
