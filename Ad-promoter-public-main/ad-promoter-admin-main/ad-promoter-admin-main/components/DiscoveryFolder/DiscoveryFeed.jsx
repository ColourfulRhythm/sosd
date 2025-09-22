import React from 'react'
import DetailedAd from './DetailedAd'
import LinkAd from './LinkAd'
import VisualAd from './VisualAd'
import { DiscoveryContainer } from './discovery.style'
import { useRef } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
const DiscoveryFeed = ({clickShow}) => {
  return (
    <DiscoveryContainer>
      <h3 style={{fontWeight: 'bold', fontSize: '2rem',marginBottom:'1rem'}}>Your Feed</h3>
      <ScrollContainer className='scroll-container'>
        <LinkAd click={clickShow}/>
        <VisualAd click={clickShow}/>
        <DetailedAd click={clickShow}/>
        <LinkAd click={clickShow}/>
        <VisualAd click={clickShow}/>
        <DetailedAd click={clickShow}/>
      </ScrollContainer>
    </DiscoveryContainer>
  )
}

export default DiscoveryFeed
