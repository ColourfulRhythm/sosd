import styled from 'styled-components';

export const Desktop = styled.div`
  display: block;
  @media screen and (max-width: 425px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;
export const Filterstyled = styled.div`
  background-color: var(--white);
  width: 100%;
  /* position: sticky; */

  .searchFilter {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 1.2rem;
    font-size: 1.6rem;

    .search {
      position: relative;
      display: block;

      span {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        padding-left: 1.2rem;
      }
      input {
        padding: 1.2rem;
        border-radius: 0.8rem;
        padding-left: 6rem;
        border-width: 0.1rem;
        border-color: var(--light-primary);
        width: 55.4rem;
      }
    }
    .select {
      width: 28.1rem;
      padding: 1.2rem 2rem;
      border: 0.1rem solid var(--light-primary);
      border-radius: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      ul {
        background-color: var(--white);
        position: absolute;
        top: 7.5rem;
        right: 0rem;
        border-radius: 0.8rem;
        box-shadow: var(--shadow-1);
        width: 25rem;
        z-index: 100;

        li {
          padding: 1.2rem 2.4rem;
          border-bottom: 0.1rem solid #d9d9d9;
          cursor: pointer;
          /* z-index: 100; */
        }
      }
    }
  }
`;
export const Container = styled.div`
  max-width: 123rem;
  margin: 0 auto;
  margin-top: 3rem;

  .jobs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
  }
  .col1 {
    grid-column: span 2 / span 2;
  }
`;
export const Feed = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 3rem;
  background-color: var(--white);
  border-radius: 1.2rem;

  .type {
    padding: 2rem;

    .recAd {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .recDirect {
        background-color: ${(props) => props.bg};
        color: white;
        padding: 0.4rem 1.6rem;
        border-radius: 2rem;
        font-weight: lighter;
        font-size: 1.4rem;
      }
      .recDot {
        cursor: pointer;
        position: relative;
        font-size: 1.4rem;

        ul {
          border-radius: 0.8rem;
          box-shadow: var(--shadow-1);
          background-color: var(--white);
          position: absolute;
          top: 0;
          right: 0;
          width: 22rem;

          li {
            padding: 1.2rem 2.4rem;
            border-bottom: 0.1rem solid #d9d9d9;
            cursor: pointer;
          }
        }
      }
    }
    .more {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .direct {
        background-color: ${(props) => props.bg};
        color: white;
        padding: 0.4rem 1.6rem;
        border-radius: 2rem;
        font-weight: lighter;
        font-size: 1.4rem;
      }
      .dot {
        cursor: pointer;
        position: relative;
        font-size: 1.4rem;

        ul {
          border-radius: 0.9rem;
          box-shadow: var(--shadow-1);
          background-color: var(--white);
          position: absolute;
          top: 0;
          right: 0;
          width: 20rem;
          li {
            padding: 1.2rem 2.4rem;
            border-bottom: 1px solid #dbd8fc;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
            color: var(--black-1);
            /* padding: 0px 24px; */
          }
        }
      }
    }

    .adlink {
      margin-top: 3rem;
      margin-bottom: 2.4rem;
      .profile {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        /* margin-top: 1rem; */

        .tag {
          padding: 0.8rem 1.6rem;
          background-color: var(--light-gray);
          border-radius: 3rem;
        }
      }
    }

    .reclink {
      margin-top: 3rem;

      .stack {
        display: flex;
        flex-direction: column;

        .recProfile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;

          .recTag {
            padding: 0.8rem 1.6rem;
            background-color: var(--light-gray);
            border-radius: 3rem;
          }
        }
      }
    }

    .recDesc {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 5rem;
      font-size: 1.5rem;

      .recAim {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-weight: bold;
        font-size: 1.6rem;
      }
      .recPara {
        color: var(--light-gray-1);
        font-size: 1.4rem;
      }
    }
    .desc {
      display: flex;
      align-items: center;
      gap: 10rem;
      margin-top: 5rem;

      .aim {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: bold;
        font-size: 1.6rem;
      }
      .para {
        color: var(--light-gray-1);
        font-size: 1.4rem;
      }
    }
    .recProduct {
      margin-top: 3rem;
      font-size: 1.6rem;
      P {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--dark-gray);
        span {
          font-weight: bold;
        }
      }
    }

    .product {
      p {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--dark-gray);
        span {
          font-weight: bold;
        }
      }
    }

    .time {
      display: flex;
      justify-content: space-between;
      margin-top: 5rem;
      align-items: center;

      .user {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        div {
          font-weight: bold;
          font-size: 1.4rem;
        }
      }

      p {
        font-size: 1.2rem;
        color: var(--light-gray-1);
      }
      .post {
        display: flex;
        align-items: center;
        gap: 2rem;

        .icons {
          cursor: pointer;
        }
      }
    }
    .recTime {
      display: flex;
      justify-content: space-between;
      margin-top: 5rem;
      align-items: center;

      .recUser {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        div {
          font-weight: bold;
          font-size: 1.4rem;
        }
      }

      p {
        font-size: 1.2rem;
        color: var(--light-gray-1);
      }
      .recPost {
        display: flex;
        align-items: center;
        gap: 2rem;

        .recIcons {
          cursor: pointer;
        }
      }
    }
    .recSubmit {
      display: flex;
      justify-content: center;
      margin-top: 3rem;

      .recPaste {
        position: relative;

        .recPasteLink {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          padding-left: 1.2rem;
        }

        .recPasteButton {
          position: absolute;
          top: 0.5rem;
          right: 0.8rem;
          background-color: var(--light-blue);
          padding: 0.8rem 1.2rem;
          color: var(--white);
          border-radius: 0.8rem;
        }
        input {
          padding: 1.5rem 7rem;
          border: none;
          border-radius: 0.8rem;
          width: 100%;
          background-color: var(--light-gray-3);
        }
      }

      button {
        padding: 0.8rem 3rem;
        background-color: var(--primary);
        color: white;
        border-radius: 0.8rem;
        font-size: 1.6rem;
        cursor: pointer;
      }
    }

    .adImage {
      margin-top: 5rem;
    }

    .submit {
      display: flex;
      justify-content: center;
      margin-top: 3rem;

      .paste {
        position: relative;

        .pasteLink {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          padding-left: 0.8rem;
        }

        .pasteButton {
          position: absolute;
          top: 0.7rem;
          right: 0.6rem;
          background-color: var(--light-blue);
          padding: 1rem;
          color: var(--white);
          border-radius: 1rem;
          max-width: 8.1rem;
          width: 100%;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
        }
        input {
          padding-left: 6rem;
          padding-right: 10rem;
          border-radius: 0.8rem;
          background: var(--light-gray-3);
          border: 2px solid #ffffff;
          width: 47.376rem;
          /* width: 100%; */
          height: 5.6rem;
          /* height: 100%; */
        }
      }

      button {
        padding: 0.8rem 3rem;
        background-color: var(--primary);
        color: white;
        border-radius: 0.8rem;
        cursor: pointer;
      }
    }
  }
`;

