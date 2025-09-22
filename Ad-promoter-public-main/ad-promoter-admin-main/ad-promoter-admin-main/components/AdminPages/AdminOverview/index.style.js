import styled from 'styled-components';

export const ContainerStyle = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  margin-top: 4rem;

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;

    .col1 {
      grid-column: span 2 / span 2;

      .welcome {
        background-color: white;
        border-radius: 1rem;
        padding: 2.4rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 3rem;
      }
      .user {
        display: flex;
        align-items: center;
        gap: 4rem;
      }

      .rounded-image
      {
        border-radius: 100%;
      }

      .name {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .greet {
        font-weight: 700;
        font-size: 2.4rem;
        line-height: 150%;
        letter-spacing: -0.03em;
      }
      .wave {
        display: flex;
        gap: 1rem;

        p {
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 150%;
          letter-spacing: -0.02em;
        }
      }
      .dashboard {
        background-color: white;
        border-radius: 1rem;
        padding: 2.4rem 1.5rem;
        margin-bottom: 3rem;
      }
      .dash {
        margin-bottom: 3rem;
        font-weight: 600;
        font-size: 2.4rem;
        line-height: 3.6rem;
      }
      .card {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
      }
      .card-info {
        border-radius: 1rem;
        width: 25rem;
        height: 15.6rem;
      }
      .card-column {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding-top: 4rem;
      }
      .item-icon {
        display: flex;
        align-items: center;
        gap: 1rem;

        p {
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 2.1rem;
        }
      }
      .amount {
        font-weight: 700;
        font-size: 2.4rem;
        line-height: 3.6rem;
      }
      .graph {
        background-color: white;
        padding: 1.5rem;
      }
      .income {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
      .income-text {
        font-weight: 600;
        font-size: 2.4rem;
        line-height: 3.6rem;
      }
      .calendar {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }
      .week {
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: #f4f4f4;
        padding: 0.4rem 1.6rem;
        border-radius: 0.4rem;

        p {
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 2.1rem;
          letter-spacing: -0.02em;
        }
      }
      .month {
        display: flex;
        gap: 0.6rem;
        align-items: center;

        h4 {
          font-size: 1.4rem;
          line-height: 1.6rem;
          color: #2e3a59;
        }
      }
      .lineGraph {
        background-color: #f4f4f4;
        padding: 1.5rem;
        border-radius: 1rem;
      }
    }
    .col2 {
      grid-column: span 1 / span 1;

      .filter {
        background-color: white;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.4rem 2.4rem;
        margin-bottom: 5rem;

        p {
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 2.4rem;
        }
      }
      ul {
        background-color: var(--white);
        position: absolute;
        top: 18rem;
        right: 2.3rem;
        border-radius: 0.8rem;
        box-shadow: var(--shadow-1);
        width: 41.6rem;
        z-index: 100;

        li {
          padding: 1.2rem 2.4rem;
          border-bottom: 0.1rem solid #d9d9d9;
          cursor: pointer;
        }
      }
      .ad-graph {
        background-color: white;
        padding: 2.4rem 1.5rem;
        border-radius: 1rem;
        margin-bottom: 3.5rem;

        h2 {
          font-weight: 600;
          font-size: 2.4rem;
          line-height: 3.6rem;
          margin-bottom: 2rem;
        }
      }
      .pie {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .adType {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .ad {
        display: flex;
        align-items: center;
        gap: 2rem;

        p {
          font-weight: 500;
          line-height: 150%;
          font-size: 1.6rem;
          letter-spacing: -0.03em;
        }
      }
      .blue {
        background-color: #0594fb;
        border-radius: 100%;
        width: 2.4rem;
        height: 2.4rem;
      }
      .yellow {
        background-color: #fbbc05;
        border-radius: 100%;
        width: 2.4rem;
        height: 2.4rem;
      }
      .green {
        background-color: #12a93c;
        border-radius: 100%;
        width: 2.4rem;
        height: 2.4rem;
      }
      .adPromoters {
        background-color: white;
        border-radius: 1rem;
        padding: 2.4rem 1.5rem;
        margin-bottom: 3.5rem;

        h2 {
          font-weight: 600;
          font-size: 2.4rem;
          line-height: 3.6rem;
          margin-bottom: 2rem;
        }
      }
      .topPromoters {
        background-color: #ffffff;
        padding: 1.6rem 2.4rem;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
        border: 1px solid #f2f2f2;
        border-radius: 1.2rem;
        margin-bottom: 1rem;
      }
      .user {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .name {
        display: flex;
        flex-direction: column;
      }
      .userName {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 2.4rem;
      }
      .email {
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #333333;
      }
      .result {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .adResult {
        font-size: 1.2rem;
        line-height: 2rem;
        color: #2e3a59;

        span {
          font-size: 1.6rem;
          line-height: 2.8rem;
        }
      }
      .line {
        height: 0.1rem;
        width: 10.9rem;
        background-color: #f0f0f0;
      }
      .earning {
        font-size: 1.2rem;
        line-height: 2rem;
        color: #2e3a59;

        span {
          font-size: 1.6rem;
          line-height: 2.8rem;
          font-weight: 700;
        }
      }
    }
  }
`;

export const ContainerStyleMobile = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  padding-top: 4rem;
  background-color: #FCFCFC;

  .welcome {
    background-color: white;
    border-radius: 1rem;
    padding: 2.4rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 4rem;
  }
  .name {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .greet {
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 150%;
    letter-spacing: -0.03em;
  }
  .wave {
    display: flex;
    gap: 1rem;

    p {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 150%;
      letter-spacing: -0.02em;
    }
  }
  .dashboard {
    background-color: white;
    border-radius: 1rem;
    padding: 2.4rem 1.5rem;
    margin-bottom: 3rem;
  }
  .dash {
    margin-bottom: 3rem;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.6rem;
  }
  .card {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
    @media only screen and (max-width : 380px){
      gap: 1rem;
    }
  }
  .card-info {
    border-radius: 1rem;
    width: 47.2%;
    height: 15.6rem;
  }
  .card-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;
  }
  .item-icon {
    display: block;
    align-items: center;
    gap: 1rem;
    text-align: center;

    p {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
    }
  }
  .amount {
    font-weight: 600;
    font-size: 2rem;
    line-height: 2rem;
  }
  .graph {
    background-color: white;
    padding: 1.5rem;
  }
  .income {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .income-text {
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.6rem;
  }
  .calendar {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .week {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #f4f4f4;
    padding: 0.4rem 1.6rem;
    border-radius: 0.4rem;

    p {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
      letter-spacing: -0.02em;
    }
  }
  .month {
    display: flex;
    gap: 0.6rem;
    align-items: center;

    h4 {
      font-size: 1.4rem;
      line-height: 1.6rem;
      color: #2e3a59;
    }
  }
  .lineGraph {
    background-color: #f4f4f4;
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .filter-group {
    position: relative;
  }

  .filter {
    background-color: #f1f1f1;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 2.4rem;
    margin: 3rem;

    p {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.4rem;
    }
  }
  ul {
    background-color: var(--white);
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-1);
    width: 41.6rem;
    max-width: 70%;
    z-index: 100;
    font-size: 16px;

    li {
      padding: 1.2rem 2.4rem;
      border-bottom: 0.1rem solid #d9d9d9;
      cursor: pointer;
    }
  }
  .ad-graph {
    background-color: white;
    padding: 2.4rem 1.5rem;
    border-radius: 1rem;
    margin-bottom: 3.5rem;
    border: 2px solid #e6e6e6;
    margin: auto;
    margin-top: 5rem;
    width: 90%;
    max-width: 40rem;

    h2 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      margin-bottom: 2rem;
    }
  }
  .pie {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .adType {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .ad {
    display: flex;
    align-items: center;
    gap: 2rem;

    p {
      font-weight: 500;
      line-height: 150%;
      font-size: 1.6rem;
      letter-spacing: -0.03em;
    }
  }
  .blue {
    background-color: #0594fb;
    border-radius: 100%;
    width: 2.4rem;
    height: 2.4rem;
  }
  .yellow {
    background-color: #fbbc05;
    border-radius: 100%;
    width: 2.4rem;
    height: 2.4rem;
  }
  .green {
    background-color: #12a93c;
    border-radius: 100%;
    width: 2.4rem;
    height: 2.4rem;
  }
  .adPromoters {
    background-color: white;
    border-radius: 1rem;
    padding: 2.4rem 1.5rem;
    margin-top: 2rem;

    h2 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      margin-bottom: 2rem;
    }
  }
  .topPromoters {
    background-color: #FFFFFF;
    padding: 1.6rem 2.4rem;
    border: 1px solid #f2f2f2;
    border-radius: 12px;
    margin-bottom: 1rem;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .name {
    display: flex;
    flex-direction: column;
  }
  .userName {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
  .email {
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: #333333;
  }
  .adResult {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #2e3a59;
    margin-top: 1rem;

    p {
      display: flex;
      align-items: center;
      justify-content : space-between;
    }

    span {
      line-height: 2.8rem;
      display: flex;
      align-items: center;

      .ad-label
      {
        margin-left: 0.5rem;
      }
    }
  }
  .line {
    height: 0.1rem;
    width: 10.9rem;
    background-color: #f0f0f0;
  }
  .earning {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #2e3a59;

    span {
      font-size: 1.6rem;
      line-height: 2.8rem;
      font-weight: 700;
    }
  }
`;
