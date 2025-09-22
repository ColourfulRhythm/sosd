import styled from 'styled-components';

export const WithdrawProcessStyles = styled.div`
  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
  }

  .close {
    text-align: end;

    @media screen and (max-width: 1024px) {
      margin: 1rem 1rem 0 0;
    }

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  form {
    margin-top: 1.1rem;

    h2 {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 2.2rem;
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
        width: 37.8rem;

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

          input[type='checkbox'] {
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

          input[type='checkbox']:checked ~ .checkmark {
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
        @media screen and (max-width: 1024px) {
          width: 37.8rem !important;
          margin: auto;
        }

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
        width: 100%;
        text-align: right;
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
  }
`;

export const WithdrawalDetailsStyles = styled.div`
  position: relative;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    padding: 0 1rem;
  }

  .bold {
    font-weight: 600;
  }

  .header {
    display: flex;
    justify-content: center;
    padding-top: 2.1rem;
    margin-bottom: 1.8rem;
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--black-1);
    }

    button {
      color: #5c85ff;
      font-size: 1.1rem;
      font-weight: 600;
      background: transparent;
      cursor: pointer;
      position: absolute;
      right: 0;

      @media screen and (max-width: 1024px) {
        right: 1rem;
      }
    }
  }

  .withdrawal {
    &__details {
      margin: 1.5rem 0;
      font-size: 1rem;
      color: var(--dark-grey);
      display: flex;
      justify-content: space-around;

      ul {
        li {
          margin-bottom: 0.7rem;
        }

        .flex {
          display: flex;

          p {
            margin-left: 0.6rem;
          }
        }
      }
    }

    &__total {
      .amount {
        margin: 1.5rem 0;
        font-size: 1rem;
        color: var(--dark-grey);
        display: flex;
        justify-content: space-around;

        ul {
          li {
            margin-bottom: 0.7rem;
          }
        }
      }
    }

    &__notice {
      font-size: 1rem;
      margin-top: 1.5rem;
      text-align: center;
      padding: 0 4rem;
      color: var(--dark-grey);
    }
  }

  .confirm {
    text-align: center;
    margin-top: 3.6rem;
    font-size: 1rem;
    color: var(--dark-grey);

    input {
      margin-right: 1.1rem;
    }
  }
`;

export const WithdrawalFundsStyles = styled.div`
  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    padding: 0 1rem;
  }

  .bold {
    font-weight: 600;
  }

  .close {
    text-align: end;
    @media screen and (max-width: 1024px) {
      margin: 1rem 1rem 0 0;
    }

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .loading {
    text-align: center;
    margin-top: 0.6rem;
    width: 135.3px;
    margin: auto;
  }

  .funds {
    /* margin-top: 10.5rem; */

    &__header {
      text-align: center;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
      }

      p {
        font-size: 1rem;
      }
    }

    &__message {
      font-size: 1rem;
      text-align: center;
      margin-top: 1.8rem;
    }

    &__withdrawal {
      margin-top: 1.8rem;

      .summary {
        display: flex;
        justify-content: space-around;
        font-size: 1rem;
        color: var(--dark-grey);
        margin: 1.5rem 0;

        ul {
          li {
            margin-bottom: 0.7rem;
          }

          .flex {
            display: flex;

            div {
              margin-left: 0.6rem;
            }
          }
        }
      }
    }

    &__amount {
      display: flex;
      justify-content: space-around;
      font-size: 1rem;
      color: var(--dark-grey);
      margin-top: 1.5rem;
      margin-bottom: 2.5rem;
    }

    &__home {
      text-align: center;
      margin-top: 1.5rem;
      margin-bottom: 2.5rem;

      .cancel {
        border-radius: 8px;
        background: transparent;
        border: 1px solid #b3b3b3;
        padding: 0.7rem 2.2rem;
        font-size: 1rem;
        font-weight: 600;
        margin-right: 1rem;
        cursor: pointer;
      }

      .confirm {
        background: var(--primary);
        border-radius: 8px;
        color: var(--white);
        padding: 0.7rem 2.2rem;
        font-size: 1rem;
        font-weight: 600;
        margin-left: 1rem;
        cursor: pointer;
      }

      a {
        background: #4f00ce;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: var(--white);
        font-weight: 700;
        line-height: 1.5rem;
        font-size: 1rem;
        width: 15.3rem;
        cursor: pointer;
      }
    }

    &__notice {
      margin-top: 1.5rem;
      font-size: 1rem;
    }
  }
`;

