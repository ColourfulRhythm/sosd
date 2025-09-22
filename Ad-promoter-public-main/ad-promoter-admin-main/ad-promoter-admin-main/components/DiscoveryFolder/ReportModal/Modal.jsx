import React, { useState } from 'react'
import Image from 'next/image'
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import { ModalContainer } from './ModalStyle'

const Modal = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [listValue, setListValue] = useState('It has gory images')
    const ClickedList = (e) =>{
      setListValue(e.target.innerText)
      console.log(listValue);
    }
  return (
    <ModalContainer>
      <div className='report'>
        <p className='advert'>Report Advert</p>
        <p className='reason'>Tell us why you want to report this advert?</p>
      </div>
      <div className='language'>Why are you reporting this advert</div>
      <div className='inputArea' onClick={() => setShowDropdown(!showDropdown)}>
        <div className='inputText'>{listValue}</div>
        {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
      </div>
      {showDropdown && (
        <ul>
            <li onClick={ClickedList}>It has gory images</li>
            <li onClick={ClickedList}>It is a scam advert</li>
            <li onClick={ClickedList}>It has nudity or sexual content</li>
            <li onClick={ClickedList}>Other reasons</li>
        </ul>
      )}
      <div className='reportButton'>
        <button>Send Report</button>
      </div>
    </ModalContainer>
  )
}

export default Modal
