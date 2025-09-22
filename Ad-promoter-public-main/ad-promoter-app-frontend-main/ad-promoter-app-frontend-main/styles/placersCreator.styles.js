import styled from 'styled-components';

export const TopStyledCreator = styled.div`
  background: var(--bg);
  padding-top: 2.5rem;
`;

export const StyledCreator = styled.div`
  width: 93%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 425px) {
    display: none;
  }
  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .creator-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2.4rem 6rem 2.4rem 2.4rem;
    /* gap: 65px; */
    background: #ffffff;
    border-radius: 1.6rem;
    width: 100%;
    margin-bottom: 4rem;
    h3 {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 2.7rem;
      color: var(--black-1);
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

  .creator-body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.4rem;
      gap: 20rem;
      background: #ffffff;
      border-radius: 1.6rem;
      @media screen and (max-width: 1024px) {
        gap: 3rem;
      }
      @media screen and (max-width: 768px) {
        padding: 2.4rem 1rem;
        gap: 2rem;
      }
      &-details {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-grow: 1;
        @media screen and (max-width: 1024px) {
          gap: 6rem;
        }
        @media screen and (max-width: 768px) {
          gap: 0rem;
        }
        .product-name,
        .ad-type,
        .aim,
        .achieved,
        .price,
        .status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
            p {
              font-weight: 600;
              font-size: 14px;
              line-height: 21px;
              color: #0d0d0d;
            }
          }
          p {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            /* color: #333333; */
            text-transform: capitalize;
          }
        }
        .status {
          &-text {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0.4rem 1.6rem;
            /* border: 1px solid #dbd8fc; */
            border-radius: 10rem;
            font-weight: 600;
            font-size: 1rem;
            line-height: 1.5rem;
            color: white;
          }
        }
      }
      .cta {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0.8rem 2.4rem;
        background: #f9f5ff;
        border-radius: 0.8rem;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: var(--primary);
        cursor: pointer;
      }
    }
  }

  .creator-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 1.6rem 2.4rem;
    background: #4f00cf;
    border: 1px solid #f5f5f7;
    box-shadow: 4px 4px 12px rgba(39, 58, 123, 0.25);
    border-radius: 1.2rem;
    width: 28.2rem;
    margin-top: 2rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: var(--white);
    cursor: pointer;
    margin-bottom: 8rem;
  }
`;

export const EmptyCreatorScreen = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5625rem;

  .container {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .loading-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    max-width: 28.3rem;
    h2 {
      text-align: center;
      font-family: Poppins;
      font-size: 28px;
      font-weight: 700;
      line-height: 152.2%; /* 42.616px */
      color: #0d0d0d;
    }
    p {
      text-align: center;
      font-family: Poppins;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 152.2%; /* 27.396px */
      color: #333;
    }
  }

  button {
    display: inline-flex;
    height: 55px;
    padding: 16px 48px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #4f00cf;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    h3 {
      color: #0d0d0d;
      text-align: center;
      font-family: Poppins;
      font-size: 1.75rem;
      font-style: normal;
      font-weight: 700;
      line-height: 152.2%; /* 2.6635rem */
    }
    p {
      color: #333;
      text-align: center;
      font-family: Poppins;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 152.2%; /* 1.71225rem */
    }
    .grey {
      color: #9e9e9e;
      text-align: center;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 152.2%; /* 25.519px */
    }
  }
