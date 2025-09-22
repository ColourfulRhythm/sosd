import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const StyledSettings = styled.div`
  padding: 3rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  main {
    margin-top: 3.5rem;
    background-color: var(--white);
    width: 900px;
    border-radius: 4px;
    min-height: 70vh;
    padding: 3rem 0.75rem;
    box-shadow: var(--shadow-6);
    @media (min-width: 768px) and (max-width: 1024px) {
      min-height: fit-content;
      position: relative;
    }

    .categories {
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      @media (min-width: 768px) and (max-width: 1024px) {
        justify-content: space-between;
        align-items: center;
      }

      li {
        margin: 0 2.25rem;
        color: var(--light-gray-2);
        font-size: 1.35rem;
        font-weight: 400;
        cursor: pointer;
        padding: 0 0.75rem;
        padding-bottom: 0.8rem;
        transition: 150ms ease-out;
        @media (min-width: 768px) and (max-width: 1024px) {
          margin: 0 1rem;
        }
      }
    }

    .contents {
      margin-top: 1rem;
      color: var(--black);
      padding: 2rem;
    }
  }
  @media screen and (max-width: 805px) {
    StyledSettings {
      padding: 0;
    }
    main {
      width: 100vw;
    }
  }
  .blurred {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.375);
    backdrop-filter: blur(12px);
  }

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 500px;
    background-color: white;
    box-shadow: var(--shadow-6);
    position: fixed;
    top: 25%;
    border-radius: 6px;
    z-index: 99;

    .close-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;
      width: 25px;
      position: absolute;
      top: 4%;
      right: 4%;
      cursor: pointer;
      border: 1px solid var(--dark-gray);
      ${'' /* padding: 0.25rem; */}
      border-radius: 50%;
    }

    .contents {
      text-align: center;
      width: 100%;
      margin: 3rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 2rem 0;
        color: var(--black);
        font-weight: 600;
        font-size: 1.85rem;
      }
      span {
        color: var(--dark-gray);
        font-weight: 500;
        font-size: 1.425rem;
      }
      .upload {
        margin: 1rem 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
        width: fit-content;
        border: 1px solid var(--light-blue);
        border-radius: 6px;
        background-color: #dce4ff;
        padding: 0.75rem 1.05rem;
        cursor: pointer;
        position: relative;

        input {
          position: absolute;
          width: 100%;
          opacity: 0;
          cursor: pointer;
        }

        label {
          color: var(--dark-gray);
          font-weight: 500;
          font-size: 1.425rem;
        }
      }
      .cancel {
        margin-top: 3rem;
      }
    }
    .photo-modal {
      width: 250px;
    }

    .btn-controls {
      margin-top: 8rem;
      display: flex;
      justify-content: center;
      gap: 7rem;
      align-items: center;
    }
  }

  .logout {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    position: fixed;
    cursor: pointer;
    bottom: 6%;
    right: 7%;
    @media (min-width: 768px) and (max-width: 1024px) {
      position: absolute;
    }

    p {
      color: red;
      font-weight: 500;
    }
  }
`;

