import styled from 'styled-components';

export const WalletDropdownStyles = styled.div`
  width: 7.1rem;
  border-radius: 0.5rem;
  box-shadow: 1px 3px 29px rgba(0, 0, 0, 0.05);
  padding-top: 0.7rem 0;
  // position: absolute;
  // top: 9rem;
  // left: 27rem;
  // display: none;
  z-index: 1;

  ul {
    font-size: 1rem;
    padding: 0 1rem;

    li {
      margin-bottom: 1rem;

      button {
        background: transparent;
        width: 100%;
        text-align: start;
        cursor: pointer;
      }
    }
  }
`;

const WalletStyles = styled.div`
  background: var(--white);
  box-shadow: var(--shadow-6);
  border-radius: 0.6rem;
  padding: 1.5rem;
  height: fit-content;
  max-width: 42.8rem;
  /* height: 486px; */
  position: relative;
  // z-index: -1;
  /* display: flex; */
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .intro {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.25rem;

    h1 {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.25rem;
    }

    &__add {
      background: transparent;
      cursor: pointer;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ebebed;
    padding: 1.2rem 1.5rem;
    border-radius: 0.8rem;

    &__acctdetails {
      display: flex;
      gap: 1rem;
      > div {
        display: flex;
        flex-direction: column;
        .acctName {
          font-size: 1rem;
          line-height: 1.8rem;
          color: #101c79;
          margin-top: 0.6rem;
        }
        .acctNum {
          font-weight: 500;
          line-height: 1.8rem;
          margin-bottom: 0.6rem;
        }
      }
    }

    &__select {
      width: 100px;
      position: relative;

      input[type='radio'] {
        opacity: 0;
        cursor: pointer;
        width: 100%;
        position: absolute;
        top: 0.6rem;
        left: 4rem;
      }

      .checkmark {
        width: 1.6rem;
        height: 1.6rem;
        background: transparent;
        border: 1px solid #b5bcc6;
        position: absolute;
        border-radius: 50%;
        left: 8.2rem;
        top: 0.5rem;
      }

      input:checked ~ .checkmark {
        background: var(--light-blue);
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }

      input[type='checkbox']:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        left: 0.5rem;
        top: 0.1rem;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }

  .clicked {
    background: #dce4ff;
    border: 1px solid var(--light-blue);
  }

  /* .container:hover {
    border: 0.07rem solid #dce4ff;
  } */

  .bank1 {
    margin-bottom: 2.8rem;
    cursor: pointer;
  }

  .buttonContainer {
    margin-top: 5.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      background: #4f00ce;
      padding: 1.6rem 1.8rem;
      border-radius: 1.2rem;
      max-height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      p {
        color: #fff;
        font-weight: 500;
        line-height: 1.5rem;
        margin-left: 0.8rem;
        margin-top: 0.5rem;
        /* font-size: 1.8rem; */
      }
    }
  }
`;

export default WalletStyles;
