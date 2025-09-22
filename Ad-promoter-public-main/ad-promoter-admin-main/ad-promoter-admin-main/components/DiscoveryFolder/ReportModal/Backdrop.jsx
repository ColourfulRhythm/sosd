import React from 'react'
import { BackdropContainer } from './ModalStyle'

const Backdrop = ({onCancel}) => {
  return (
    <BackdropContainer onClick={onCancel}></BackdropContainer>
  )
}

export default Backdrop
