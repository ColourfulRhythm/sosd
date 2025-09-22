import React from 'react'
import DetailedAd from './singleRecentJob'
import LinkAd from './singleSavedJobs'
import { Container } from './styles'
import VisualAd from './VisualAd'
import SingleRecentJob from './singleRecentJob'

const recent = ({sortStartDate,setSortStartDate,setSortEndDate,sortEndDate}) => {
  return (
    <Container>
      <SingleRecentJob 
        sortStartDate={sortStartDate}
        setSortStartDate={setSortStartDate}
        setSortEndDate={setSortEndDate}
        sortEndDate={sortEndDate}
      />
    </Container>
  )
}

export default recent