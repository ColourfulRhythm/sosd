import React from 'react'
import DetailedAdRec from './DetailedAdRec'
import { DiscoveryContainer } from './discovery.style'
import LinkAdRec from './LinkAdRec'
import VisualAdRec from './VisualAdRec'
import ScrollContainer from 'react-indiana-drag-scroll'

const DiscoveryJob = ({clickShow}) => {
  return (
    <DiscoveryContainer>
      <h3 style={{fontWeight: 'bold', fontSize: '2rem',marginBottom:'1rem'}}>Recommended Jobs</h3>
      <ScrollContainer className="scroll-container">
        <LinkAdRec click={clickShow}/>
        <VisualAdRec click={clickShow}/>
        <DetailedAdRec click={clickShow}/>
        <LinkAdRec click={clickShow}/>
        <VisualAdRec click={clickShow}/>
        <DetailedAdRec click={clickShow}/>
      </ScrollContainer>
    </DiscoveryContainer>
  )
}

export default DiscoveryJob
