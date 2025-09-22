import styled from 'styled-components';

export const NotificationModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 100%;
  }
  .notification-modal {
    background: #f7f7f7;
    border-radius: 1rem;
    width: 62rem;
    position: absolute;
    top: 10rem;
    height: 80%;
    right: calc(10% - 100px);
    display: flex;
    flex-direction: column;
    /* gap: 5rem; */
    @media (min-width: 768px) and (max-width: 1024px) {
      right: 0;
    }
    &-head {
      background: #ffffff;
      width: 100%;
      padding: 1.4rem;
      border-radius: 1rem;
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
      height: 85%;
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
