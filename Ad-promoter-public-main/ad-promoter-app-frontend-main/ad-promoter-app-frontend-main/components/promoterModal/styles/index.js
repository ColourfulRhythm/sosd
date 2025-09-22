import styled from 'styled-components';

const ModalContainerStyles = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1.5rem);
  z-index: 1000;

  .content {
    background: #fff;
    border-radius: 0.6rem;
    padding: 1.6rem 2.9rem;
    /* width: 39.6rem; */
    /* width: 63.4rem; */
  }
`;

export default ModalContainerStyles;
