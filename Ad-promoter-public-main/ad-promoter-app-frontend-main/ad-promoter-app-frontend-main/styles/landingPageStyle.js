import styled from 'styled-components';

export const LandingPageContainer = styled.div`
  background: linear-gradient(
      rgba(17, 17, 17, 0.5) 100%,
      rgba(17, 17, 17, 0.5) 100%
    ),
    url(${(props) => props.image.src});
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    max-width: 39.64756rem;
    width: 100%;
    border-radius: 1.32156rem;
    background: #fff;
    padding: 2rem 4rem;
    @media (max-width: 411px) {
      max-width: 30rem;
      padding: 2rem;
    }
    h1 {
      color: #2c2828;
      font-family: Poppins;
      font-size: 1.76213rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-align: center;
    }

    .product-details {
      display: flex;
      flex-direction: column;
      gap: 3.348rem;

      .carousel-container {
        position: relative;
        .right-arrow {
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          right: 0.5rem;
          font-size: 4.5rem;
          z-index: 1;
          cursor: pointer;
        }
        .left-arrow {
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          left: 0.5rem;
          font-size: 4.5rem;
          z-index: 1;
          cursor: pointer;
        }
      }

      .product-description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.7048rem;
        width: 100%;
        h3 {
          color: #2c2828;
          text-align: center;
          font-family: Poppins;
          font-size: 1.7621rem;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        p {
          color: #333;
          font-family: Poppins;
          font-size: 1.2335rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }

    button {
      display: flex;
      padding: 1.3rem 4rem;
      justify-content: center;
      align-items: center;
      border-radius: 10.573px;
      background: #4f00cf;
      box-shadow: 2px 6px 16px 0px rgba(25, 55, 215, 0.25);
      color: #fff;
      font-family: Inter;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin: 0 auto;
      margin-top: 4rem;
    }

    .sign-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 8rem;
      .sign {
        display: flex;
        align-items: center;
        gap: 0.8811rem;
        p {
          color: #2c2828;
          text-align: center;
          font-family: Poppins;
          font-size: 1.0573rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }
`;

export const RedirectContainer = styled.div`
  background-color: rgba(17, 17, 17, 0.9);
  color: white;
  height: 100vh;
`;
