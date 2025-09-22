import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 500;
  background-color: var(--white);
  width: 62.3rem;
  min-height: 42.6rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-2);
  padding: 4.8rem;
  left: 30%;
  top: 20%;

  .report {
    text-align: center;

    .advert {
      font-weight: 600;
      font-size: 2.4rem;
    }
    .reason {
      font-size: 1.2rem;
    }
  }

  .language {
    margin-top: 3rem;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .inputArea {
    width: 52.7rem;
    padding: 1.6rem 2rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0.1rem solid var(--lighter-gray);

    .inputText {
      font-weight: 500;
      line-height: 1.8rem;
      font-size: 1.2rem;
      letter-spacing: -0.02em;
      color: var(--dark-gray);
    }
  }
  ul {
    background-color: var(--white);
    border: 1px solid #dbd8fc;
    border-radius: 1rem;
    margin-top: 2rem;
    width: 52.7rem;

    li {
      padding: 1rem 2rem;
      border-bottom: 0.1rem solid #dbd8fc;
      cursor: pointer;
      font-size: 1.2rem;
      line-height: 1.8rem;
      letter-spacing: -0.02em;
      color: var(--dark-gray);
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .reportButton {
    display: flex;
    justify-content: flex-end;
    margin-top: 5rem;

    button {
      padding: 1.2rem 3.6rem;
      background-color: var(--primary);
      color: white;
      border-radius: 0.8rem;
      cursor: pointer;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      text-align: center;
    }
  }
`;
export const BackdropContainer = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
  /* backdrop-filter: blur(12px); */
`;
