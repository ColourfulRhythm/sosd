import styled from 'styled-components';

export const StyledOnboarding = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--white);
  @media screen and (max-width: 425px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
  @media screen and (min-height: 862px) {
    overflow-y: hidden;
    height: 100vh;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid rgba(102, 102, 102, 0.25);
  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    .lang {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      cursor: pointer;
      p {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--dark-gray);
      }
    }
    .login-btn {
      border: 1px solid var(--black-4);
      border-radius: 8px;
      padding: 0.5rem 2.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      a {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 24px;
        color: var(--black-4);
      }
    }
  }
`;

export const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .onboard-image {
    img {
      width: 100%;
    }
  }
  .onboard-text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5.6rem;
    width: 46rem;
    margin: auto;
    &-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 0.8rem;
      h2 {
        font-weight: 600;
        font-size: 4.8rem;
        line-height: 5.6rem;
        text-align: center;
        color: var(--black-4);
      }
      p {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 24px;
        text-align: center;
        color: var(--gray);
      }
    }
    &-subhead {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4.8rem;
      .socials {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2.4rem;
      }
      .divider {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2.3rem;
        p {
          font-weight: 400;
          font-size: 1.5rem;
          line-height: 24px;
        }
        > div {
          width: 19.55rem;
          height: 0.2rem;
          background: rgba(102, 102, 102, 0.25);
        }
      }
      &-bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 8px;
        .terms {
          padding: 0.8rem;
          text-align: center;
          p {
            font-weight: 400;
            font-size: 1.4rem;
            line-height: 21px;
            text-align: center;
            color: var(--dark-gray);
            a {
              color: var(--primary);
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
`;
export const StyledMobile = styled.div`
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
      font-size: 13px;
      line-height: 18px;
      text-align: center;
      letter-spacing: -0.078px;
      color: #333333;
    }
  }
  .socials {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 5rem;
  }
  .divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
    flex-wrap: nowrap;
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
      @media screen and (max-width: 358px) {
        width: 12rem;
      }
    }
  }
  .signup {
    margin-top: 3rem;
  }
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #4f00cf;
    border-radius: 40px;
    height: 4.8rem;
    margin-top: 2rem;
    p {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.1rem;
      letter-spacing: -0.32px;
      color: #4f00cf;
    }
  }
  .terms {
    padding: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    p {
      font-weight: 400;
      font-size: 1.1rem;
      line-height: 1.3rem;
      text-align: center;
      color: var(--dark-gray);
      a {
        color: var(--primary);
        text-decoration: underline;
      }
    }
  }
`;
export const StyledTab = styled.div`
  display: none;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
  .onboard-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    h2 {
      font-weight: 600;
      font-size: 3.6rem;
      line-height: 5.4rem;
      text-align: center;
      color: #262626;
    }
    p {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 2.4rem;
      text-align: center;
      color: #666666;
    }
  }
  .socials {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .divider {
    display: flex;
    align-items: center;
    gap: 2rem;

    .line {
      width: 100.5px;
      height: 2px;
      background: rgba(102, 102, 102, 0.25);
    }
    p {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: #666666;
    }
  }
  .signup {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .terms {
    padding: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    p {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 2.1rem;
      text-align: center;
      color: var(--dark-gray);
      a {
        color: var(--primary);
        text-decoration: underline;
      }
    }
  }
`;
