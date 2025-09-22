import styled from 'styled-components';

export const NotificationModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh; //Would change it later
  background: rgba(0, 0, 0, 0.25);
  z-index: 1200;

  .notification-modal-small {
    background: #f7f7f7;
    border-radius: 10px;
    width: 100vw;
    position: absolute;
    height: 100vh;

    &-head {
      background: #ffffff;
      width: 100%;
      padding: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row-reverse;
        width: 100%;
        h3 {
          font-weight: 600;
          font-size: 2rem;
          line-height: 150%;
          letter-spacing: -0.03em;
          color: var(--black-1);
          text-transform: capitalize;
        }
        .close-icon {
          cursor: pointer;
        }
        .arrow-back {
          font-size: 32px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      overflow-y: auto;
      height: 79vh;
      padding-top: 1rem;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 2.4rem;
        gap: 2.4rem;
        background: #ffffff;
        border-radius: 10px;
        width: 56.1rem;
        max-width: 90%;
        &-textContainer {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1.2rem;
          &-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 1.2rem;
            &-head {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              padding: 0px;
              gap: 0.8rem;
              h3 {
                font-weight: 600;
                font-size: 1.25rem;
                line-height: 150%;
                letter-spacing: -0.03em;
                color: var(--black-1);
              }
              .red-circle {
                width: 1rem;
                height: 1rem;
                background: var(--red);
                border-radius: 50%;
              }
            }
            &-info {
              p {
                font-weight: 400;
                font-size: 14px;
                line-height: 150%;
                letter-spacing: -0.03em;
                color: var(--dark-gray-2);
              }
            }
          }
        }
        .time-stamp {
          p {
            font-weight: 400;
            font-size: 12px;
            line-height: 150%;
            letter-spacing: -0.03em;
            color: var(--light-gray-2);
          }
        }
      }
    }

  }

  .notification-modal {
    background: #f7f7f7;
    border-radius: 10px;
    width: 62rem;
    position: absolute;
    top: 9vh;
    height: 90vh;
    right: calc(10% - 100px);
    &-head {
      background: #ffffff;
      width: 100%;
      padding: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 23.3rem;
        width: 57.2rem;
        h3 {
          font-weight: 600;
          font-size: 2.4rem;
          line-height: 150%;
          letter-spacing: -0.03em;
          color: var(--black-1);
          text-transform: uppercase;
        }
        .close-icon {
          cursor: pointer;
        }
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      overflow-y: auto;
      height: 78vh;
      padding-top: 1rem;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 2.4rem;
        gap: 2.4rem;
        background: #ffffff;
        border-radius: 10px;
        width: 56.1rem;
        &-textContainer {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1.2rem;
          &-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 1.2rem;
            &-head {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              padding: 0px;
              gap: 0.8rem;
              h3 {
                font-weight: 600;
                font-size: 1.6rem;
                line-height: 150%;
                letter-spacing: -0.03em;
                color: var(--black-1);
              }
              .red-circle {
                width: 1rem;
                height: 1rem;
                background: var(--red);
                border-radius: 50%;
              }
            }
            &-info {
              p {
                font-weight: 400;
                font-size: 16px;
                line-height: 150%;
                letter-spacing: -0.03em;
                color: var(--dark-gray-2);
              }
            }
          }
        }
        .time-stamp {
          p {
            font-weight: 400;
            font-size: 1.4rem;
            line-height: 150%;
            letter-spacing: -0.03em;
            color: var(--light-gray-2);
          }
        }
      }
    }
  }
`;
