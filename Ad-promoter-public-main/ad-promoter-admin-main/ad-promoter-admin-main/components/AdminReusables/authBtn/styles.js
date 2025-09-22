import styled from 'styled-components';

export const StyledBtn = styled.div`
  outline: none;
  border-radius: 40px;
  .btn-sm {
    width: 46rem;
    height: 5.6rem;
    border-radius: 40px;
    /* background: #d3bff3; */
    background: var(--primary);
    /* opacity: 0.25; */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 425px) {
      width: 100%;
    }
    &:hover {
      /* opacity: none; */
      background: #3d019d;
    }
    &:active {
      background: #3d019d;
    }
    p {
      color: #fff;
      font-weight: 400;
      font-size: 1.8rem;
      line-height: 27px;
    }
  }
  .btn-lg {
    width: 52.8rem;
    height: 6.4rem;
    background: var(--primary);
    /* opacity: 0.25; */
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 27px;
    @media screen and (max-width: 767px) {
      width: 93vw;
      height: 4.8rem;
    }
    &:hover {
      background: #3d019d;
      /* opacity: 0; */
    }
    &:active {
      background: #3d019d;
    }
  }
  .btn-lg-inactive {
    background: #d3bff3;
    width: 52.8rem;
    height: 6.4rem;
    /* background: var(--primary); */
    /* opacity: 0.25; */
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 27px;
    @media screen and (max-width: 767px) {
      width: 93vw;
      height: 4.8rem;
    }
  }
`;
