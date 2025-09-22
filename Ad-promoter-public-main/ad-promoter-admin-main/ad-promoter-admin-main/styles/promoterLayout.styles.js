import styled from 'styled-components';

export const StyledLayout = styled.div`
  .mobile-nav {
    display: none;
  }
  @media screen and (max-width: 425px) {
    .desktop-nav {
      display: none;
    }
    .mobile-nav {
      display: block;
    }
  }
`;
