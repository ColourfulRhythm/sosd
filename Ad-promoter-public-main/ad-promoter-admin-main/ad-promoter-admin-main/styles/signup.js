import styled from 'styled-components';

export const Overlay = styled.div`
  /* width: 79.5rem;
    height: 81.1rem; */
  padding: 3rem 13rem;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    .welcome {
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
          color: var(--dark-gray);
        }
        p {
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 2.4rem;
          color: var(--dark-gray-2);
        }
      }
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 2.4rem;
      .name,
      .email,
      .password,
      .tel {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 0.4rem;
        position: relative;
        /* width: 528px;
        height: 87px; */

        label {
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 2.4rem;
          color: var(--gray);
        }
        .input {
          border: 1px solid rgba(102, 102, 102, 0.35);
          border-radius: 12px;
          outline: none;
          width: 52.8rem;
          height: 5.6rem;
          padding-left: 2rem;
        }
        .tel-input {
          input {
            /* border: 1px solid rgba(102, 102, 102, 0.35); */
            /* border-radius: 12px; */
            outline: none;
            border: none;
            /* width: 52.8rem;
            height: 5.6rem; */
          }
        }
        .invalid {
          border: 1px solid var(--red);
          border-radius: 12px;
          outline: none;
          width: 52.8rem;
          height: 5.6rem;
          padding-left: 2rem;
          /* padding-left: 7rem; */
          z-index: 1000;
        }

        .PhoneInputInput {
          padding-left: 7rem;
        }
        .PhoneInputCountry {
          position: absolute;
          z-index: 1;
          top: 55%;
          left: 4%;
        }
        .phoneState {
          color: var(--red);
        }
        .tel-input {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
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
  .login {
    p {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: var(--dark-gray);
      a {
        color: var(--light-blue-1);
      }
    }
  }
`;
export const SignupMobile = styled.div`
  display: none;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  @media screen and (max-width: 425px) {
    display: block;
  }
  .logo {
    text-align: center;
  }
  .note {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;

    h3 {
      font-weight: 600;
      font-size: 2.2rem;
      line-height: 2.8rem;
      color: #333333;
      text-align: center;
    }
    p {
      font-weight: 400;
      font-size: 1.3rem;
      line-height: 1.8rem;
      text-align: center;
      letter-spacing: -0.078px;
      color: #333333;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 2.4rem;
    margin-top: 4rem;
    width: 100%;
    padding-bottom: 4rem;
    .name,
    .email,
    .password,
    .tel {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 0.4rem;
      position: relative;
      /* width: 528px;
      height: 87px; */

      label {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: var(--gray);
      }
      .input {
        border: 1px solid rgba(102, 102, 102, 0.35);
        border-radius: 12px;
        outline: none;
        width: 93vw;
        height: 5.2rem;
        padding-left: 2rem;
      }
      .tel-input {
        input {
          /* border: 1px solid rgba(102, 102, 102, 0.35); */
          /* border-radius: 12px; */
          outline: none;
          border: none;
          /* width: 52.8rem;
          height: 5.6rem; */
        }
      }
      .invalid {
        border: 1px solid var(--red);
        border-radius: 12px;
        outline: none;
        width: 93vw;
        height: 5.2rem;
        padding-left: 2rem;
        /* padding-left: 7rem; */
        z-index: 1000;
      }

      .PhoneInputInput {
        padding-left: 7rem;
      }
      .PhoneInputCountry {
        position: absolute;
        z-index: 1;
        top: 55%;
        left: 4%;
      }
      .phoneState {
        color: var(--red);
      }
      .tel-input {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
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
`;