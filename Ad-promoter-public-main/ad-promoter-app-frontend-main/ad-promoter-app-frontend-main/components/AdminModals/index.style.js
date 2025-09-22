import styled from 'styled-components';

export const OptionsStyles = styled.div`
  position: absolute;
  top: 35px;
  right: 17px;
  z-index: 1000;
  background: var(--white);
  padding: 18px 0;
  box-shadow: 5px 5px 20px rgba(27, 39, 143, 0.25);
  border-radius: 12px;
  width: 186px;
  text-align: center;

  button {
    font-size: 14px;
    background: transparent;
    cursor: pointer;
  }

  .change {
    color: var(--black-1);
    margin-bottom: 10px;
  }

  .deactivate {
    color: var(--red);
    margin-top: 10px;
  }
`;

export const ChangeAccountModalStyles = styled.div`
  .close {
    text-align: end;

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .modalContent {
    padding-top: 11px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--black-1);
    }

    p {
      font-size: 14px;
      margin-top: 24px;
      margin-bottom: 35px;
      color: var(--dark-gray-2);
    }
  }

  form {
    .inputs {
      margin-bottom: 75px;

      &__radio {
        position: relative;
      }

      input:nth-child(1) {
        margin-bottom: 24px;
      }

      input {
        margin-right: 16px;
        position: relative;
        z-index: 1000;
        opacity: 0;
      }

      label {
        font-size: 14px;
        font-weight: 600;
        color: var(--dark-gray-2);
      }

      .checkmark {
        position: absolute;
        width: 24px;
        height: 24px;
        border: 5px solid #f2f2f2;
        border-radius: 50%;
        left: -5px;
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
        background: var(--primary);
        width: 13px;
        height: 13px;
        border-radius: 50%;
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
    }

    .actions {
      text-align: end;

      button:nth-child(1) {
        margin-right: 24px;
      }

      button {
        border-radius: 12px;
        padding: 16px 0;
        width: 91px;
        font-size: 12px;
        font-weight: 500;
        border: 2px solid var(--lighter-gray);
        cursor: pointer;
      }

      &__cancel {
        color: #262626;
        background: transparent;
      }

      &__save {
        background: var(--primary);
        color: #fff;
      }
    }
  }
`;

export const DeleteAccountModalStyles = styled.div`
  .close {
    text-align: end;

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .modalContent {
    padding-top: 11px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--black-1);
    }

    p {
      font-size: 14px;
      margin-top: 24px;
      margin-bottom: 35px;
      color: var(--dark-gray-2);
    }

    ul {
      list-style-type: circle;
    }

    li {
      display: block;
      padding: 0;
      margin: 0;
    }
  }

  .actions {
    text-align: end;
    margin-top: 47px;

    button:nth-child(1) {
      margin-right: 24px;
    }

    button {
      border-radius: 12px;
      padding: 16px 0;
      font-size: 12px;
      font-weight: 500;
      border: 2px solid var(--lighter-gray);
      cursor: pointer;
    }

    &__cancel {
      color: #262626;
      background: transparent;
      width: 91px;
    }

    &__save {
      background: var(--red);
      color: #fff;
      width: 139px;
    }
  }
`;

export const InviteAdminModalStyles = styled.div`
  .close {
    text-align: end;

    button {
      background: transparent;
      cursor: pointer;
    }
  }

  .modalContent {
    padding-top: 11px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--black-1);
    }

    form {
      margin-top: 36px;

      label {
        font-size: 14px;
        font-weight: 600;
        color: var(--dark-gray-2);
        margin-bottom: 12px;
      }

      textarea {
        border: 2px solid #d9c6f9;
        box-shadow: 4px 4px 12px rgba(79, 0, 207, 0.2);
        border-radius: 10px;
        width: 441px;
        height: 126px;
        padding: 19px 23px;
        resize: none;
      }

      .actions {
        margin-top: 53px;
        display: flex;
        justify-content: space-between;

        &__copy {
          display: flex;
          justify-content: space-between;
          width: 125px;
          font-size: 12px;
          font-weight: 500;
          height: fit-content;
          margin-top: 18px;
          background: transparent;
          cursor: pointer;

          p {
            font-size: 12px;
            font-weight: 500;
            margin-top: 3px;
          }
        }

        button {
        }

        &__send {
          background: var(--primary);
          border: 1px solid #f5f5f7;
          border-radius: 12px;
          color: var(--white);
          width: 91px;
          padding: 16px 0px;
        }
      }
    }
  }
`;
