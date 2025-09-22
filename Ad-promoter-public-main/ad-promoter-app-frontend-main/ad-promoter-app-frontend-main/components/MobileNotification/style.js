import styled from 'styled-components';

export const NotificationStyle = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  .notif {
    display: flex;
    align-items: center;
    gap: 10rem;
    @media screen and (max-width: 400px) {
      gap: 6rem;
    }

    p {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
      color: #333333;
    }
  }
  .notifications {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .each {
    background-color: white;
    padding: 2.4rem;
    border-radius: 1rem;
  }
  .type {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;

    span {
      font-size: 1.6rem;
      line-height: 150%;
      color: #4d4d4d;
      letter-spacing: -0.03em;
    }
  }
  .advert {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      font-size: 1.6rem;
      line-height: 150%;
      color: #0d0d0d;
      letter-spacing: -0.03em;
      font-weight: 600;
    }
  }
  .red-dot {
    width: 10px;
    height: 10px;
    background: #eb1e1e;
    border-radius: 50%;
  }
  .date {
    margin-top: 1rem;
    float: right;
    font-size: 1.4rem;
    line-height: 150%;
    color: #828282;
    letter-spacing: -0.03em;
  }
`;
