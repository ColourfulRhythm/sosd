import styled from 'styled-components';

export const StyledNavBar = styled.div`
  background: var(--white);
  padding: 1.2rem 5.3rem 1rem 3.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.3rem;
  @media screen and (max-width: 425px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    padding-right: 3rem;
    padding-left: 2rem;
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8rem;
    @media (min-width: 768px) and (max-width: 1024px) {
      gap: 4rem;
    }

    .link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;
      a {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        text-transform: capitalize;
        color: var(--dark-gray-2);
      }
      .bottom-dash {
        width: 6rem;
        height: 0.3rem;
        background: #4f00cf;
        border-radius: 100px;
      }
      .activeLink {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--black-1);
      }
    }
  }

  .profile {
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    .notif {
      &-img {
        cursor: pointer;
      }
    }
  }
`;
