import styled from 'styled-components';

export const Overlay = styled.div`
  /* width: 63.4rem;
  height: 65.5rem; */
  padding: 4rem 0;
  margin: 2rem 0;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    .img {
      width: 19.3rem;
      height: 19.4rem;
      img {
        width: 100%;
      }
    }
    h3 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      color: var(--black-2);
    }
    p {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: var(--dark-gray);
      width: 50%;
      text-align: center;
    }
    .btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1.40969rem 11.0132rem;
      gap: 0.881rem;
      box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
      border-radius: 10.5727px;
      /* background: #d3bff3; */
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 1.9rem;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
      background: var(--primary);
      &:active {
        background: #3d019d;
      }
    }
  }
`;
export const SuccessMobile = styled.div`
  display: none;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  @media screen and (max-width: 425px) {
    display: block;
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
  h3 {
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.6rem;
    text-align: center;
  }
  .img {
    width: 19.3rem;
    height: 19.4rem;
    img {
      width: 100%;
    }
  }
  p {
    font-size: 1.4rem;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 16.652rem;
    height: 4.719rem;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 10.5727px;
    /* background: #d3bff3; */
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    background: var(--primary);
    &:active {
      background: #3d019d;
    }
  }
`;