export const DiscoveryContainer = styled.div`
  .scroll-container {
    height: 100vh;
    /* overflow-y: scroll; */
    cursor: grab;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    /* @media screen and (min-width: 425px) {
      height: auto;
    } */
  }
`;

export const MobileDiscovery = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 10rem;
  display: none;
  @media screen and (max-width: 425px) {
    display: block;
  }

  .back-disc {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    h3 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.38px;
    }
  }

  .search-filter {
    position: relative;
    display: block;

    .search-icon {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding-left: 1.2rem;
    }

    input {
      padding: 1.2rem;
      padding-left: 5rem;
      border-radius: 0.8rem;
      border: 1px solid #dbd8fc;
      width: 39rem;
      font-size: 1.2rem;
      line-height: 1.6rem;
    }

    .filter {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      @media screen and (max-width: 378px) {
        right: 0rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.3rem;
        letter-spacing: 0.07px;
      }
    }
  }
  .feed-tab {
    margin-top: 1.5rem;
    margin-bottom: 5rem;
    /* position: -webkit-sticky;
    position: sticky;
    top: 0; */
    a {
      padding: 1rem;
      border-radius: 3.2rem;
      background-color: #f7f2ff;
      border: 1px solid #4f00cf;
      font-size: 1.1rem;
      font-weight: 1.3rem;
      letter-spacing: 0.66px;
      color: #0d0d0d;
    }
  }

  .tab-para {
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 1.7rem;
    line-height: 2.2rem;
    letter-spacing: -0.408px;
    /* position: -webkit-sticky;
    position: sticky;
    top: 0; */
  }

  ul {
    background-color: var(--white);
    position: absolute;
    top: 14rem;
    right: 2rem;
    border-radius: 1.2rem;
    box-shadow: var(--shadow-1);
    width: 18.2rem;
    z-index: 100;
    @media screen and (max-width: 376px) {
      right: 0;
    }

    li {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      padding-left: 2.4rem;
      border-bottom: 0.1rem solid #d9d9d9;
      cursor: pointer;
      font-size: 1.4rem;
      line-height: 2.1rem;
      font-weight: 600;
    }
  }
`;
export const TabDiscovery = styled.div`
  display: none;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
  .style-filter {
    background-color: var(--white);
    width: 100%;
    .searchFilter {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      padding-top: 2rem;
      padding-bottom: 2rem;
      gap: 1.2rem;
      font-size: 1.6rem;

      .search {
        position: relative;
        display: block;

        span {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          padding-left: 1.2rem;
        }
        input {
          padding: 1.2rem;
          border-radius: 0.8rem;
          padding-left: 6rem;
          border-width: 0.1rem;
          border-color: var(--light-primary);
          width: 46.5rem;
        }
      }
      .select {
        width: 28.1rem;
        padding: 1.2rem 2rem;
        border: 0.1rem solid var(--light-primary);
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        ul {
          background-color: var(--white);
          position: absolute;
          top: 7.5rem;
          right: 0rem;
          border-radius: 0.8rem;
          box-shadow: var(--shadow-1);
          width: 25rem;
          z-index: 100;

          li {
            padding: 1.2rem 2.4rem;
            border-bottom: 0.1rem solid #d9d9d9;
            cursor: pointer;
            /* z-index: 100; */
          }
        }
      }
    }
  }
  .sort {
    background-color: white;
    padding: 3rem 5rem 1rem 5rem;
    border-radius: 1.6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    top: 0;
    position: relative;
  }
  .tabs {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }
  .active-job {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 4.8rem;
    color: white;
    background: #4f00cf;
    border-radius: 32px;
    padding: 0 2.4rem;
  }
  .non-active {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 4.8rem;
    padding: 0 2.4rem;
    border: 1.5px solid #d3b8ff;
    border-radius: 32px;
    color: #333333;
  }
  .arrow-sort {
    display: flex;
    align-items: center;
    gap: 1.3rem;
    p {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2.1rem;
    }
  }
  .list {
    background-color: var(--white);
    position: absolute;
    top: 8rem;
    right: 3rem;
    border-radius: 1.2rem;
    box-shadow: var(--shadow-1);
    width: 18.2rem;
    z-index: 100;

    li {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      padding-left: 2.4rem;
      border-bottom: 0.1rem solid #d9d9d9;
      cursor: pointer;
      font-size: 1.4rem;
      line-height: 2.1rem;
      font-weight: 600;
    }
  }
  .show-recent {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
