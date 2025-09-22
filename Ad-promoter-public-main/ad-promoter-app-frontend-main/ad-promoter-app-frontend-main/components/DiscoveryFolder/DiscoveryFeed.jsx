import React from 'react'
import DetailedAd from './DetailedAd'
import LinkAd from './singleDiscoveryFeed'
import VisualAd from './VisualAd'
import { DiscoveryContainer } from './discovery.style'
import { useRef } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import SingleDiscoveryFeed from './singleDiscoveryFeed'
import useDraggableScroll from 'use-draggable-scroll';

const DiscoveryFeed = ({clickShow,isLoading,feed,fetchFeed}) => {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: 'vertical' });
  return (
    <DiscoveryContainer>
      <h3 style={{fontWeight: 'bold', fontSize: '2rem',marginBottom:'1rem'}}>Your Feed</h3>
      <div ref={ref} onMouseDown={onMouseDown} className='scroll-container'>
        <SingleDiscoveryFeed isLoading={isLoading} feed={feed} fetchFeed={fetchFeed} click={clickShow}/>
      </div>
    </DiscoveryContainer>
  )
}

export default DiscoveryFeed
