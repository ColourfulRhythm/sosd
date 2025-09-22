import styled from 'styled-components';

export const Container = styled.div`
  max-width: 123rem;
  margin: 0 auto;
  background-color: white;

  .log {
    background-color: var(--white);
    padding: 2.4rem;
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

    tbody td {
      position: relative;
      top: 3rem;
    }
    tbody tr {
      background-color: white;
    }

    td {
      padding: 1.5rem;
    }
  }
`;

export const UndoContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 33.2rem;
  z-index: 500;
  padding: 1.6rem 2.4rem;
  position: fixed;
  left: 5rem;
  bottom: 3rem;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .activity {
    color: white;
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: 600;
  }
  .undo {
    display: flex;
    gap: 0.6rem;
    align-items: center;

    p {
      color: #ffc977;
      font-size: 1.4rem;
      line-height: 2.1rem;
      font-weight: 600;
    }
  }
`;
