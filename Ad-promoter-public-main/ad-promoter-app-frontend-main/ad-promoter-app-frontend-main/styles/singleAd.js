import styled from 'styled-components';

export const SingleAdContainer = styled.div`
  background-color: var(--bg);
  width: 100%;
  max-height: 800px;
  /* overflow: auto; */
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  .white-container {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4rem;
    gap: 3.6rem;
    max-width: 74.2rem;
    width: 100%;
    /* max-height: 67.3rem; */
    overflow-y: auto;
    margin: auto;
    position: relative;
    @media (max-width: 425px) {
      max-width: 35rem;
      padding: 2rem;
      max-height: 44rem;
    }
    @media (max-width: 780px) {
      max-height: 38rem;
    }
    .back {
      position: absolute;
      right: 3%;
      top: 3%;
      cursor: pointer;
    }
    h3 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      color: #0d0d0d;
    }
    &-body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4rem;
      .dashboard {
        background: #ffffff;
        border: 1px solid #5c85ff;
        box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
        border-radius: 1.6rem;
        padding: 2.4rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 6rem;
        @media (max-width: 425px) {
          padding: 0.8rem;
        }
        .ad-type {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;
          .head {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
            h3 {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 600;
              font-size: 1.2rem;
              line-height: 1.8rem;
              display: flex;
              align-items: center;
              text-align: center;
              color: #5c85ff;
            }
          }
          p {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 1.2rem;
            line-height: 1.8rem;
            display: flex;
            align-items: center;
            text-align: center;
            color: #5c85ff;
            text-transform: capitalize;
          }
        }
      }

      .desc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4rem;

        &-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 0.8rem;
          h3 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 1.4rem;
            line-height: 2.1rem;
            display: flex;
            align-items: center;
            text-align: center;
            color: #0d0d0d;
          }
          p {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 1.4rem;
            line-height: 2.1rem;
            display: flex;
            align-items: center;
            letter-spacing: -0.011em;
            color: #404040;
            width: 100%;
          }
          .btn {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 1.6rem 8rem;
            gap: 17.435rem;
            background: #ffffff;
            border: 1px solid #4f00cf;
            box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
            border-radius: 0.991579rem;
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 700;
            font-size: 1.4rem;
            line-height: 2rem;
            letter-spacing: -0.011em;
            color: #4f00cf;
            cursor: pointer;
          }
          a {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 1.4rem;
            line-height: 2.1rem;
            display: flex;
            align-items: center;
            letter-spacing: -0.011em;
            color: #0f49f9;
          }
          .checkbox {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            gap: 1.6rem;
          }
        }
      }
    }
  }

  .pause-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.6rem 2.4rem;
    gap: 1.6rem;
    background: #4f00cf;
    border: 1px solid #808080;
    box-shadow: 2px 6px 16px rgba(25, 55, 215, 0.25);
    border-radius: 1.2rem;
    max-width: 22.4rem;
    cursor: pointer;
    p {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
      display: flex;
      align-items: center;
      text-align: center;
      color: #ffffff;
    }
  }
`;
