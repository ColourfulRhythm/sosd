import styled from 'styled-components';

export const SidebarContainer = styled.div`
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1000;
  }

  .sidebar {
    background-color: #f7f2ff;
    z-index: 1100;
    position: absolute;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 16px;
    overflow:hidden;
    .link {
      a {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        font-weight: 400;
        font-size: 1.5rem;
        text-transform: capitalize;
        color: #4F00CF;
      }
      .activeLink {
        font-weight: 600;
        background-color: #4f00cf;
        color: white;

        .link-icon
        {
          margin-left: 0.5rem;
          font-size : 2rem;
        }
  
      }
      .link-icon
      {
        font-size : 1.5rem;
      }

      .link-name
      {
        margin-left: 0.75rem;
      }
    }
  }
`;
