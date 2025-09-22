import styled from 'styled-components';

const PromoterWalletStyles = styled.div`
  padding: 3.3rem 2.5rem 1.3rem 2.5rem;
  /* display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 22.5rem 40rem;
  gap: 1.5rem 2rem; */
  display: flex;
  gap: 1.5rem 2rem;
  /* align-items: center; */
  > div {
    display: flex;
    flex-direction: column;
    /* gap: 4rem; */
  }
`;

export default PromoterWalletStyles;

export const PromoterWalletContainer = styled.div`
  display: flex;
  // flex-direction: ${(props) => (props.admin ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.admin ? '3.3rem 0 1.3rem 0' : '0')};
  @media screen and (max-width: 425px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;
export const MobileWallet = styled.div`
  display: none;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 10rem;
  @media screen and (max-width: 425px) {
    display: block;
  }

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

export const TabWallet = styled.div`
  display: none;
  padding-left: 2rem;
  padding-right: 2rem;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
  .filter {
    display: flex;
    margin-top: 2rem;
    align-items: center;
    justify-content: space-between;
  }
  .choose {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .active {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 4.8rem;
    color: white;
    background: #4f00cf;
    border-radius: 32px;
    padding: 0 2.4rem;
  }
  .non-active {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 4.8rem;
    border: 1.5px solid #d3b8ff;
    border-radius: 32px;
    color: #333333;
    padding: 0 2.4rem;
  }
  .select {
    width: 28.1rem;
    padding: 1.2rem 2rem;
    border: 0.1rem solid var(--light-primary);
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    ul {
      background-color: var(--white);
      position: absolute;
      top: 7.5rem;
      right: 0rem;
      border-radius: 0.8rem;
      box-shadow: var(--shadow-1);
      width: 25rem;
      z-index: 100;

      li {
        padding: 1.2rem 2.4rem;
        border-bottom: 0.1rem solid #d9d9d9;
        cursor: pointer;
        /* z-index: 100; */
      }
    }
  }
  .summary {
    background-color: white;
    box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 2.4rem;
    margin-top: 2rem;

    h3 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
    }
  }
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin-top: 1.5rem;
  }
  .each {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 3rem 0;
    box-shadow: 1px 2px 4px rgba(33, 76, 95, 0.2);
    border-radius: 12px;

    h2 {
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 3.6rem;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
    }
  }
`;