const StyledGeneral = styled.form`
  margin-top: 1.5rem;
  color: var(--black);
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    margin-bottom: 8rem;
  }

  .dropdownContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    max-width: 40rem;
    position: relative;
    h3 {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: var(--black-1);
    }
    .dropdown {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.6rem 2rem;
      gap: 1rem;
      background: #ffffff;
      border: 1px solid #f5f5f7;
      border-radius: 10px;
      width: 100%;
      cursor: pointer;
      position: relative;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 40rem;
      }
      .inputText {
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.8rem;
        letter-spacing: -0.02em;
        color: var(--dark-gray);
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
      position: absolute;
      top: 110%;
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
  }

  .timezone {
    margin-top: 5rem;
    p {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--black-3);
    }

    div {
      margin-top: 0.75rem;
      display: flex;
      flex-direction: row;
      gap: 6rem;

      #select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: fit-content;
        padding: 1.25rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 100ms ease-in-out;

        label {
          font-size: 1.3rem;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }
  .controls {
    width: 90%;
    margin-top: 17rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (min-width: 768px) and (max-width: 1024px) {
      margin-top: 5rem;
      width: 65%;
    }
    .inactive {
      background-color: var(--primary);
      opacity: 0.25;
    }
  }

  .blurred-modal-container {
    width: 100vw;
    /* height: 723px; */
    /* height: 100%; */
    display: flex;
    justify-content: center;
    /* align-items: flex-start; */
    /* z-index: 100; */
  }

  .blurred {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.375);
    backdrop-filter: blur(12px);
  }
  .modal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 4.8rem;
    gap: 4.8rem;
    background: #ffffff;
    box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
    border-radius: 1rem;
    max-width: 69.3rem;
    width: 100%;
    height: 723px;
    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4.8rem;
    }

    p,
    li {
      color: var(--dark-gray);
      font-size: 1.45rem;
      font-weight: 500;
    }

    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.4rem;
      &-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        h2 {
          font-weight: 600;
          font-size: 2.4rem;
          line-height: 2.1rem;
        }
        p {
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 1.8rem;
          letter-spacing: -0.02em;
          color: var(--dark-gray);
        }
      }
    }
    ul {
      width: 100%;
      list-style-type: circle;
      padding: 0rem 3rem;
      margin-bottom: 3rem;
    }
    .others {
      padding: 0rem 1.5rem;
      width: 100%;
      display: absolute;

      .reason {
        font-weight: 600;
        font-size: 1.45rem;
        color: var(--black);
      }
      .dropdown {
        background-color: transparent;
        color: var(--black-2);
        margin-top: 1.3rem;
        width: 300px;
        font-size: 1.35rem;
        font-weight: 500;
        cursor: pointer;
        padding: 0.75rem 0.45rem;
        border: 0.145rem solid #e1e1e1;
        border-radius: 4px;
      }
      .dropdown:hover {
        border: 0.145rem solid #ccc;
      }

      .dropdown:focus {
        outline: none;
      }

      .more {
        margin: 5rem 0;

        textarea {
          margin-top: 1.25rem;
          padding: 1rem;
          width: 80%;
          font-size: 1.4rem;
          font-weight: 500;
          border: 0.145rem solid #e1e1e1;
          border-radius: 4px;
          resize: none;
          font-family: 'Poppins';
        }
        textarea::placeholder {
          font-size: 1.4rem;
          color: var(--dark-gray);
        }
      }
    }
    .control {
      margin-top: 3rem;
      margin-right: -75%;
    }
  }

  .modal-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(25px);
    display: flex;
    justify-content: center;
    z-index: 100;
    align-items: center;
    .deactivate-modal {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 2rem 4.8rem;
      gap: 4.8rem;
      background: #ffffff;
      z-index: 500;
      box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      &-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4.8rem;
        &-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.4rem;
          &-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            h3 {
              font-weight: 600;
              font-size: 2.4rem;
              line-height: 2.1rem;
              letter-spacing: -0.02em;
              color: var(--black-1);
            }
            p {
              font-weight: 400;
              font-size: 1.4rem;
              line-height: 1.8rem;
              letter-spacing: -0.02em;
              color: var(--dark-gray);
            }
          }
          &-bottom {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
            li {
              font-weight: 400;
              font-size: 16px;
              line-height: 18px;
              letter-spacing: -0.02em;
              color: var(--dark-gray);
            }
          }
        }
        &-select {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          width: 52.7rem;
          position: relative;
          h3 {
            font-weight: 600;
            font-size: 1.4rem;
            line-height: 1.8rem;
            letter-spacing: -0.02em;
            color: var(--dark-gray);
          }
          .dropdown {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 1.6rem 2rem;
            gap: 1rem;
            border: 1px solid #f5f5f7;
            border-radius: 1rem;
            width: 100%;
            p {
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              letter-spacing: -0.02em;
              color: var(--dark-gray-2);
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
            position: absolute;
            top: 100%;
            z-index: 100;
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
        }
        &-message {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          width: 52.7rem;
          h3 {
            font-weight: 600;
            font-size: 1.4rem;
            line-height: 1.8rem;
            letter-spacing: -0.02em;
            color: var(--dark-gray);
          }
          textarea {
            padding: 1rem 2rem;
            border: 1px solid #f5f5f7;
            border-radius: 1rem;
            width: 100%;
            height: 16.5rem;
            &::placeholder {
              font-weight: 500;
              font-size: 1.2rem;
              line-height: 1.8rem;
              letter-spacing: -0.02em;
              color: var(--dark-gray-2);
            }
          }
        }
      }
      &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.2rem 3.6rem;
        background: #eb1e1e;
        border-radius: 0.8rem;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
`;

const StyledNotification = styled.div`
  width: 100%;

  .notifications-selection {
    display: flex;
    flex-direction: column;
    margin-bottom: 6rem;

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
      font-weight: 500;
      margin: 0.5rem 0;
    }
  }
  .controls {
    margin-top: 10rem;
    @media (min-width: 768px) and (max-width: 1024px) {
      float: right;
      margin-top: 2rem;
      margin-bottom: 8rem;
    }
    .inactive {
      background-color: var(--primary);
      opacity: 0.25;
    }
  }
`;

