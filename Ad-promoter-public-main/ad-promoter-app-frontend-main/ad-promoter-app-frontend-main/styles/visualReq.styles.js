import styled from 'styled-components';

export const Overlay = styled.div`
  padding: 4rem 13rem;
  margin: 2rem 0;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    .welcome {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.4rem;
      &-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0px;
        gap: 0.2rem;
        h3 {
          font-weight: 500;
          font-size: 2.4rem;
          line-height: 3.6rem;
          color: var(--dark-gray);
        }
        p {
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 2.4rem;
          color: var(--dark-gray);
          a {
            text-decoration: underline;
            color: var(--gray);
          }
        }
      }
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2.4rem;
      .yes,
      .no,
      .remind {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1rem 1.6rem;
        gap: 1rem;
        border: 2px solid #f2f2f2;
        border-radius: 8px;
        width: 52.8rem;
        height: 6.2rem;
        input {
          width: 2.4rem;
          height: 2.4rem;
          border: 5px solid #f2f2f2;
        }
      }
    }
  }
`;
export const ReqMobile = styled.div`
  display: none;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  @media screen and (max-width: 425px) {
    display: block;
  }
  .logo {
    text-align: center;
  }
  h3 {
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 2.8rem;
    color: #333333;
    text-align: center;
    margin-top: 2rem;
  }
  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.078px;
    color: #333333;
    margin-top: 1.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
    margin-top: 3rem;
    .yes,
    .no,
    .remind {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1rem 1.6rem;
      gap: 1rem;
      border: 2px solid #f2f2f2;
      border-radius: 8px;
      width: 93vw;
      height: 6.2rem;
      input {
        width: 2.4rem;
        height: 2.4rem;
        border: 5px solid #f2f2f2;
      }
    }
  }
`;
