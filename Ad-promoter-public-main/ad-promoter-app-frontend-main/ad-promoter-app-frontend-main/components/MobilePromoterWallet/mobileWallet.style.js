import styled from 'styled-components';

export const TransactionContainer = styled.div`
  background-color: white;
  padding: 1.6rem 1.6rem 0 1.6rem;
  margin-top: 2rem;
  margin-bottom: 7rem;

  .open-close {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .failed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${(props) => (props.show ? '7.2rem' : '10rem')};
    border-bottom: 1px solid #f2f2f2;
  }
  .pass {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 7.2rem;
    border-bottom: 1px solid #f2f2f2;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: 0.08px;
      color: #141522;
    }
  }
  .status {
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }
  .time {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .date {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;

    p {
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.078px;
      color: #262626;
    }
    span {
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.078px;
      color: #808080;
    }
  }
  .dropdown {
    padding: 1rem;
  }
  .drop {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;

      h3 {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.8rem;
        color: #808080;
      }
      p {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 2.1rem;
        color: #333333;
      }
    }
  }
  button {
    background: var(--primary);
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem;
    width: 11.2rem;
    cursor: pointer;
    margin-left: auto;

    p {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: var(--white);
    }
  }
`;
export const PaymentModalContainer = styled.div`
  background-color: white;
  z-index: 500;
  position: fixed;
  top: 25%;
  left: 3%;
  width: 38.8rem;
  padding: 2.4rem;
  border-radius: 1.6rem;
  @media screen and (max-width: 390px) {
    width: 35rem;
    top: 20%;
    left: 5%;
  }
  @media screen and (max-width: 375px) {
    width: 35rem;
    left: 2%;
  }

  .details {
    text-align: center;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.6rem;
    color: #2c2828;
    margin-bottom: 2rem;
  }
  form {
    width: 100%;
    .input {
      width: 100%;

      label {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 1.8rem;
        color: var(--light-gray-1);
        color: #616161;
      }

      &__element {
        width: 100%;
        border: 1px solid #e1e1e1;
        border-radius: 0.6rem;
        margin-bottom: 2.8rem;
        padding: 0.8rem 1.2rem;
        outline: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #e0e0e0;
        letter-spacing: -0.011em;
      }
    }
  }
  .changes {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16.2rem;
    background-color: #4f00cf;
    border-radius: 0.8rem;
    color: white;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
    margin: 2rem auto;
  }
`;
export const VerificationContainer = styled.div`
  background-color: white;
  z-index: 500;
  position: fixed;
  top: 25%;
  left: 3%;
  width: 38.8rem;
  padding: 2.4rem;
  border-radius: 1.6rem;
  @media screen and (max-width: 400px) {
    width: 35rem;
    left: 5%;
  }
  @media screen and (max-width: 376px) {
    width: 35rem;
    left: 2%;
    top: 18%;
  }
  .verification {
    text-align: center;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 2.1rem;
    letter-spacing: -0.02em;
    color: #0d0d0d;
    margin-bottom: 2rem;
  }
  .instruction {
    text-align: center;
    font-size: 1.6rem;
    line-height: 1.8rem;
    letter-spacing: -0.02em;
    color: #333333;
  }
  .code {
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.8rem;
    letter-spacing: -0.02em;
    color: #333333;
    margin-top: 2rem;
  }
  .number {
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.8rem;
    letter-spacing: -0.02em;
    color: #333333;
    margin-top: 1rem;
    font-weight: 600;
  }
  form {
    margin-top: 1.2rem;
  }
  .codebox {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    width: fit-content;
    padding: 0 0.5rem;
    margin-left: 6.5rem;
    margin-top: 0.7rem;
    margin: auto;

    input {
      width: 3.6rem;
      height: 3.6rem;
      text-align: center;
      border: 1px solid #cccccc;
    }

    input:focus {
      border-color: #4f00cf;
    }
  }
  button {
    margin: 4rem auto 1rem auto;
    background: #d3b8ff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    width: 16.2rem;
    color: white;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2.1rem;
    letter-spacing: -2%;
  }
  .active {
    background-color: #4f00cf;
  }
  .receive {
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.8rem;
    letter-spacing: -0.02em;
    color: #333333;
  }
`;
export const SuccessContainer = styled.div`
  background-color: white;
  z-index: 500;
  position: fixed;
  top: 25%;
  left: 3%;
  width: 38.8rem;
  padding: 2.4rem;
  border-radius: 1.6rem;
  @media screen and (max-width: 400px) {
    width: 35rem;
    left: 5%;
  }
  @media screen and (max-width: 376px) {
    width: 35rem;
    left: 2%;
    top: 18%;
  }
  .success {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    p {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      color: #2c2828;
      text-align: center;
    }
  }
  .gif {
    width: 19.3rem;
    height: 19.4rem;
  }
  p {
    font-size: 1.4rem;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.02em;
    color: #333333;
  }
  a {
    background: #4f00cf;
    box-shadow: var(--shadow-6);
    border-radius: 1.05727rem;
    color: var(--white);
    width: 16.2rem;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
    margin: 1rem auto;
  }
`;
export const WithdrawContainer = styled.div`
  background-color: white;
  z-index: 500;
  position: fixed;
  top: 20%;
  left: 3%;
  width: 38.8rem;
  padding: 1.6rem 2.4rem;
  border-radius: 1.6rem;
  @media screen and (max-width: 400px) {
    width: 35rem;
    left: 5%;
    top: 15%;
  }
  @media screen and (max-width: 376px) {
    width: 35rem;
    left: 2%;
    top: 5%;
  }

  .withdraw {
    text-align: center;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 150%;
    color: #0d0d0d;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
  }
  .acct {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 1rem; */

    &__clicked {
      background: #dce4ff;
      border: 1.275px solid var(--light-blue);
      border-radius: 1.275rem;
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border: 1.275px solid #ebebed;
      /* padding: 1.2rem 1.5rem; */
      width: 100%;
      padding: 2.04rem 2.55rem;
      border-radius: 1.275rem;
      cursor: pointer;

      .acctDetails {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        /* width: 20rem; */
        gap: 3.06rem;

        > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.255rem;
          .acctName {
            font-weight: 400;
            font-size: 1.4rem;
            line-height: 2.3rem;
            letter-spacing: -0.02em;
            color: var(--unknown-5);
          }

          .acctNum {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.3rem;
            letter-spacing: -0.02em;
            color: var(--black);
          }
        }
      }

      .select {
        position: relative;
        width: 50px;

        input[type='radio'] {
          opacity: 0;
          cursor: pointer;
          width: 100%;
          z-index: 1000;
          position: absolute;
          top: 0.6rem;
          left: 1.5rem;
        }

        .checkmark {
          width: 1.6rem;
          height: 1.6rem;
          background: transparent;
          border: 1px solid #b5bcc6;
          position: absolute;
          border-radius: 50%;
          left: 3.2rem;
          top: 0.5rem;
        }

        input[type='radio']:checked ~ .checkmark {
          background: var(--light-blue);
        }

        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }

        input[type='radio']:checked ~ .checkmark:after {
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

    &__container:hover {
      border: 0.07rem solid #dce4ff;
    }

    &__bank1 {
      margin-bottom: 2.8rem;
    }
  }
  .amountInput {
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;

    .input-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
      width: 100%;
      label {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: var(--dark-gray);
      }

      input {
        width: 100%;
        border-radius: 0.6rem;
        border: 1px solid #e1e1e1;
        height: 5rem;
        padding-left: 2rem;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type='number'] {
        -moz-appearance: textfield;
      }
    }

    .balance-container {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      .balance {
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 1.9rem;
        color: #9e9e9e;
      }
      .balance-amount {
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 1.9rem;
        letter-spacing: 0.03em;
        color: #404040;
      }
    }
  }
  .withdraw-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    width: 24.4rem;
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
    margin: 2rem auto;
    background-color: #4f00ce;
    border-radius: 1.2rem;

    p {
      color: white;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.4rem;
    }
  }
`;
export const DetailsContainer = styled.div`
  background-color: white;
  z-index: 500;
  position: fixed;
  top: 15%;
  left: 3%;
  width: 38.8rem;
  padding: 1.6rem 2.4rem;
  border-radius: 1.6rem;
  @media screen and (max-width: 400px) {
    width: 35rem;
    left: 5%;
    top: 10%;
  }
  @media screen and (max-width: 376px) {
    width: 35rem;
    left: 2%;
    top: 2%;
  }

  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #b3b3b3;
    padding-bottom: 3rem;
    margin-top: 5rem;

    p {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
      color: #0d0d0d;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #5c85ff;
    }
  }
  .to {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
    margin-top: 2rem;
    border-bottom: 1px solid #b3b3b3;
  }
  .destination {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .with {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .gtb {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .fee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 4rem;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .warning {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
  }
  .confirm {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 3.5rem;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .withdraw-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    width: 24.4rem;
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
    margin: 4rem auto;
    background-color: #4f00ce;
    border-radius: 1.2rem;

    button {
      color: white;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.4rem;
    }
  }
`;
export const FundsContainer = styled.div`
  background-color: white;
  z-index: 500;
  position: fixed;
  top: 3%;
  left: 3%;
  width: 38.8rem;
  padding: 1.6rem 2.4rem;
  border-radius: 1.6rem;
  @media screen and (max-width: 400px) {
    width: 35rem;
    left: 5%;
    top: 8%;
  }
  @media screen and (max-width: 376px) {
    width: 35rem;
    left: 2%;
    top: 2%;
    padding: 0.5rem 2.4rem;
  }
  .funds {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    @media screen and (max-width: 400px) {
      gap: 0.7rem;
    }

    .sucess-mark {
      width: 19.2rem;
      height: 19rem;
      @media screen and (max-width: 400px) {
        height: 15rem;
      }
      @media screen and (max-width: 376px) {
        height: 14rem;
      }
    }
    p {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #0d0d0d;
    }
    span {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .check {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
    padding-bottom: 2rem;
    border-bottom: 1px solid #b3b3b3;
    @media screen and (max-width: 400px) {
      margin-top: 1rem;
    }
  }
  .to {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
    margin-top: 2rem;
    border-bottom: 1px solid #b3b3b3;
    @media screen and (max-width: 400px) {
      gap: 1rem;
      margin-top: 1rem;
    }
  }
  .destination {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .with {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .gtb {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .fee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 4rem;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .third {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
    @media screen and (max-width: 400px) {
      margin-top: 1rem;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #4f00cf;
    width: 11.4rem;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    margin: 5rem auto 2rem auto;
    @media screen and (max-width: 400px) {
      margin: 2rem auto 1rem auto;
    }
  }
`;
export const FailedContainer = styled.div`
  margin-top: 10rem;
  @media screen and (max-width: 400px) {
    margin-top: 0.5rem;
  }
  .funds {
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #0d0d0d;
    text-align: center;
  }
  .review {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
    @media screen and (max-width: 400px) {
      margin-top: 0.5rem;
    }
  }
  .complete {
    text-align: center;
    margin-top: 3rem;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
    padding-bottom: 2rem;
    border-bottom: 1px solid #b3b3b3;
    @media screen and (max-width: 400px) {
      margin-top: 1.5rem;
    }
    @media screen and (max-width: 376px) {
      margin-top: 0.7rem;
    }
  }
  .to {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
    margin-top: 2rem;
    border-bottom: 1px solid #b3b3b3;
    @media screen and (max-width: 400px) {
      margin-top: 1rem;
      gap: 1rem;
      padding-bottom: 1rem;
    }
    @media screen and (max-width: 376px) {
      margin-top: 0.5rem;
    }
  }
  .destination {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .with {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .gtb {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .fee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 4rem;

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
    span {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .third {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
    @media screen and (max-width: 400px) {
      margin-top: 1rem;
    }
  }
  .confirm {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 3.5rem;
    @media screen and (max-width: 400px) {
      margin-top: 1.5rem;
    }

    p {
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
    }
  }
  .cancel-confirm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid #b3b3b3;
    @media screen and (max-width: 400px) {
      margin-top: 2rem;
    }

    .cancel-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: 1px solid #b3b3b3;
      width: 12.2rem;
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #333333;
      border-radius: 8px;
    }
    .confirm-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #4f00cf;
      border-radius: 8px;
      width: 19.4rem;
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: white;
      @media screen and (max-width: 400px) {
        width: 16rem;
      }
    }
  }
  .process {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 1.2rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #333333;
  }
`;
