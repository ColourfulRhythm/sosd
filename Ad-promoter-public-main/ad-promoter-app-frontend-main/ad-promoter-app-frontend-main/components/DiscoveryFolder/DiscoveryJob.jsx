import React from 'react'
import DetailedAdRec from './DetailedAdRec'
import { DiscoveryContainer } from './discovery.style'
import LinkAdRec from './singleDiscoveryRecommended'
import VisualAdRec from './VisualAdRec'
import ScrollContainer from 'react-indiana-drag-scroll'
import SingleDiscoveryRecommended from './singleDiscoveryRecommended'
import useDraggableScroll from 'use-draggable-scroll';
import { useRef } from 'react'

const DiscoveryJob = ({clickShow,isLoading,recommendedJobs,fetchRecommended}) => {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: 'vertical' });
  return (
    <DiscoveryContainer>
      <div ref={ref} onMouseDown={onMouseDown} className="scroll-container">
        <SingleDiscoveryRecommended isLoading={isLoading} recommendedJobs={recommendedJobs} fetchRecommended={fetchRecommended} click={clickShow}/>
      </div>
    </DiscoveryContainer>
  )
}

export default DiscoveryJob
