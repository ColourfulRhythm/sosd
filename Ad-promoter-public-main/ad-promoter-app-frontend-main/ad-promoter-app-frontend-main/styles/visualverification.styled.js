import styled from 'styled-components';

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 4rem;
  }
  .header {
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
        text-align: center;
        width: 48.5rem;
      }
      p {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--dark-gray);
        @media (min-width: 768px) and (max-width: 1024px) {
          text-align: center;
        }
      }
    }
  }
  .submitform {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12rem;
    @media (min-width: 768px) and (max-width: 1024px) {
      gap: 4rem;
    }
    .paste-input-container {
      .copied {
        color: var(--green);
      }
      .paste-input {
        display: flex;
        align-items: center;
        .copy-icon {
          margin-right: -4rem;
          z-index: 10;
        }
        .input {
          input {
            background: #e6e6e6;
            border: 2px solid #ffffff;
            border-radius: 12px;
            width: 52.8rem;
            height: 5.2rem;
            padding-left: 6rem;
            padding-right: 10rem;
          }
        }
        .button {
          padding: 1rem 2rem;
          color: #ffffff;
          background: #6b8bfc;
          border-radius: 10px;
          margin-left: -8.5rem;
          cursor: pointer;
          p {
            font-weight: 500;
            font-size: 1.3rem;
            line-height: 2rem;
          }
        }
      }
    }
  }
`;
export const VerifyVisual = styled.div`
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
  h3 {
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 2.8rem;
    color: #333333;
    text-align: center;
    margin-top: 2rem;
  }
  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.078px;
    color: #333333;
    margin-top: 1.5rem;
  }
  .submitform {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12rem;
    margin-top: 3rem;
    .paste-input-container {
      .copied {
        color: var(--green);
      }
      .paste-input {
        display: flex;
        align-items: center;
        .copy-icon {
          margin-right: -4rem;
          z-index: 10;
        }
        .input {
          input {
            background: #e6e6e6;
            border: 2px solid #ffffff;
            border-radius: 12px;
            width: 93vw;
            height: 5.2rem;
            padding-left: 6rem;
            padding-right: 10rem;
          }
        }
        .button {
          height: 3.7rem;
          width: 8rem;
          background: #6b8bfc;
          border-radius: 10px;
          margin-left: -9rem;
          cursor: pointer;
          p {
            font-weight: 500;
            font-size: 1.3rem;
            line-height: 2rem;
            color: white;
            margin: 0.7rem auto;
          }
        }
      }
    }
  }
`;
