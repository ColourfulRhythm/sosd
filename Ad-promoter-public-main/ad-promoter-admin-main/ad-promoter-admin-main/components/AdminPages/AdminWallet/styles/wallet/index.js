import styled from 'styled-components';

export const WalletDropdownStyles = styled.div`
  width: 7.1rem;
  border-radius: 0.5rem;
  box-shadow: 1px 3px 29px rgba(0, 0, 0, 0.05);
  padding-top: 0.7rem 0;
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

 export const WalletStyles = styled.div`
  background: var(--white);
  box-shadow: var(--shadow-6);
  border-radius: 0.6rem;
  padding: 1.5rem;
  height: fit-content;
  max-width: 42.8rem;
  position: relative;
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 100%;
    margin-top: 2rem;
  }

  .process-withdraw
  {
    color : white;
    margin-left: 1rem;
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
      justify-content: space-between;
      width: 20rem;
    }

    &__select {
      width: 100px;
      position: relative;

      input[type='checkbox'] {
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

  .container:hover {
    border: 0.07rem solid #dce4ff;
  }

  .bank1 {
    margin-bottom: 2.8rem;
  }

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

  .buttonContainer {
    margin-top: 5.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      background: #4f00ce;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      display: flex;
      cursor: pointer;

      p {
        color: #fff;
        font-weight: 500;
        line-height: 1.5rem;
        margin-left: 0.8rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

export const WalletStylesMobile = styled.div`
background: var(--white);
box-shadow: var(--shadow-6);
border-radius: 0.6rem;
padding: 1.5rem;
height: fit-content;
width: 100%;
position: relative;

.bank-types
{
  margin-top: 3rem;
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
    justify-content: space-between;
    width: 20rem;
  }

  &__select {
    width: 100px;
    position: relative;

    input[type='checkbox'] {
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

.container:hover {
  border: 0.07rem solid #dce4ff;
}

.bank1 {
  margin-bottom: 2.8rem;
}

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

.buttonContainer {
  margin-top: 5.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    background: #4f00ce;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    display: flex;
    cursor: pointer;

    p {
      color: #fff;
      font-weight: 500;
      line-height: 1.5rem;
      margin-left: 0.8rem;
      margin-top: 0.5rem;
    }
  }
}
`;

export const AdminWalletStyles = styled.div`
  padding: 3.3rem 2.5rem 1.3rem 2.5rem;
  display: flex;
  gap: 1.5rem 2rem;
  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const AdminWalletContainer = styled.div`
  display: flex;
  // flex-direction: ${(props) => (props.admin ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.admin ? '3.3rem 0 1.3rem 0' : '0')};
`;

export const MobileWallet = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #fcfcfc;

  h2 {
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: 0.38px;
    color: #0d0d0d;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .balance {
    grid-column: 1 / -1;
    padding-top: 2.4rem;
    padding-bottom: 2.4rem;
    border-radius: 1.2rem;
  }
  .card {
    padding-top: 2.4rem;
    padding-bottom: 2.4rem;
    border-radius: 1.2rem;
    width: 18.4rem;
    @media screen and (max-width: 400px) {
      width: 16rem;
    }
  }
  .amount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
      color: #333333;
    }
  }
  .icon {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    p {
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.24px;
      color: #333333;
    }
  }
  .add-wallet {
    background-color: white;
    padding: 1.6rem;
    border-radius: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .add {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-weight: 600;
      font-size: 1.7rem;
      line-height: 2.2rem;
      color: #0d0d0d;
      letter-spacing: -0.408px;
    }
  }
  .bank {
    height: 8.2rem;
    width: 100%;
    border: 1px solid #e1e1e1;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
  }
  .holder {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .name {
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
  }
  .withdrawal {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;
    background-color: #4f00ce;
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
    border-radius: 1.2rem;

    p {
      color: white;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.4rem;
    }
  }
  .transaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;

    p {
      font-weight: 600;
      font-size: 1.7rem;
      line-height: 2.2rem;
      letter-spacing: -0.408px;
      color: #0d0d0d;
    }
  }
`;
