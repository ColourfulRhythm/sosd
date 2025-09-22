import styled from 'styled-components';

export const WalletSummaryStyles = styled.div`
  background: var(--white);
  max-width: 88.5rem;
  box-shadow: var(--shadow-6);
  border-radius: 0.6rem;
  padding: 1.5rem;
  position: relative;

  .intro {
    display: ${(props) => (props.admin ? 'block' : 'flex')};
    justify-content: space-between;
    margin-bottom: 2.25rem;

    h1 {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.25rem;
    }

    &__filter {
      display: flex;
      justify-content: space-between;
      border: 1px solid #dbd8fc;
      border-radius: 0.6rem;
      padding: 0.8rem 1.5rem;
      width: 17.5rem;
      cursor: pointer;

      p {
        color: var(--black-3);
        font-size: 1.3rem;
        padding-top: 0.3rem;
      }

      .rotate {
        transform: rotate(-180deg);
        transition: all 0.5s ease;
      }
    }
  }

  .cardContainer {
    display: flex;
    gap: 2rem;
  }
`;

export const MobileWalletSummaryStyles = styled.div`
  background: var(--white);
  width: 100%;
  box-shadow: var(--shadow-6);
  border-radius: 0.6rem;
  padding: 1.5rem;
  position: relative;

  .intro {

    h1 {
      font-weight: 600;
      font-size: 2rem;
      text-align: center;
    }

    &__filter {
      display: flex;
      justify-content: space-between;
      border: 1px solid #dbd8fc;
      border-radius: 0.6rem;
      padding: 0.8rem 1.5rem;
      width: 17.5rem;
      cursor: pointer;

      p {
        color: var(--black-3);
        font-size: 1.3rem;
        padding-top: 0.3rem;
      }

      .rotate {
        transform: rotate(-180deg);
        transition: all 0.5s ease;
      }
    }
  }

  .cardContainer {
    display: flex;
    justify: space-between;
    gap: 2rem;
  }
`;


export const CardStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0;
  width: 30rem;
  border-radius: 0.75rem;
  background: var(${(props) => props.bg});
  box-shadow: var(${(props) => props.shadow});

  .header {
    display: flex;
    justify-content: center;
    color: var(--black);

    p {
      font-weight: 500;
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }
  }

  .amount {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.3rem;
    margin-top: 1.1rem;
  }
`;

export const CardStylesMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0;
  width: 100%;
  margin-top: 2rem;
  border-radius: 0.75rem;
  background: var(${(props) => props.bg});
  box-shadow: var(${(props) => props.shadow});

  .header {
    text-align : center;
    color: var(--black);

    p {
      font-weight: 500;
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }
  }

  .amount {
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 2.3rem;
    margin-top: 1.1rem;
  }
`;


export const FilterDropdownStyles = styled.div`
  background: #fff;
  position: absolute;
  top: 6rem;
  right: 1.8rem;
  border-radius: 0.7rem;
  box-shadow: 4px 4px 12px rgba(39, 58, 123, 0.25);
  width: 17rem;

  ul {
    padding: 0.7rem 0;
  }

  li {
    color: var(--black-3);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    border-bottom: 0.5px solid #dbd8fc;
    padding: 0.7rem 1.5rem;
    cursor: pointer;
  }

  li:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;
