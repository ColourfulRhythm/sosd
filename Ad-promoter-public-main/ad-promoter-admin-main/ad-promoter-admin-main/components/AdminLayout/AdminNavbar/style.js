import styled from 'styled-components';

export const StyledNavBar = styled.div`

  background: var(--white);
  padding: 1rem 2rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom : 2px solid #F5F5F7;

  @media (min-width: 1024px) {
    padding: 1.5rem 3rem;
  }

  .logo {
    width: 16rem;
    height: auto;
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }

  .notif {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    margin-right: -1rem;
    margin-top: 0.75rem;
    @media (min-width: 1024px) {
      margin-right: 0;
    }
  }

  .menu-group {
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 1024px) {
      display: none;
    }

    .menu {
      font-size: 2.5rem;
      position: relative;
      z-index: 1100;
      cursor :pointer;
    }

    .menu-image {
      margin-left: 1.5rem;
    }
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5rem;
    @media (max-width: 1024px) {
      gap: 4rem;
      display: none;
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
    align-items: center;
    gap: 1rem;

    @media (max-width: 1024px) {
      flex-direction: row-reverse;
    }

    .notif {
      &-img {
        cursor: pointer;
      }
    }
  }
`;