const StyledSecuirity = styled.div`
  width: 100%;
  .info {
    margin-top: 1rem;
    p {
      font-size: 1.65rem;
      font-weight: 500;
    }
    span {
      width: 60%;
      font-size: 1.35rem;
      font-weight: 500;
      color: var(--dark-gray);
    }
  }

  form {
    margin-top: 3rem;
    margin-bottom: 6rem;
    width: 46.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;

    .pwd {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      background: #ffffff;
      box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
      border-radius: 0.991579rem;
      padding: 0.661053rem 1.32211rem;

      .input-error {
        width: 100%;
        padding: 0.25rem 0.75rem;
        font-size: 1.75rem;
        border: 0.145rem solid var(--red);
        border-radius: 4px;
        margin-top: 1.2rem;
      }

      label {
        font-size: 0.992rem;
        font-weight: 600;
        color: #333333;
        width: 100%;
        line-height: 1.983rem;
      }
      input {
        width: 100%;
        background-color: transparent;
        outline: none;
        border: none;
        font-weight: 700;
        font-size: 1.23974rem;
        line-height: 2rem;
        letter-spacing: -0.011em;
        color: #404040;
        &::placeholder {
          font-weight: 600;
          font-size: 1.15684rem;
          line-height: 20rem;
          letter-spacing: -0.011em;
          color: #e0e0e0;
        }
      }
    }
  }

  .other {
    width: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 1.25rem;

    .contents {
      padding-left: 0rem;
      width: 80%;

      p {
        font-size: 1.65rem;
        font-weight: 500;
      }
      span {
        width: 60%;
        font-size: 1.35rem;
        font-weight: 500;
        color: var(--dark-gray);
      }
    }
    button {
      height: fit-content;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-gray);
      background-color: transparent;
      border: 1px solid #ccc;
      padding: 0.75rem 1.25rem;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .sms-recovery {
    button {
      padding: 0.75rem 2rem;
    }
  }
  .controls {
    margin-top: 45rem;
    @media (min-width: 768px) and (max-width: 1024px) {
      float: right;
      margin-top: 2rem;
      margin-bottom: 8rem;
    }
    .inactive {
      background-color: var(--primary);
      opacity: 0.25;
    }
  }
`;

const StyledPayment = styled.div`
  width: 100%;

  .details {
    margin-top: 1rem;

    p {
      font-size: 1.7rem;
      font-weight: 600;
    }
    span {
      font-size: 1.35rem;
      font-weight: 500;
      color: var(--dark-gray);
    }
  }
  div {
    margin-top: 4rem;
    .top {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 85%;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 58%;
      }

      p {
        font-size: 1.45rem;
        font-weight: 600;
      }
      .trash-icon {
        width: 25px;
        height: 25px;
        object-fit: cover;
        color: var(--dark-gray-1);
        cursor: pointer;
      }
    }
  }
  .payment-selection {
    width: 100%;

    .card {
      height: 100px;
      width: fit-content;
      border: 1px solid #e1e1e1;
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 10rem;
      padding: 0.2rem 2.15rem;
      padding-bottom: 4.5rem;
      cursor: pointer;

      .holder {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;

        .image-wrapper {
          margin-bottom: 4rem;
        }

        .info {
          margin-bottom: 4.75rem;
          color: var(--primary);

          span {
            display: inline-block;
            color: var(--black);
            font-size: 1.5rem;
            font-weight: 500;
          }
          span.name {
            font-size: 1.25rem;
            color: var(--black);
          }
        }
      }
    }
  }
  .controls {
    margin-top: 10rem;
    @media (min-width: 768px) and (max-width: 1024px) {
      float: right;
      margin-top: 2rem;
      margin-bottom: 8rem;
    }
    .inactive {
      background-color: var(--primary);
      opacity: 0.25;
    }
  }
`;

