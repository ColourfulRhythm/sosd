import styled from 'styled-components';

export const ProfileContainer = styled.div`
  padding-top: 2rem;
  @media screen and (max-width: 400px) {
    padding-bottom: 10rem;
  }
  @media screen and (max-width: 376px) {
    padding-bottom: 0;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 12rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 400px) {
      gap: 9.5rem;
    }

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }
  .picture-change {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    p {
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.24px;
      color: #4d4d4d;
    }
  }
  .photo-modal {
    background-color: white;
    z-index: 500;
    width: 30rem;
    border-radius: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 40%;
    left: 15%;
    gap: 2rem;
    padding-top: 3.6rem;
    padding-bottom: 3.6rem;
    @media screen and (max-width: 400px) {
      left: 10%;
      top: 30%;
    }

    h3 {
      letter-spacing: -0.41px;
      font-size: 1.7rem;
      line-height: 2.2rem;
    }

    &__imageError {
      font-size: 14px;
      color: red;
    }
  }
  .upload {
    display: flex;
    align-items: center;
    background: #dce4ff;
    gap: 1.5rem;
    border: 1px solid #6b8bfc;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 0.8rem;
    padding: 1.2rem;
    position: relative;

    label {
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #000000;
    }

    input {
      position: absolute;
      width: 21rem;
      opacity: 0;
    }
  }

  .cancel {
    width: 16.6rem;
    height: 4.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cf0000;
    color: white;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 10.5727px;
    font-size: 1.6rem;
    line-height: 1.9rem;
    font-weight: 700;
  }
  .backdrop {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    backdrop-filter: blur(12px);
  }
  .profile-details {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    position: relative;
    width: 100%;
    background: #ffffff;
    border-radius: 0.991579rem;
    padding: 1.6rem;

    h3 {
      font-size: 1.1rem;
      line-height: 1.3rem;
      letter-spacing: 0.066px;
      color: #808080;
    }

    .date {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      letter-spacing: -0.5px;
      color: #e0e0e0;
    }

    input {
      width: 100%;
      background-color: transparent;
      outline: none;
      border: none;
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.5px;
      color: #404040;
    }

    p {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.5px;
      color: #404040;
    }

    label {
      font-size: 1.1rem;
      line-height: 1.3rem;
      letter-spacing: 0.066px;
      color: #808080;
    }
  }
  ul {
    background: #ffffff;
    box-shadow: 4px 4px 12px rgba(39, 58, 123, 0.25);
    border-radius: 12px;
    width: 100%;
    cursor: pointer;
    position: absolute;
    top: 7rem;
    left: 0.2rem;
    li {
      border-bottom: 0.5px solid #dbd8fc;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #010101;
      padding: 1.2rem 2.4rem;
      width: 100%;
    }
  }
  .changes {
    margin-top: 10rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .discard {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18.65rem;
      background-color: #bebebe;
      color: white;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      border-radius: 0.8rem;
      height: 5.2rem;
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }

    .save {
      color: white;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      border-radius: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18.65rem;
      background-color: #4f00cf;
      height: 5.2rem;
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }

    .inactive {
      background-color: var(--primary);
      opacity: 0.25;
      color: white;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      border-radius: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18.65rem;
      height: 5.2rem;
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
  }
`;
export const GeneralContainer = styled.div`
  padding-top: 2rem;

  .general {
    display: flex;
    align-items: center;
    gap: 12rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 400px) {
      gap: 9.5rem;
    }

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }
  .dropdownContainer {
    margin-top: 1.7rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;

    h3 {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.5px;
    }
  }
  .dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    background: #ffffff;
    border: 1px solid #f5f5f7;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    .inputText {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #333333;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #ffffff;
    box-shadow: 4px 4px 12px rgba(39, 58, 123, 0.25);
    border-radius: 12px;
    width: 100%;
    cursor: pointer;
    li {
      border-bottom: 0.5px solid #dbd8fc;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #010101;
      padding: 1.2rem 2.4rem;
      width: 100%;
    }
  }
  .timezone {
    margin-top: 5rem;
    p {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 2rem;
      color: var(--black-3);
    }

    div {
      margin-top: 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      #select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 17.8rem;
        padding: 1.6rem 2rem;
        border-radius: 1rem;
        cursor: pointer;
        transition: all 100ms ease-in-out;
        @media screen and (max-width: 376px) {
          width: 16rem;
        }

        label {
          font-size: 1.2rem;
          line-height: 1.6rem;
          cursor: pointer;
          color: #333333;
        }
      }
    }
  }
  .deactivate {
    width: 100%;
    background-color: white;
    padding: 1rem;
    border-radius: 0.8rem;
    color: #ed9005;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 150%;
    letter-spacing: -0.02em;
    margin-top: 3rem;
  }
  .delete {
    margin-top: 3rem;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 150%;
    color: #eb1e1e;
    margin-bottom: 3rem;
    padding-left: 1rem;
  }
  .modal-backdrop {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(12px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .deactivate-modal {
    background-color: white;
    /* z-index: 500; */
    max-width: 38.8rem;
    width: 90%;
    /* position: fixed;
    top: 10%;
    left: 3%; */
    padding: 1rem;
    /* padding: 3.2rem 2.4rem; */
    box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    /* @media screen and (max-width: 400px) {
      width: 35rem;
      left: 5%;
      top: 5%;
    }
    @media screen and (max-width: 376px) {
      width: 33rem;
      left: 5%;
      top: 5%;
    } */
  }

  .unordered-list {
    margin-top: 3rem;
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;

    li {
      font-size: 1.6rem;
      line-height: 1.8rem;
      letter-spacing: -0.02em;
      list-style: none;
    }
  }

  .text-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    h3 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 2.1rem;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 1.4rem;
      line-height: 1.8rem;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
  .text-select {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
    position: relative;
    @media screen and (max-width: 376px) {
      gap: 0.8rem;
    }

    h3 {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 1.8rem;
      letter-spacing: -0.02em;
    }
    .dropdown {
      padding: 1.6rem 2.4rem;
      width: 100%;
      background-color: white;
      border: 1px solid #f5f5f7;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: 500;
        color: #404d4d;
        font-size: 1.2rem;
        line-height: 1.8rem;
        letter-spacing: -0.02em;
      }
    }
  }
  .list-dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #ffffff;
    box-shadow: 4px 4px 12px rgba(39, 58, 123, 0.25);
    border-radius: 12px;
    width: 100%;
    position: absolute;
    top: 100%;
    z-index: 100;
    cursor: pointer;
    li {
      border-bottom: 0.5px solid #dbd8fc;
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: #404d4d;
      padding: 1.2rem 2.4rem;
      width: 100%;
    }
  }
  .message {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    @media screen and (max-width: 376px) {
      margin-top: 1.5rem;
    }

    h3 {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 1.8rem;
      letter-spacing: -0.02em;
      color: #333333;
    }
    textarea {
      /* padding: 1.6rem 2rem; */
      border: 1px solid #f5f5f7;
      border-radius: 1rem;
      width: 100%;
      /* height: 16.5rem; */
      @media screen and (max-width: 376px) {
        /* height: 14rem; */
      }
      &::placeholder {
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.8rem;
        letter-spacing: -0.02em;
        color: var(--dark-gray-2);
      }
    }
  }
  .modal-btn {
    background: #eb1e1e;
    border-radius: 8px;
    background: #eb1e1e;
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: white;
    font-weight: 600;
    letter-spacing: -2%;
    width: 27.1rem;
    text-align: center;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    margin: 3rem auto;
    @media screen and (max-width: 376px) {
      margin: 1.5rem auto;
    }
  }
`;
export const NotifContainer = styled.div`
  padding-top: 2rem;

  .notification {
    display: flex;
    align-items: center;
    gap: 12rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 400px) {
      gap: 9.5rem;
    }

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }
  .notifications-selection {
    display: flex;
    flex-direction: column;
    margin-bottom: 6rem;
    background-color: white;
    border-radius: 1.6rem;

    .line {
      height: 1px;
      background-color: #f2f2f2;
      margin: 1rem;
    }

    li {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: flex-start;
      ${'' /* margin-right: 1rem; */}
      margin: 1.25rem 0;

      input {
        height: 12px;
        width: 12px;
      }

      .container {
        display: flex;
        align-items: center;
        margin: 0 2rem;

        .checkbox,
        .checkbox-2 {
          opacity: 0;
          position: absolute;
        }

        label {
          border: 1px solid #ededed;
          transform: scale(1.5);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 3.4rem;
          height: 1.85rem;
          position: relative;
          cursor: pointer;
          background-color: transparent;
          border-radius: 28px;

          .one {
            color: pink;
            font-size: 9px;
          }

          .two {
            color: yellow;
            font-size: 9px;
          }

          .ball {
            top: 1.5px;
            left: 1px;
            position: absolute;
            transition: transform 0.25s linear;
            height: 1.3rem;
            width: 1.3rem;
            border-radius: 50%;
            margin: 0 0.075rem;
          }
        }
      }

      .checkbox:checked + label .ball {
        transform: translateX(16px);
      }
      .checkbox-2:checked + label .ball-2 {
        transform: translateX(-16px);
      }
    }

    span,
    label {
      color: var(--dark-gray);
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 500;
      margin: 0.5rem 0;
    }
  }
`;

