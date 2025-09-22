import styled from 'styled-components';

const AdminActivityStyle = styled.div`
  background-color: white;

  main {
    border-radius: 4px;
    padding: 3rem 0.75rem;
    @media only screen and (max-width: 1024px) {
      min-height: fit-content;
      position: relative;
    }

    .dropdown_list {
      li {
        &:hover {
          background-color: #EAEAEA;
        }
      }
    }

    .categories-group {
      overflow-x: auto;
      white-space: nowrap;
    }
    .categories {
      border-bottom: 1px solid #f5f5f5;

      li {
        margin: 0rem 0rem 2rem 1.5rem;
        color: var(--light-gray-2);
        cursor: pointer;
        display: inline-block;
        transition: 150ms ease-out;
      }
    }

    .contents {
      margin-top: 1rem;
      color: var(--black);
      padding: 2rem;
    }
  }
  @media screen and (max-width: 805px) {
    StyledSettings {
      padding: 0;
    }
    main {
      width: 100vw;
    }
  }
  .blurred {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.375);
    backdrop-filter: blur(12px);
  }

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 500px;
    background-color: white;
    box-shadow: var(--shadow-6);
    position: fixed;
    top: 25%;
    border-radius: 6px;
    z-index: 99;

    .close-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;
      width: 25px;
      position: absolute;
      top: 4%;
      right: 4%;
      cursor: pointer;
      border: 1px solid var(--dark-gray);
      ${'' /* padding: 0.25rem; */}
      border-radius: 50%;
    }

    .contents {
      text-align: center;
      width: 100%;
      margin: 3rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 2rem 0;
        color: var(--black);
        font-weight: 600;
        font-size: 1.85rem;
      }
      span {
        color: var(--dark-gray);
        font-weight: 500;
        font-size: 1.425rem;
      }
      .upload {
        margin: 1rem 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
        width: fit-content;
        border: 1px solid var(--light-blue);
        border-radius: 6px;
        background-color: #dce4ff;
        padding: 0.75rem 1.05rem;
        cursor: pointer;
      }
      .cancel {
        margin-top: 3rem;
      }
    }
    .photo-modal {
      width: 250px;
    }

    .btn-controls {
      margin-top: 8rem;
      display: flex;
      justify-content: center;
      gap: 7rem;
      align-items: center;
    }
  }

  .logout {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    position: fixed;
    cursor: pointer;
    bottom: 6%;
    right: 7%;
    @media (min-width: 768px) and (max-width: 1024px) {
      position: absolute;
    }

    p {
      color: red;
      font-weight: 500;
    }
  }

  .log {
    width: fit-content;
    margin-left: auto;
    padding: 1.2rem 2rem;
  }

  .ad-group {
    padding: 2rem;

    .ad-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ad-column {
      border: 1px solid #f2f2f2;
      padding: 1rem;
      margin-top: 1.5rem;
      border-radius: 8px;

      .status-text {
        font-size: 12px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        margin-bottom: 2px;
      }

      .view-button-report-div {
        width: fit-content;
        margin-left: auto;
        margin-top: 5rem;
      }

      .ad-text-smaller {
        font-size: 13px;
        font-weight: 500;
        width: 30%;
      }

      .ad-text-small {
        font-size: 14px;
        width: 70%;
        text-align: right;
      }

      .ad-text-content {
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
        gap: 2rem;
      }

      .ad-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;

        .ad-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 14px;
        }
      }

      .actions {
        display: flex;
        justify-content: center;
        margin-top: 5rem;
        gap: 2rem;

        button {
          background-color: #4f00ce;
          padding: 10px 0;
          border-radius: 0.5rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;

          span {
            color: #fff;
            font-weight: 500;
            font-size: 14px;
          }
        }

        button.sec {
          background-color: #f7f2ff;

          span {
            color: #333333;
            font-weight: 500;
            font-size: 13px;
          }
        }
      }
    }
  }
`;

export default AdminActivityStyle;
