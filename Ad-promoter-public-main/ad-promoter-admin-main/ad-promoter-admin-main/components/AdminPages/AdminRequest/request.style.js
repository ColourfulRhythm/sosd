import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  background-color: white;

  .log {
    background-color: var(--white);
    padding: 2.4rem;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 600;
      font-size: 1.8rem;
    }

    .filter {
      width: 28.1rem;
      padding: 1.2rem 2rem;
      border: 0.1rem solid var(--light-primary);
      border-radius: 0.8rem;
      display: flex;
      font-size: 1.6rem;
      margin-top: 0rem;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    .dropdown_list {
      background-color: var(--white);
      position: absolute;
      top: 19rem;
      right: 12rem;
      border-radius: 0.8rem;
      box-shadow: var(--shadow-1);
      width: 28.1rem;
      z-index: 100;

      li {
        padding: 1.2rem 2.4rem;
        border-bottom: 0.1rem solid #d9d9d9;
        cursor: pointer;
      }
    }
  }

  .group {
    display: flex;
    align-items: center;
    font-weight: 600;
    justify-content: center;
  }

  .filter {
    width: 14.1rem;
    padding: 1.2rem 2rem;
    border: 0.1rem solid var(--light-primary);
    border-radius: 0.8rem;
    margin-top: 1rem;
    display: flex;
    background-color: white;
    margin-left: auto;
    font-size: 1.6rem;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .dropdown_list {
    background-color: var(--white);
    position: absolute;
    top: 21rem;
    right: 1rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-1);
    width: 28.1rem;
    z-index: 100;

    li {
      padding: 1.2rem 2.4rem;
      border-bottom: 0.1rem solid #d9d9d9;
      cursor: pointer;
    }
  }

  .title {
    margin-left: 5px;
  }

  .data-name {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .complete {
    background: var(--green-2);
    color: #fff;
    width: 9.5rem;
    height: 2.3rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    border: 1px solid #dbd8fc;
    border-radius: 10rem;
    padding: 0.4rem 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress {
    background: var(--light-blue-1);
    color: #fff;
    width: 9.9rem;
    /* width: 100%; */
    height: 2.3rem;
    /* height: 100%; */
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    border: 1px solid #dbd8fc;
    border-radius: 10rem;
    padding: 0.4rem 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view-button {
    padding: 8px 0;
    width: 100px;
    font-weight: 500;
    background-color: rgba(249, 245, 255, 1);
    color: rgba(79, 0, 207, 1);
    border-radius: 0.5rem;
    border: 1px solid #d3b8ff;
  }

  table {
    margin-top: 3rem;
    width: 100%;
    font-size: 1.4rem;
    position: relative;
    border-collapse: separate;
    border-spacing: 0 1.5rem;

    thead {
      font-weight: 600;
    }

    thead th {
      text-align: left;
    }

    tbody td {
      position: relative;
      top: 3rem;
    }
    tbody tr {
      background-color: white;
    }

    td {
      padding: 1.5rem;
    }

    .action-space {
      letter-spacing: 10px;
    }
    .action-btn {
      cursor: pointer;
    }

  }
`;

const RequestSettings = styled.div`
  main {
    margin-top: 3.5rem;
    border-radius: 4px;
    padding: 3rem 0.75rem;
    @media (min-width: 768px) and (max-width: 1024px) {
      min-height: fit-content;
      position: relative;
    }

    .categories {
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      @media (min-width: 768px) and (max-width: 1024px) {
        justify-content: space-between;
        align-items: center;
      }

      li {
        margin: 0 2.25rem;
        color: var(--light-gray-2);
        font-size: 1.35rem;
        font-weight: 400;
        cursor: pointer;
        padding: 0 0.75rem;
        padding-bottom: 0.8rem;
        transition: 150ms ease-out;
        @media (min-width: 768px) and (max-width: 1024px) {
          margin: 0 1rem;
        }
      }
    }

    .contents {
      color: var(--black);
      padding: 0 2rem 2rem 2rem;
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
`;

const AdDisplay = styled.div`
  @media only screen and (min-width: 1025px) {
    display: none;
  }
`;

const RequestSettingsMobile = styled.div`
  main {
    margin-top: 3.5rem;
    border-radius: 4px;
    padding: 3rem 0.75rem;
    @media only screen and (max-width: 1024px) {
      min-height: fit-content;
      position: relative;
    }

    .categories-group {
      overflow: scroll;
      white-space: nowrap;
    }
    .categories {
      border-bottom: 1px solid #f5f5f5;

      li {
        margin: 0rem 0rem 1rem 1rem;
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

  .ad-group {
    .ad-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .ad-column {
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
        word-break: break-all;
      }

      .ad-text-small-right {
        font-size: 14px;
        width: 70%;
        word-break: break-all;
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
        margin-top: 7rem;
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

export { RequestSettings, RequestSettingsMobile, Container, AdDisplay };
