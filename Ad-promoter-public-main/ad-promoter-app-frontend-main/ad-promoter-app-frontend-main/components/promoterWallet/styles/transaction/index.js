import styled from 'styled-components';

export const TransactionHistoryStyles = styled.div`
  background: var(--white);
  max-width: 88.7rem;
  box-shadow: var(--shadow-6);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  // align-items: center;
  /* min-height: 700px; */
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 100%;
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

    button {
      background: transparent;
      cursor: pointer;
      border: 2px solid var(--primary);
      border-radius: 0.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 19rem;

      .statement {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.2rem;
        color: var(--primary);
        display: flex;
        justify-content: space-between;
        width: 15rem;

        p {
          padding-top: 0.5rem;
        }
      }
    }
  }

  .transactionContainer {
    overflow-y: scroll;
    max-height: 600px;
    background: #f4f4f4;
    cursor: grab;
  }
`;

export const TransactionStyles = styled.div`
  background: #fff;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  height: ${(props) => {
    props.show ? '72px' : '100px';
  }};

  .container {
    display: grid;
    // justify-content: space-between;
    grid-template-columns: repeat(4, 1fr);
    gap: 4.4rem;
    padding: 1.2rem;

    &__profile {
      display: flex;
      align-items: cen;
      width: 17rem;

      img {
        width: 2.5rem;
        height: 2.5rem;
      }

      p {
        color: var(--deep-blue);
        font-weight: 500;
        line-height: 150%;
        font-size: 1.6rem;
        letter-spacing: -0.03em;
        margin-left: 1rem;
        height: fit-content;
        margin-top: 1rem;
      }
    }

    &__transaction {
      display: flex;
      justify-content: space-between;
      color: var(--black);
      font-weight: 500;
      line-height: 150%;
      letter-spacing: -0.03em;
      height: fit-content;
      margin-top: 1rem;
      width: 35rem;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 30rem;
      }
      .transaction-date {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 150%;
        letter-spacing: -0.03em;
        color: var(--black);
      }
      .transaction-amount {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 150%;
        letter-spacing: -0.03em;
        color: var(--black);
      }
    }

    &__rotate {
      transform: rotate(90deg);
      margin-top: 1rem;
      transition: all 0.5s ease;
    }

    &__arrow {
      cursor: pointer;
    }
  }

  .failed {
    background: #eb1e1e;
    color: #fff;
    width: 9.5rem;
    /* width: 100%; */
    height: 2.3rem;
    /* height: 100%; */
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    margin-top: 1rem;
    border: 1px solid #dbd8fc;
    border-radius: 10rem;
    padding: 0.4rem 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
  }

  .complete {
    background: var(--green-2);
    color: #fff;
    width: 9.5rem;
    /* width: 100%; */
    height: 2.3rem;
    /* height: 100%; */
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    margin-top: 1rem;
    border: 1px solid #dbd8fc;
    border-radius: 10rem;
    padding: 0.4rem 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
  }

  .progress {
    background: var(--light-blue-1);
    color: #fff;
    width: 9.9rem;
    /* width: 100%; */
    height: 2.3rem;
    /* height: 100%; */
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    margin-top: 1rem;
    border: 1px solid #dbd8fc;
    border-radius: 10rem;
    padding: 0.4rem 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
  }
`;

export const TransactionDropdownStyles = styled.div`
  background: #fff;
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5rem;

  h3 {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 0.25rem;
    color: var(--black-1);
  }

  p {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    margin-top: 0.25rem;
    color: var(--dark-gray);
  }

  button {
    background: var(--primary);
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.2rem 2.4rem;
    /* width: 9rem; */
    cursor: pointer;
    @media (min-width: 768px) and (max-width: 1024px) {
      padding: 1rem;
    }

    p {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: var(--white);
      margin-left: 0.8rem;
    }
  }
`;
