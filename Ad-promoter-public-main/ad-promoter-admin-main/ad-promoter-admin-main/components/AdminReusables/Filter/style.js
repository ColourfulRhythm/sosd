import styled from 'styled-components';

export const FilterStyle = styled.div`

.filter {
        background-color: white;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.4rem 2.4rem;
        margin-bottom: 5rem;

        p {
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 2.4rem;
        }
      }
      ul {
        background-color: var(--white);
        position: absolute;
        top: 18rem;
        right: 2.3rem;
        border-radius: 0.8rem;
        box-shadow: var(--shadow-1);
        width: 41.6rem;
        z-index: 100;

        li {
          padding: 1.2rem 2.4rem;
          border-bottom: 0.1rem solid #d9d9d9;
          cursor: pointer;
        }
      }

      @media screen and (max-width: 1024px)
      {
        .filter-group {
    position: relative;
  }

  .filter {
    background-color: #f1f1f1;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    min-width: 15rem;
    justify-content: end;
    padding: 1.4rem 2.4rem;
    margin-left: auto;

    p {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.4rem;
    }
  }
  ul {
    background-color: var(--white);
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-1);
    width: 41.6rem;
    max-width: 70%;
    z-index: 100;
    font-size: 16px;

    li {
      padding: 1.2rem 2.4rem;
      border-bottom: 0.1rem solid #d9d9d9;
      cursor: pointer;
    }
  }

      }


    .filter-option
    {
      &:hover {
        background-color: #EAEAEA;
      }
    }

    .filter-button
    {
        cursor: pointer;
}
`;
