import styled from 'styled-components';

export const TopContainer = styled.div`
  background: var(--bg);
  /* height: 100vh; */
  padding-top: 3rem;
  padding-bottom: 2rem;
`;

export const Container = styled.div`
  max-width: 123rem;
  margin: 0 auto;
  /* margin-top: 3rem; */
  @media screen and (max-width: 425px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }

  .spinner {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .log-container {
    display: flex;
    flex-direction: column;

    .log {
      background-color: var(--white);
      padding: 2.4rem 6rem 2.4rem 2.4rem;
      border-radius: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* margin-top: 10%; */

      p {
        font-weight: 600;
        font-size: 1.8rem;
      }

      .filter {
        width: 28.1rem;
        padding: 1.2rem 2rem;
        border: 0.1rem solid var(--light-primary);
        border-radius: 0.8rem;
        display: flex;
        font-size: 1.6rem;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
      }

      ul {
        background-color: var(--white);
        position: absolute;
        top: 19rem;
        right: 12rem;
        border-radius: 0.8rem;
        box-shadow: var(--shadow-1);
        width: 28.1rem;
        z-index: 100;

        li {
          padding: 1.2rem 2.4rem;
          border-bottom: 0.1rem solid #d9d9d9;
          cursor: pointer;
        }
      }
    }
  }

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    table {
      margin-top: 3rem;
      width: 100%;
      font-size: 1.4rem;
      position: relative;
      border-collapse: separate;
      border-spacing: 0 1.5rem;

      thead {
        font-weight: 600;
      }

      thead th {
        text-align: left;
      }

      tbody {
        /* display: flex; */
        /* flex-direction: column; */
        /* gap: 2rem; */
      }

      tbody td {
        position: relative;
        /* top: 3rem; */
        > div p {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 2.1rem;
          display: flex;
          align-items: center;
          text-align: center;
          color: #333333;
        }
      }
      tbody tr {
        background-color: white;
      }

      td {
        padding: 1.5rem;
      }
    }

    .pagination-style {
      display: flex;
      gap: 1rem;
      &-child {
        border: 2px solid var(--primary);
        color: #000;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      &-child-active {
        background-color: var(--primary);
        color: var(--white);
        padding: 0.5rem 1rem;
        /* border-radius: 60%; */
      }
    }
  }
`;

export const UndoContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 30rem;
  z-index: 500;
  padding: 2rem;
  position: fixed;
  left: 5rem;
  bottom: 3rem;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .activity {
    color: white;
    font-size: 1.2rem;
  }
  .undo {
    color: yellow;
    font-size: 1.2rem;
  }
`;

export const MobileActivities = styled.div`
  display: none;
  padding-bottom: 10rem;
  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
  .adcreator {
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 2.4rem;
    align-items: center;

    h4 {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
      width: 50%;
      margin: auto;
    }
  }

  ul {
    background-color: var(--white);
    position: absolute;
    top: 19rem;
    right: 12rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-1);
    width: 28.1rem;
    z-index: 100;

    li {
      padding: 1.2rem 2.4rem;
      border-bottom: 0.1rem solid #d9d9d9;
      cursor: pointer;
    }
  }

  .spinner {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .body-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .body {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .activity {
    background-color: white;
    padding: 2.4rem 1.6rem;
    border-radius: 12px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 1rem;
    padding-left: 1rem;

    h3 {
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #333333;
    }
  }
  .userId {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fcfcfc;
    padding: 1.6rem;

    p {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #999999;
    }
    h2 {
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: #333333;
      letter-spacing: -0.078px;
    }
  }
  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 1.6rem;

    p {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #999999;
    }
    h2 {
      width: 12.8rem;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: #333333;
      letter-spacing: -0.078px;
    }
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 1.6rem;

    p {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #999999;
    }
    h2 {
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: #333333;
      letter-spacing: -0.078px;
    }
  }
  .pagination-style {
    display: flex;
    gap: 1rem;
    margin: auto;
    &-child {
      border: 2px solid var(--primary);
      color: #000;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    &-child-active {
      background-color: var(--primary);
      color: var(--white);
      padding: 0.5rem 1rem;
      /* border-radius: 60%; */
    }
  }
`;

export const TabActivities = styled.div`
  display: none;
  padding: 2rem;
  padding-top: 5rem;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
  .spinner {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .log {
    background-color: var(--white);
    padding: 2.4rem 6rem 2.4rem 2.4rem;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 600;
      font-size: 1.8rem;
    }

    .filter {
      width: 28.1rem;
      padding: 1.2rem 2rem;
      border: 0.1rem solid var(--light-primary);
      border-radius: 0.8rem;
      display: flex;
      font-size: 1.6rem;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    ul {
      background-color: var(--white);
      position: absolute;
      top: 22rem;
      right: 7.5rem;
      border-radius: 0.8rem;
      box-shadow: var(--shadow-1);
      width: 28.1rem;
      z-index: 100;

      li {
        padding: 1.2rem 2.4rem;
        border-bottom: 0.1rem solid #d9d9d9;
        cursor: pointer;
      }
    }
  }

  .body-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .body {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .activity {
    background-color: white;
    padding: 2.4rem 1.6rem;
    border-radius: 12px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 1rem;
    padding-left: 1rem;

    h3 {
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #333333;
    }
  }
  .userId {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fcfcfc;
    padding: 1.6rem;

    p {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #999999;
    }
    h2 {
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: #333333;
      letter-spacing: -0.078px;
    }
  }
  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 1.6rem;

    p {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #999999;
    }
    h2 {
      width: 12.8rem;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: #333333;
      letter-spacing: -0.078px;
    }
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 1.6rem;

    p {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #999999;
    }
    h2 {
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: #333333;
      letter-spacing: -0.078px;
    }
  }
  .pagination-style {
    display: flex;
    gap: 1rem;
    margin: auto;
    &-child {
      border: 2px solid var(--primary);
      color: #000;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    &-child-active {
      background-color: var(--primary);
      color: var(--white);
      padding: 0.5rem 1rem;
      /* border-radius: 60%; */
    }
  }
`;