export const SecurityContainer = styled.div`
  padding-top: 1rem;

  .security {
    display: flex;
    align-items: center;
    gap: 12rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 400px) {
      gap: 9.5rem;
    }

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }
  .info {
    margin-top: 2rem;
    p {
      font-size: 1.6rem;
      line-height: 2.1rem;
      letter-spacing: -0.32px;
      font-weight: 600;
    }
    span {
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.08px;
      color: var(--dark-gray);
    }
  }
  form {
    margin-top: 3rem;
    margin-bottom: 6rem;

    .pwd {
      display: flex;
      flex-direction: column;
      margin: 2rem 0;
      color: var(--dark-gray);

      .input-error {
        width: 100%;
        padding: 1.6rem 2rem;
        font-size: 1.75rem;
        border: 0.145rem solid var(--red);
        border-radius: 1rem;
        margin-top: 1.2rem;
      }

      label {
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #808080;
      }
      input {
        width: 100%;
        padding: 1.6rem 2rem;
        font-size: 1.75rem;
        border: 0.145rem solid #e1e1e1;
        border-radius: 1rem;
        margin-top: 1.2rem;
      }
      input:hover {
        border: 0.145rem solid #ccc;
      }
    }
    .email-field {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      width: 100%;
      height: 7rem;
      background: #ffffff;
      border-radius: 0.8rem;
      padding: 0.8rem 1.6rem;
      margin-bottom: 2rem;

      label {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333333;
        width: 100%;
        line-height: 2rem;
      }
      input {
        width: 100%;
        background-color: transparent;
        outline: none;
        border: none;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.6rem;
        letter-spacing: -0.011em;
        color: #808080;
      }
    }
    .line {
      background-color: #f2f2f2;
      height: 2px;
      width: 100%;
      margin-bottom: 2rem;
    }

    .submit {
      width: 100%;
      margin-top: 5rem;
      margin-bottom: 2rem;
    }

    .controls {
      background-color: var(--primary);
      opacity: 0.25;
      width: 100%;
      color: white;
      text-align: center;
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      border-radius: 0.8rem;
    }
    .inactive {
      width: 100%;
      color: white;
      text-align: center;
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      background-color: #4f00cf;
      border-radius: 0.8rem;
    }
  }
  /* .controls {
    background-color: var(--primary);
    opacity: 0.25;
    width: 100%;
    margin-top: 5rem;
    color: white;
    text-align: center;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    border-radius: 0.8rem;
    margin-bottom: 2rem;
  }
  .inactive {
    width: 100%;
    margin-top: 5rem;
    color: white;
    text-align: center;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    background-color: #4f00cf;
    border-radius: 0.8rem;
    margin-bottom: 2rem;
  } */
`;

