import React from 'react'
import SingleSavedJobs from './singleSavedJobs'
import { Container } from './styles'

const SavedJobs = ({sortStartDate,setSortStartDate,setSortEndDate,sortEndDate}) => {
  return (
    <Container>
      <SingleSavedJobs 
        sortStartDate={sortStartDate}
        setSortStartDate={setSortStartDate}
        setSortEndDate={setSortEndDate}
        sortEndDate={sortEndDate}
      />
    </Container>
  )
}

export default SavedJobs