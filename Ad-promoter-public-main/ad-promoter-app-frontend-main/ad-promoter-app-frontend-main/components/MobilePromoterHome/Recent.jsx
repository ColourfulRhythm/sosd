import React, { useState } from 'react'
import { Container } from './style'
import MobileSinglePlacers from './MobileSingleRecentPlacers'
import MobileSinglePromoters from './MobileSingleRecentPromoters'
import { useRouter } from 'next/router'

const Recent = ({handleShowReport,handleAdRemoval,showReport,setShowReport,showReportModal,setShowReportModal,showDropdown,setShowDropdown,isReadMore,setIsReadMore,currentIndex,setCurrentIndex,listValue,setListValue,ClickedList,toggleReadMore,previousImage,nextImage,dashboardEndDate,dashboardStartDate,sortStartDate,setSortStartDate,setSortEndDate,sortEndDate}) => {
  const router = useRouter()
  return (
    <Container>
      {router.pathname.startsWith('/placers')?(
        <MobileSinglePlacers handleShowReport={handleShowReport} handleAdRemoval={handleAdRemoval} showReport={showReport} setShowReport={setShowReport} showReportModal={showReportModal} setShowReportModal={setShowReportModal} showDropdown={showDropdown} setShowDropdown={setShowDropdown} isReadMore={isReadMore} setIsReadMore={setIsReadMore} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} listValue={listValue} setListValue={setListValue} ClickedList={ClickedList} toggleReadMore={toggleReadMore} previousImage={previousImage} nextImage={nextImage} dashboardStartDate={dashboardStartDate} dashboardEndDate={dashboardEndDate}/ >
      ):(
        <MobileSinglePromoters 
          sortStartDate={sortStartDate}
          setSortStartDate={setSortStartDate}
          setSortEndDate={setSortEndDate}
          sortEndDate={sortEndDate}
        />
      )}
    </Container>
  )
}

export default Recent