export const PaymentContainer = styled.div`
  padding-top: 2rem;

  .payment {
    display: flex;
    align-items: center;
    gap: 12rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 400px) {
      gap: 9.5rem;
    }

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }
  .details {
    margin-top: 1rem;

    p {
      font-size: 1.6rem;
      line-height: 2.1rem;
      letter-spacing: -0.32px;
      font-weight: 600;
    }
    span {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: var(--dark-gray);
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;

    p {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.5px;
    }
    span {
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #333333;
    }
    .trash-icon {
      width: 25px;
      height: 25px;
      object-fit: cover;
      color: var(--dark-gray-1);
      cursor: pointer;
    }
  }
  .selection {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .card {
    height: 8.2rem;
    width: 100%;
    border: 1px solid #e1e1e1;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
  }
  .holder {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .name {
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
  }
`;

export const PrivacyContainer = styled.div`
  padding-top: 2rem;

  .privacy {
    display: flex;
    align-items: center;
    gap: 8rem;
    @media screen and (max-width: 400px) {
      gap: 6rem;
    }

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }
  .policies {
    display: flex;
    flex-direction: column;

    .policy {
      margin: 2rem 0;

      h2 {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 2.1rem;
        letter-spacing: -2%;
      }
      p {
        margin-top: 0.5rem;
        font-size: 1.4rem;
        line-height: 1.8rem;
        letter-spacing: -0.02em;
        color: rgba(0, 0, 0, 0.675);
      }
    }
  }
`;
