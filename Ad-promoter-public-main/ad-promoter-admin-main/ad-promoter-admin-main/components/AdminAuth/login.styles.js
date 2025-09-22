import styled from 'styled-components';

export const Overlay = styled.div`
  width: 795px;
  height: 630px;
  padding: 4rem;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    &-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.4rem;
      &-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
        h3 {
          font-weight: 500;
          font-size: 2.4rem;
          line-height: 3.6rem;
          text-align: center;
          color: var(--dark-gray);
        }
        p {
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 2.4rem;
          color: var(--dark-gray);
        }
      }
    }
    &-socials {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.6rem;
    }
    .divider {
      display: flex;
      align-items: center;
      gap: 2.3rem;
      > div {
        width: 22.4rem;
        height: 0.2rem;
        background: rgba(102, 102, 102, 0.25);
      }
      p {
        font-weight: 400;
        font-size: 2.4rem;
        line-height: 3.6rem;
        color: var(--gray);
      }
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2.4rem;
      .email,
      .password {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 0.4rem;

        label {
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 2.4rem;
          color: var(--gray);
        }
        input {
          border: 1px solid rgba(102, 102, 102, 0.35);
          border-radius: 12px;
          outline: none;
          width: 52.8rem;
          height: 5.6rem;
          padding-left: 2rem;
        }
      }
      .password {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0px;
        gap: 8px;
        .input-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          .label {
            align-self: stretch;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .hide {
              display: flex;
              align-items: center;
              gap: 0.6rem;
              cursor: pointer;
              p {
                font-weight: 400;
                font-size: 1.8rem;
                line-height: 2.7rem;
                color: rgba(102, 102, 102, 0.8);
              }
            }
          }
        }
        p {
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 2.4rem;
          text-align: right;
          color: var(--light-blue-1);
        }
      }
    }
  }
`;
export const MobileLogin = styled.div`
  margin-top: 5rem;
  padding: 2rem 0;
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    h3 {
      font-weight: 600;
      font-size: 2.2rem;
      line-height: 2.8rem;
      color: #333333;
    }
    p {
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.078px;
      color: #333333;
      a {
        color: #5c85ff;
      }
    }
  }
  .content-socials {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
    p {
      font-weight: 400;
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.078px;
      color: #666666;
    }
    > div {
      width: 16.4rem;
      height: 0.2rem;
      background: rgba(102, 102, 102, 0.25);
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
    width:fit-content;
    margin: auto;
    margin-top: 2rem;
    .email,
    .password {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 0.4rem;

      label {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--gray);
      }
      input {
        border: 1px solid rgba(102, 102, 102, 0.35);
        border-radius: 12px;
        outline: none;
        width: 93vw;
        margin: auto;
        padding-left: 2rem;
        max-width: 100%;
        height: 5.6rem;
      }
    }
    .password {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0px;
      gap: 8px;
      .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        .label {
          align-self: stretch;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .hide {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            cursor: pointer;
            p {
              font-weight: 400;
              font-size: 1.8rem;
              line-height: 2.7rem;
              color: rgba(102, 102, 102, 0.8);
            }
          }
        }
      }
      p {
        font-weight: 600;
        font-size: 1.3rem;
        line-height: 1.8rem;
        text-align: right;
        color: var(--light-blue-1);
      }
    }
  }
`;