export const PaymentDetailsStyles = styled.div`
  width: 57.4rem;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
  }

  .close {
    text-align: end;

    @media screen and (max-width: 1024px) {
      margin: 1rem 1rem 0 0;
    }

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      text-align: center;
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      color: #2c2828;
    }

    form {
      margin-top: 4.1rem;
      width: 37.6rem;
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

    .submit {
      text-align: center;

      button {
        background: #4f00cf;
        box-shadow: var(--shadow-6);
        border-radius: 0.8rem;
        color: var(--white);
        font-size: 1.6rem;
        line-height: 1.9rem;
        font-weight: 700;
        width: 20.5rem;
        padding: 1.4rem 0;
        cursor: pointer;
      }
    }
  }
`;

export const VerificationStyles = styled.div`
  padding: 2rem 1.5rem 1.5rem;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    margin-top: 2rem;
    justify-content: center;
  }

  .close {
    text-align: end;

    @media screen and (max-width: 1024px) {
      margin: 1rem 1rem 0 0;
    }

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .container {
    margin-top: 2rem;

    h2 {
      text-align: center;
      font-size: 2.4rem;
      line-height: 2.1rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--black-1);
    }

    &__info {
      margin-top: 1.3rem;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 1.8rem;
      letter-spacing: -0.02em;
      width: 453px;
      text-align: center;
      color: var(--dark-gray);

      @media screen and (max-width: 1024px) {
        width: 100vw;
      }
    }

    &__number {
      margin-top: 1.4rem;
      font-size: 1.4rem;
      line-height: 1.8rem;
      font-weight: 400;
      color: var(--dark-gray);
      text-align: center;
      letter-spacing: -0.02em;

      .hashed {
        font-weight: 600;
      }
    }

    &__code {
      margin-top: 1.4rem;
      text-align: center;

      p {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: var(--dark-gray);
        letter-spacing: -0.02em;
        margin-bottom: 1rem;
      }

      .codebox {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.7rem;
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
    }

    &__submit {
      display: flex;
      flex-direction: column;
      width: 25.7rem;
      align-items: center;
      margin: 4rem auto;
      .active {
        background-color: var(--primary);
      }
      button {
        background: #d3b8ff;
        box-shadow: var(--shadow-6);
        border-radius: 0.5rem;
        color: var(--white);
        font-size: 1rem;
        font-weight: 600;
        padding: 1.2rem 3.6rem;
        cursor: pointer;
        margin-bottom: 0.5rem;
        width: 162px;
      }
      p {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 1.8rem;
        letter-spacing: -0.02em;
        color: var(--dark-gray);
        width: 25.7rem;
        text-align: center;
      }
    }
  }
`;

export const SuccessStyle = styled.div`
  width: 57.4rem;
  height: 45rem;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
  }

  .close {
    text-align: end;

    @media screen and (max-width: 1024px) {
      margin: 1rem 1rem 0 0;
    }

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      text-align: center;
      font-size: 2.4rem;
      line-height: 3.6rem;
      font-weight: 600;
      color: var(--black-2);
    }

    &__home {
      display: flex;
      align-items: center;
      flex-direction: column;

      .success {
        width: 193px;
        height: 194px;
        @media screen and (max-width: 1024px) {
          width: unset;
          height: unset;
        }
      }
      img {
      }

      p {
        color: var(--dark-gray);
        font-weight: 400;
        font-size: 1.4rem;
        letter-spacing: -0.02em;
        line-height: 150%;
        margin-bottom: 2.5rem;
        width: 296px;
        text-align: center;
      }

      a {
        background: #4f00cf;
        box-shadow: var(--shadow-6);
        border-radius: 1.05727rem;
        color: var(--white);
        width: 16.652rem;
        height: 4.719rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 1.9rem;
      }
    }
  }
`;

export const SuccessStyleMobile = styled.div`
  max-width: 100vw;
  width: 100%;
  height: 100vh;

  .close {
    text-align: end;
    margin-right: 1rem;
    margin-top: 5rem;

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .container {
    h2 {
      text-align: center;
      font-size: 2.4rem;
      line-height: 3.6rem;
      font-weight: 600;
      color: var(--black-2);
    }

    &__home {
      display: flex;
      align-items: center;
      flex-direction: column;

      .success {
        /* width: 193px; */
        /* height: 194px; */
      }
      img {
      }

      p {
        color: var(--dark-gray);
        font-weight: 400;
        font-size: 1.4rem;
        letter-spacing: -0.02em;
        line-height: 150%;
        margin-bottom: 2.5rem;
        width: 296px;
        text-align: center;
      }

      a {
        background: #4f00cf;
        box-shadow: var(--shadow-6);
        border-radius: 1.05727rem;
        color: var(--white);
        width: 16.652rem;
        height: 4.719rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 1.9rem;
      }
    }
  }
`;