`;

export const MobileCreator = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 10rem;
  display: none;
  @media screen and (max-width: 425px) {
    display: block;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  h4 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: -0.5px;
    color: #0d0d0d;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* margin-top: 2rem; */
  }
  .creator {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: white;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    width: 24.25rem;
  }
  .product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.6rem;
    padding-right: 1.6rem;

    h3 {
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
      letter-spacing: -0.408px;
      color: #0d0d0d;
    }
    p {
      font-weight: 600;
      color: white;
      font-size: 10px;
      line-height: 15px;
      padding: 4px 16px;
      border-radius: 100px;
    }
  }
  .types {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(198, 198, 200, 0.4);
    padding-bottom: 1rem;

    h4 {
      padding-right: 1.6rem;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.078px;
      color: #333333;
      /* width: 50%; */
    }
  }
  .icon {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 1.6rem;

    p {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: #8e8e93;
      width: 70%;
    }
  }
  .view {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 4px 16px;
    color: #4f00cf;
    width: 8.2rem;
    margin-left: auto;
    margin-right: 1.6rem;
  }
  .creator-btn {
    background: #4f00cf;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
    margin: 2rem auto;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;
    width: 19.6rem;
  }
`;

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 425px) {
    position: fixed;
    z-index: 100;
  }

  .modal-open {
    overflow: hidden;
  }

  .file-modal {
    padding: 1.5rem;
    gap: 4rem;
    background: var(--white);
    border-radius: 1.4rem;
    min-width: 30%;
    height: 40%;
    position: relative;

    .input {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    input {
      border: none;
    }
    overflow-y: scroll;

    .confirm {
      background: #4f00cf;
      color: #fff;
      padding: 0.5rem 2rem;
      border-radius: 1rem;
    }

    .awaiting {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .image-preview {
    display: grid;
    gap: 1.8rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    width: 50rem;
    margin-bottom: 3rem;
    @media screen and (max-width: 750px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      width: 35rem;
    }

    .cancel {
      position: absolute;
      left: 6.8rem;
      top: -1.5rem;
      z-index: 50;
      width: 2.2rem;
      cursor: pointer;
    }
  }

  body.modal {
    overflow: hidden;
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    gap: 4rem;
    background: var(--white);
    border-radius: 2.4rem;
    width: 52.4rem;
    position: relative;
    @media screen and (max-width: 425px) {
      width: 38rem;
      padding: 2rem;
    }
    @media screen and (max-width: 400px) {
      width: 35rem;
      padding: 1rem;
    }
    .close-btn {
      position: absolute;
      right: 5%;
      top: 7%;
      cursor: pointer;
    }
    &-head {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.6rem;

      h3 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 2.4rem;
        text-align: center;
        color: var(--black-1);
        font-family: var(--font-family-1);
        width: 318px;
        @media screen and (max-width: 425px) {
          font-weight: 500;
          font-size: 1.6rem;
        }
      }
      p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--dark-gray-2);
        text-align: center;
        @media screen and (max-width: 425px) {
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.2rem;
        }
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2.4rem;
      gap: 2.4rem;
      background: var(--white);
      box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
      border-radius: 2.4rem;
      .ad-type {
        display: flex;
        align-items: center;
        padding: 2.4rem;
        gap: 1.2rem;
        background: var(--white);
        border: 1px solid var(--light-blue-1);
        box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
        border-radius: 1.6rem;
        width: 100%;
        cursor: pointer;
        .vertical {
          width: 1.7rem;
          border: 1px solid #b3b3b3;
          transform: rotate(90deg);
        }
        &-name {
          display: flex;
          align-items: center;
          gap: 6rem;
          width: 100%;
          &-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
            flex: 1;
            h5 {
              font-weight: 600;
              font-size: 1.6rem;
              line-height: 1.9rem;
              text-align: center;
              color: var(--light-blue-1);
              font-family: var(--font-family-1);
              @media screen and (max-width: 425px) {
                font-weight: 500;
              }
            }
            p {
              font-weight: 400;
              font-size: 1.2rem;
              line-height: 1.5rem;
              color: var(--light-blue-1);
              font-family: var(--font-family-1);
              @media screen and (max-width: 425px) {
                font-size: 1rem;
                line-height: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
`;
export const StyledDirectLink = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: column;
    // align-items: center;
    // gap: .5rem;
    .header-text {
      display: flex;
      align-items: center;
      gap: 5rem;
      h4 {
        font-weight: 600;
        font-size: 1.2rem;
        line-height: 3.6rem;
        color: #b3b3b3;
        font-family: var(--font-family-2);
        letter-spacing: -0.006em;
        &:first-child {
          color: #262626;
        }
      }
    }
    .progress-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.6rem;
      .filled {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.6rem;
        .dash {
          width: 4.267rem;
          /* background-color: #C4C4C4; */
          border-top: 2px solid #c4c4c4;
        }
        .num-border {
          border: 0.888889px solid #4f00cf;
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* padding-left: .1rem; */
          .num {
            font-weight: 600;
            font-size: 1.99111rem;
            line-height: 36px;
            letter-spacing: -0.006em;
            color: #ffffff;
            background-color: var(--primary);
            width: 2.844rem;
            height: 2.844rem;
            border-radius: 70%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .empty {
        display: flex;
        align-items: center;
        gap: 16px;
        .circle {
          width: 28.44px;
          height: 28.44px;
          border-radius: 50%;
          background: #c4c4c4;
        }
        .dash {
          width: 42.67px;
          height: 0px;
          /* background-color: #C4C4C4; */
          border-top: 2px solid #c4c4c4;
        }
      }
    }
  }

  .modal {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 10px;
    width: 742px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 38px;
    height: 677px;
    overflow-y: auto;
    @media screen and (max-width: 425px) {
      width: 100%;
      height: fit-content;
      overflow-y: hidden;
      overflow-x: hidden;
      padding: 2rem;
      border-radius: 0px;
      box-shadow: none;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      height: fit-content;
      overflow-y: hidden;
      overflow-x: hidden;
      padding-bottom: 2rem;
      width: 100%;
    }
    &-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 0px;
      gap: 4px;
      h4 {
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #000000;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.011em;
        color: #404040;
        font-family: var(--font-family-2);
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 48px;
      width: 474px;
      @media screen and (max-width: 425px) {
        width: 100%;
      }

      .product-tag {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        width: 100%;
        label {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.011em;
          color: #333333;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          .tag-btn {
            display: none;
            @media (max-width: 768px) {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 7px 17px;
              background: #4f00cf;
              border-radius: 12px;
              font-weight: 500;
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
        .tag-input {
          padding: 1.6rem;
          background-color: var(--white);
          box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
          border-radius: 9.91579px;
          width: 100%;
          height: 76px;
          display: flex;
          align-items: center;
          /* gap: 1rem; */
          input {
            width: 100%;
            background-color: transparent;
            border: none;
            padding: 16px;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.011em;
            color: #404040;
            font-family: var(--font-family-2);
            resize: none;
          }
          .tag-container {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            .tag {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1.2rem 1.6rem;
              width: 9.3rem;
              gap: 0.4rem;
              background-color: var(--black-1);
              border-radius: 1.6rem;
              h4 {
                font-weight: 600;
                font-size: 1.2rem;
                line-height: 1.8rem;
                letter-spacing: -0.011em;
                color: #ffffff;
              }
            }
          }
        }
      }
      .product-name,
      .product-description,
      .upload,
      .product-link,
      .product-content,
      .product-cta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        width: 100%;
        position: relative;
        label {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.011em;
          color: #333333;
        }
        input,
        textarea {
          background: #ffffff;
          box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
          border-radius: 9.91579px;
          border: 1px solid var(--white);
          width: 100%;
          padding: 1.6rem;
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 2rem;
          letter-spacing: -0.011em;
          color: #404040;
          font-family: var(--font-family-2);
          resize: none;
          outline: none;
        }
        .cta {
          background: #ffffff;
          box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
          border-radius: 9.91579px;
          border: 1px solid var(--white);
          width: 100%;
          padding: 1.6rem;
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 2rem;
          letter-spacing: -0.011em;
          color: #404040;
          font-family: var(--font-family-2);
          resize: none;
          outline: none;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        ul {
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          width: 31.5rem;
          li {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 1.6rem;
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
        }

        input[type='checkbox'] {
          box-shadow: none;
          width: auto;
          background-color: white;
        }

        .upload-container {
          border: 1px dashed #b3b3b3;
          border-radius: 0.9rem;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 10rem;
          .text-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
            p {
              font-weight: 400;
              font-size: 1.2rem;
              line-height: 1.8rem;
              color: var(--dark-gray-2);
              letter-spacing: -0.011em;
              span {
                color: var(--light-blue-1);
                cursor: pointer;
              }
            }
          }
        }
        .paste-input {
          display: flex;
          align-items: center;
          width: 100%;
          .link-icon {
            margin-right: -4rem;
            z-index: 10;
          }
          .input {
            width: 100%;
            input {
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
            box-shadow: 2px 6px 16px rgba(25, 55, 215, 0.25);
            p {
              font-weight: 500;
              font-size: 1.3rem;
              line-height: 2rem;
            }
          }
        }

        .checkbox {
          display: flex;
          flex-direction: row;
          // justify-content: center;
          align-items: center;
          padding: 10px;
          gap: 16px;
          width: 100%;
          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: -0.02em;
            color: var(--dark-gray);
          }
        }
      }
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 742px;
    @media screen and (max-width: 425px) {
      width: 100%;
      margin-bottom: 8rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
      margin: 0 auto;
      justify-content: center;
      gap: 5rem;
    }
    .prev {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      gap: 10px;
      background: #cccccc;
      border: 1px solid #f5f5f7;
      border-radius: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
      width: 112px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 17rem;
      }
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
    .next {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      gap: 10px;
      background: #4f00cf;
      border: 1px solid #f5f5f7;
      border-radius: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
      width: 112px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 17rem;
      }
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
  }
`;

export const StyledDirectLinkConversion = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: column;
    .header-text {
      display: flex;
      align-items: center;
      gap: 5rem;
      h4 {
        font-weight: 600;
        font-size: 1.2rem;
        line-height: 3.6rem;
        color: #b3b3b3;
        font-family: var(--font-family-2);
        letter-spacing: -0.006em;
        &:nth-child(2) {
          color: #262626;
        }
      }
    }
  }

  .modal {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 1rem;
    width: 74.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.8rem;
    height: 67.7rem;
    @media screen and (max-width: 425px) {
      width: 100%;
      height: fit-content;
      overflow-y: hidden;
      overflow-x: hidden;
      padding: 2rem;
      border-radius: 0px;
      box-shadow: none;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      height: fit-content;
      overflow-y: hidden;
      overflow-x: hidden;
      padding: 2rem;
      border-radius: 0px;
      box-shadow: none;
    }
    &-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.6rem 0rem;
      gap: 0.4rem;
      h4 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #000000;
      }
      p {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2rem;
        letter-spacing: -0.011em;
        color: #404040;
        font-family: var(--font-family-2);
      }
    }

    &-body {
      background: #ffffff;
      border-top: 6px solid var(--primary);
      box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      width: 47.9rem;
      padding-top: 8.5rem;
      /* width: 80%; */
      /* display: flex;
      align-items: center; */
      height: 46.4rem;
      /* padding: 2rem; */
      @media screen and (max-width: 425px) {
        width: 100%;
      }
      &-item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rem;

        .text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          h4 {
            font-weight: 600;
            font-size: 1.4rem;
            line-height: 2rem;
            color: var(--dark-gray);
            font-family: var(--font-family-2);
          }
          h3 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 2rem;
            letter-spacing: -0.011em;
            color: #1a1a1a;
            font-family: var(--font-family-2);
          }
        }
        .conversions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.6rem;
          width: 41.6rem;
          @media screen and (max-width: 425px) {
            width: 100%;
            padding-left: 1rem;
          }
          .head {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding: 0px;
            gap: 19rem;
            h4 {
              font-weight: 600;
              font-size: 1.4rem;
              line-height: 2rem;
              letter-spacing: -0.011em;
              color: var(--dark-gray);
            }
          }
          .conversions-body {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0px;
            gap: 2.4rem;
            // width: 172px;
            .amount-conversion,
            .visitor-conversion {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 1.6rem;
              input {
                background: #ffffff;
                box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
                border-radius: 9.91579px;
                width: 100%;
                padding: 0.8rem;
                border: 1px solid var(--white);
                padding-left: 7rem;
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              .icon {
                margin-right: -6rem;
                z-index: 1;
              }
            }
          }
        }
      }
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 742px;
    @media screen and (max-width: 425px) {
      width: 100%;
      margin-bottom: 10rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
      margin: 0 auto;
      justify-content: center;
      gap: 5rem;
    }
    .prev {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      gap: 10px;
      background: #fff;
      border: 1px solid #4f00cf;
      border-radius: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: var(--primary);
      width: 112px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 17rem;
      }
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
    .next {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      gap: 10px;
      background: #4f00cf;
      border: 1px solid #f5f5f7;
      border-radius: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
      width: 112px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 17rem;
      }
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
  }
`;

export const StyledDirectLinkPayment = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
  .header {
    display: flex;
    flex-direction: column;
    .header-text {
      display: flex;
      align-items: center;
      gap: 5rem;
      h4 {
        font-weight: 600;
        font-size: 1.2rem;
        line-height: 3.6rem;
        color: #b3b3b3;
        font-family: var(--font-family-2);
        letter-spacing: -0.006em;
        &:nth-child(3) {
          color: #262626;
        }
      }
    }
  }

  .modal {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 10px;
    width: 742px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15rem;
    @media screen and (max-width: 425px) {
      width: 100%;
      box-shadow: none;
      border-radius: 0px;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      box-shadow: none;
    }
    &-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3rem 0px;
      gap: 4px;
      h4 {
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #000000;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.011em;
        color: #404040;
        font-family: var(--font-family-2);
      }
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 48px;
      width: 474px;
      margin-top: 4rem;
      @media screen and (max-width: 425px) {
        width: 100%;
      }
      .card-name,
      .card-number {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        width: 100%;
        label {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: var(--dark-gray);
          letter-spacing: -0.011em;
          font-family: var(--font-family-2);
        }
        input {
          padding: 16px;
          background: #ffffff;
          border: 1px solid #ffffff;
          box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
          border-radius: 9.91579px;
          width: 100%;
          font-weight: 400;
          color: #404040;
          font-size: 14px;
          line-height: 20px;
          font-family: var(--font-family-2);
        }
      }
      .card-back {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0px;
        gap: 33px;
        width: 100%;
        .cvv,
        .expiry-date {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 16px;
          label {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: var(--dark-gray);
            letter-spacing: -0.011em;
            font-family: var(--font-family-2);
          }
          input {
            padding: 16px;
            background: #ffffff;
            border: 1px solid #ffffff;
            box-shadow: 1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05);
            border-radius: 9.91579px;
            width: 100%;
            font-weight: 400;
            color: #404040;
            font-size: 14px;
            line-height: 20px;
            font-family: var(--font-family-2);
            &::placeholder {
              font-weight: 600;
              font-size: 11.5684px;
              line-height: 20px;
              letter-spacing: -0.011em;
              color: #e0e0e0;
            }
          }
        }
      }
    }
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 742px;
    @media screen and (max-width: 425px) {
      width: 100%;
      margin-bottom: 10rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
      margin: 0 auto;
      justify-content: center;
      gap: 5rem;
    }
    .prev {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      gap: 10px;
      background: #fff;
      border: 1px solid #4f00cf;
      border-radius: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: var(--primary);
      width: 112px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 17rem;
      }
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
    .next {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      gap: 10px;
      background: #4f00cf;
      border: 1px solid #f5f5f7;
      border-radius: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
      width: 112px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 17rem;
      }
      @media screen and (max-width: 400px) {
        width: 15rem;
      }
    }
  }
`;

export const StyledDirectLinkSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 5rem 0;
  @media screen and (max-width: 425px) {
    padding: 0;
  }

  .back-arrow {
    position: absolute;
    left: 3%;
    top: 3%;
    cursor: pointer;
  }

  .modal {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    width: 742px;
    padding-top: 3rem;
    padding-bottom: 6rem;
    position: relative;
    @media screen and (max-width: 425px) {
      width: 100%;
      box-shadow: none;
      border-radius: 0px;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      box-shadow: none;
    }
    .head {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px;
      gap: 12px;
      h4 {
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        color: var(--black);
      }
      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.011em;
        color: #333333;
      }
    }
    .ad-banner {
      display: flex;
      flex-direction: row;
      /* justify-content: space-between; */
      align-items: center;
      padding: 24px;
      gap: 10rem;
      border: 1px solid #5c85ff;
      @media screen and (max-width: 425px) {
        gap: 2rem;
        padding: 24px 10px;
      }
      filter: drop-shadow(1.65263px 3.30526px 26.4421px rgba(0, 0, 0, 0.05));
      border-radius: 16px;
      .product-name,
      .aim,
      .price {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
        .head {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 8px;
          h3 {
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
            color: #5c85ff;
          }
        }
        p {
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          color: #5c85ff;
        }
      }
    }

    .desc {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: auto;
      width: 50rem;
      gap: 2.4rem;
      @media screen and (max-width: 425px) {
        width: 100%;
      }
      .description,
      .web-address,
      .product-img,
      .amount {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 0.8rem;
        .img-container {
          display: flex;
          width: 60.5rem;
          /* flex-wrap: wrap; */
          /* background-color: red; */
          gap: 1rem;
          @media screen and (max-width: 425px) {
            width: 100%;
          }
          img {
            width: 100%;
          }
        }
        h4 {
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          color: #0d0d0d;
        }
        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          letter-spacing: -0.011em;
          color: #404040;
        }
      }
    }
  }

  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    background: #4f00cf;
    border: 1px solid #f5f5f7;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #ffffff;
    width: 282px;
    cursor: pointer;
    @media screen and (max-width: 425px) {
      margin-bottom: 10rem;
    }
  }
`;

export const StyledDirectLinkSuccess = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
  gap: 6rem;
  @media screen and (max-width: 425px) {
    padding-top: 0;
  }
  .modal {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(103, 127, 214, 0.15);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    width: 742px;
    padding-top: 3rem;
    padding-bottom: 6rem;
    @media screen and (max-width: 425px) {
      width: 100%;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      box-shadow: none;
    }

    .head {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px;
      gap: 12px;
      h4 {
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #000000;
      }
      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.011em;
        color: #333333;
      }
    }
    .success {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px;
      gap: 48px;

      .check {
        width: 193px;
        height: 194px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #333333;
      }
    }
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    background: #4f00cf;
    border: 1px solid #f5f5f7;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #ffffff;
    width: 282px;
    cursor: pointer;
  }
`;