const StyledProfile = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  ${'' /* align-items: center; */}
  ${'' /* justify-content: center; */}

    .profile-image {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .image-wrapper {
      margin-top: 1.75rem;
      position: relative;
      overflow: hidden;

      .upload-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: var(--light-blue);
        width: fit-content;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  .help-center-container {
    ${'' /* overflow: hidden; */}
    position: absolute;
    top: 2%;
    right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .question-mark {
      transform: translateY(50%);
      ${'' /* position: absolute; */}
      left: -50%;
      z-index: 10000;
      background-color: var(--primary);
      top: -9%;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      border: 2px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

      span {
        font-weight: 700;
        color: #fff;
        font-size: 13px;
      }
    }

    .help-center {
      position: relative;
      ${
        '' /* top: 4%;
            right: 4%; */
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--primary);
      padding: 2px;
      padding-bottom: 4px;
      border-radius: 10px;
      width: 160px;
      height: 200px;
      overflow: hidden;

      .contents {
        text-align: center;
        color: #fff;
        width: 100%;
        ${'' /* margin-bottom: 0.7rem; */}
        z-index: 90;

        p {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        span {
          font-size: 10px;
          display: inline-block;
          width: 90%;
        }

        &__imageError {
          font-size: 14px;
          color: red;
        }
      }

      .overlay {
        position: absolute;
        bottom: -25%;
        right: -25%;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(50px);
        height: 95px;
        width: 95px;
        border-radius: 50%;
      }
      .overlay-2 {
        position: absolute;
        top: -25%;
        left: -25%;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(30px);
        height: 95px;
        width: 95px;
        border-radius: 50%;
      }

      button {
        background-color: #fff;
        width: 80%;
        border-radius: 4px;
        color: var(--black);
        padding: 0.65rem 1rem;
        font-size: 9px;
        font-weight: 600;
        cursor: pointer;
        z-index: 90;
      }
    }
  }

  .blurred {
    left: 0;
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
  }

  .photo-modal {
    width: 370px;
    padding: 1rem;
    margin-left: 7rem;
    /* z-index: 100; */

    span {
      color: black;
    }
  }

  .profile-details {
    margin-top: 5rem;
    width: 46.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
    /* z-index: -1; */

    .form-field {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      background: #ffffff;
      box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
      border-radius: 0.991579rem;
      padding: 0.661053rem 1.32211rem;

      label {
        font-size: 0.992rem;
        font-weight: 600;
        color: #333333;
        width: 100%;
        line-height: 1.983rem;
      }

      input {
        width: 100%;
        background-color: transparent;
        outline: none;
        border: none;
        font-weight: 700;
        font-size: 1.23974rem;
        line-height: 2rem;
        letter-spacing: -0.011em;
        color: #404040;
        &::placeholder {
          font-weight: 600;
          font-size: 1.15684rem;
          line-height: 20rem;
          letter-spacing: -0.011em;
          color: #e0e0e0;
        }
      }
    }
    .account-birth {
      input {
        cursor: pointer;
        font-family: 'Poppins';
        font-size: 600;
        font-weight: 1.5684rem;
        line-height: 2rem;
        color: #e0e0e0;
      }
    }
    .gender {
      select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        padding: 0.75rem;
        border: 1px solid #ededed;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1.3rem;
        color: var(--dark-gray);
      }
      select:focus {
        outline: none;
      }
    }
    .dropdownContainer {
      h3 {
        font-weight: 600;
        font-size: 0.991579rem;
        line-height: 2rem;
        letter-spacing: -0.011em;
        color: #333333;
      }
      .dropdown {
        cursor: pointer;
        position: relative;
        .inputText {
          font-weight: 700;
          font-size: 1.15684rem;
          line-height: 2rem;
          letter-spacing: -0.01em;
          color: #404040;
          text-transform: capitalize;
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
        position: absolute;
        top: 100%;
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
    }
  }

  .controls {
    margin-top: 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10rem;
    .inactive {
      background-color: var(--primary);
      opacity: 0.25;
    }
  }
`;

const StyledPolicy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) and (max-width: 1024px) {
    align-items: flex-start;
  }

  .policies {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .policy {
      margin: 2rem 0;
      @media (min-width: 768px) and (max-width: 1024px) {
        margin-bottom: 4rem;
      }

      h2 {
        font-weight: 600;
        font-size: 1.65rem;
      }
      p {
        margin-top: 0.5rem;
        font-size: 1.25rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.675);
      }
    }
  }
`;

const StyledAdmin = styled.section`
  // background: red;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 2.3rem 1.5rem;
    border: 1px solid #f2f2f2;
    border-radius: 0.63rem;
    margin-bottom: 48px;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);

    &__title {
      font-weight: 600;
      font-size: 20px;
      color: var(--black-1);
    }

    button {
      background: var(--green-2);
      color: #fff;
      font-size: 14px;
      padding: 0.75rem 1.5rem;
      border-radius: 0.63rem;
      cursor: pointer;
    }
  }

  li {
    display: grid;
    grid-template-columns: 8% 92%;

    .titles {
      display: grid;
      grid-template-columns: 50% 25% 25%;
      gap: 10px;
    }

    h2 {
      font-size: 14px;
      font-weight: 600;
    }
  }

  li:nth-child(1) {
    width: 95%;
    padding: 0 17px;
  }

  li:nth-child(2) {
    margin-top: 27px;
  }

  .item {
    position: relative;
    margin-bottom: 12px;
    border-radius: 8px;
    border: 1px solid #f2f2f2;
    padding: 30px 17px;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);

    &__content {
      display: flex;
      justify-content: space-between;

      div {
        font-size: 14px;
      }

      .details {
        display: flex;
        justify-content: space-between;
        width: 225px;

        &__email {
          font-size: 12px;
          color: #8f9bb3;
        }
      }
    }
  }

  .options {
    background: transparent;
    cursor: pointer;
  }

  .active {
    background: var(--white);
  }

  .inactive {
    background: #f4f4f4;
  }

  .save {
    margin-top: 32px;
    background: var(--primary);
    color: var(--white);
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    width: 216px;
    border-radius: 10px;
    padding: 12px 0;
    cursor: pointer;
  }
`;

const PlainButton = styled.button`
  background-color: transparent;
  color: var(--dark-gray);
  font-size: 1.45rem;
  font-weight: 500;
  padding: 1rem 4rem;
  border: 1px solid #ccc;
  border-radius: 7px;
  cursor: pointer;
`;

const Button = styled.button`
  ${'' /* margin-top: 10rem; */}
  background-color: var(--primary);
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 1rem 2.85rem;
  border-radius: 6px;
  cursor: pointer;
`;

const DangerButton = styled.button`
  ${'' /* margin-top: 10rem; */}
  background-color: transparent;
  color: red;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
`;
const Danger = styled.button`
  ${'' /* margin-top: 10rem; */}
  background-color: red;
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.75rem 1.35rem;
  border-radius: 6px;
  cursor: pointer;
`;
const Plain = styled.button`
  ${'' /* margin-top: 10rem; */}
  background-color: transparent;
  color: var(--dark-gray);
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.755rem 1.35rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
`;

export const ball = `{
    .checkbox:checked + label .ball {
        transform: translateX(16px);
    }
}`;

export {
  StyledGeneral,
  StyledSettings,
  StyledSecuirity,
  Button,
  DangerButton,
  Danger,
  Plain,
  PlainButton,
  StyledNotification,
  StyledPayment,
  StyledProfile,
  StyledPolicy,
  StyledAdmin,
};
export const MobileSettings = styled.div`
  display: none;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (max-width: 425px) {
    display: block;
  }
  @media screen and (max-width: 380px) {
    padding-bottom: 20rem;
  }
  .user-profile {
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    h2 {
      font-weight: 600;
      font-size: 1.7rem;
      line-height: 2.2rem;
      letter-spacing: -0.41px;
    }
  }
  .welcome {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.08px;
    }
  }
  .column {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  .row {
    background-color: white;
    padding: 0.8rem 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.8rem;
  }
  .name-column {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    p {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 2.1rem;
      letter-spacing: -0.32px;
    }
  }
  .logout {
    background-color: white;
    width: 100%;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 1.6rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    p {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 2.1rem;
      letter-spacing: -0.32px;
    }
  }
  .logout-modal {
    width: 38.8rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2.4rem;
    border-radius: 1.6rem;
    position: fixed;
    top: 20%;
    left: 3%;
    z-index: 500;
    @media screen and (max-width: 400px) {
      width: 35rem;
      left: 5%;
    }
    @media screen and (max-width: 376px) {
      width: 33.5rem;
    }

    h3 {
      text-align: center;
      font-size: 2.4rem;
      line-height: 3.6rem;
      font-weight: 600;
      color: #262626;
    }
    p {
      text-align: center;
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #333333;
    }
  }
  .logout-icon {
    background: #ffffff;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7.2rem;
    height: 7.2rem;
    margin: 0 auto;
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cancel {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15.8rem;
      height: 4.8rem;
      border: 1px solid #b3b3b3;
      box-shadow: 1px 4px rgba(103, 127, 214, 0.15);
      border-radius: 10.5727px;
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 1.9rem;
      color: #333333;
      @media screen and (max-width: 400px) {
        width: 14rem;
      }
    }

    .proceed {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15.8rem;
      height: 4.8rem;
      background: #cf0000;
      box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
      border-radius: 10.5727px;
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 1.9rem;
      color: white;
      @media screen and (max-width: 400px) {
        width: 14rem;
      }
    }
  }
`;
