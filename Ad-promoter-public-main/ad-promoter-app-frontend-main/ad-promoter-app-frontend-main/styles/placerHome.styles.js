import styled from 'styled-components';
import { size } from './breakpoints';

export const StyledHome = styled.div`
  padding: 4rem 3.7rem 1.2rem 3.7rem;
  display: flex;
  gap: 3.18rem;
  height: 100%;

  @media screen and (max-width: ${size.tablet}) {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
  }

  @media screen and (max-width: ${size.mobileL}) {
    display: block;
    width: 428px;
    height: 100%;
    padding: 1rem;
  }
`;
export const DashboardContainer = styled.div`
  width: 88.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.6rem;

  // mobile view
  @media screen and (max-width: ${size.mobileL}) {
    display: block;
  }

  .welcome {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6rem;
    isolation: isolate;
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    padding: 2.4rem;

    .bell {
      display: none;

      @media screen and (max-width: ${size.mobileL}) {
        display: flex;
        margin-left: 100px;
      }
    }

    .box-welcome {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 2.4rem;
      gap: 6rem;
      isolation: isolate;
      // width: 100%;
      background: #ffffff;
      border-radius: 10px;

      @media screen and (max-width: ${size.mobileL}) {
        gap: 8px;
        padding: 1rem;
      }
      > .profile-img {
        height: 165px;
        width: 163px;

        @media screen and (max-width: ${size.tablet}) {
          height: 134px;
          width: 145px;
        }
      }
    }
    &-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.8rem;
      h3 {
        font-weight: 700;
        font-size: 2.4rem;
        line-height: 150%;
        letter-spacing: -0.03em;
        color: var(--black-1);

        @media screen and (max-width: ${size.mobileL}) {
          font-size: 14px;
          font-weight: 500;
        }
      }
      &-sub {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1.2rem;
        p {
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 150%;
          letter-spacing: -0.02em;
          color: var(--black-1);

          @media screen and (max-width: ${size.mobileL}) {
            font-size: 10px;
            font-weight: 400;
          }
        }
      }
    }
    .placers-frame {
      flex: 2;
      display: flex;
      justify-content: flex-end;

      @media screen and (max-width: ${size.tablet}) {
        height: 134px;
        width: 145px;
        margin-right: 30px;
      }

      @media screen and (max-width: ${size.mobileL}) {
        display: none;
      }
    }
  }
`;

export const DashboardSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.4rem 1.5rem;
  gap: 3.6rem;
  isolation: isolate;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  /* width: 885px; */
  /* height: 640px; */
  /* width: 885px; */

  @media screen and (max-width: ${size.mobileL}) {
  }

  @media screen and (max-width: ${size.mobileL}) {
    padding: 1rem;
    gap: 1rem;
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
  }
  .header-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.6rem;
    h3 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
      color: var(--black-1);
      @media screen and (max-width: ${size.mobileL}) {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }

  .dashboard-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
    /* width: 837px; */

    &-board {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: auto;
      gap: 2.4rem;
      /* width: 837px;
            height: 156px; */

      @media screen and (max-width: ${size.mobileL}) {
        padding: 0;
        margin: 0;
        gap: 2rem;
      }
      &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2.4rem 6rem;
        gap: 0.8rem;
        box-shadow: 1px 2px 4px rgba(33, 76, 95, 0.2);
        border-radius: 12px;
        width: 27rem;
        height: 15.6rem;

        @media screen and (max-width: ${size.mobileL}) {
          display: block;
          width: 126.67px;
          height: 104px;
          padding: 1rem;
          gap: 0.3rem;
        }

        &-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
          &-icon {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
            width: 18rem;

            @media screen and (max-width: ${size.mobileL}) {
              display: block;
              text-align: center;
              padding-top: 0.5rem;
            }
            h3 {
              font-weight: 500;
              font-size: 1.4rem;
              line-height: 2.1rem;
              color: var(--black);

              @media screen and (max-width: ${size.mobileL}) {
                font-size: 14px;
                line-height: 1rem;
                padding-top: 0.5rem;
              }
            }
          }
          h2 {
            font-weight: 700;
            font-size: 2.4rem;
            line-height: 3.6rem;
            color: var(--black-1);

            @media screen and (max-width: ${size.mobileL}) {
              font-size: 1rem;
              font-weight: 600;
              line-height: 1rem;
            }
          }
        }
      }
    }
    &-activity {
      width: 100%;
      height: 324px;
      background: #f5f5f7;
      border-radius: 10px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;

      @media screen and (max-width: ${size.mobileL}) {
        width: 428px;
        height: 236px;
        background: #f5f5f7;
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      &-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3 {
          font-weight: 600;
          font-size: 24px;
          line-height: 36px;
          color: #141522;

          @media screen and (max-width: ${size.mobileL}) {
            font-size: 12px;
          }
        }
        .time-filter {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 17px;
          .time-week {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 4px 16px;
            gap: 8px;
            background: #ffffff;
            border-radius: 4px;

            h4 {
              font-weight: 500;
              font-size: 14px;
              line-height: 21px;
              letter-spacing: -0.02em;
              color: #141522;
            }
          }
          .month-filter {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0px;
            gap: 4px;
            max-height: 100%;
            h4 {
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              color: #2e3a59;

              @media screen and (max-width: ${size.mobileL}) {
                font-size: 10px;
              }
            }
          }
        }
      }
      &-chart {
        width: 797px;
        height: 230px;
        background: #ffffff;
        border-radius: 10px;

        @media screen and (max-width: ${size.mobileL}) {
          width: 390px;
          height: 170px;
        }
      }
    }
  }
`;

export const RecentAdsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  width: 41.1rem;

  .header {
    display: flex;
    align-items: flex-start;
    /* gap: 21rem; */
    justify-content: space-between;
    width: 100%;
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      h4 {
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: var(--black-1);
        /* background-color: red; */
      }
      .bottom-dash {
        width: 6rem;
        height: 0.3rem;
        background-color: var(--primary);
        border-radius: 10rem;
      }
    }
    .sort {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0.8rem 1.2rem;
      gap: 0.8rem;
      background: #ffffff;
      border-radius: 0.4rem;
      cursor: pointer;
      h4 {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #000000;
      }
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 24px;
      gap: 16px;
      background: #ffffff;
      border-radius: 10px;
      width: 100%;
      .head {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 22px;
        .tag-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 8px;
          .ad-tag {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4px 16px;
            gap: 8px;
            background: #0594fb;
            border: 1px solid #dbd8fc;
            border-radius: 100px;
            font-weight: 400;
            font-size: 14px;
            line-height: 21px;
            text-align: center;
            color: #ffffff;
          }
          .business-tag {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 2px;
            h4 {
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
              color: #2c2828;
            }
            &-container {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 8px;

              p {
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;
                color: #2c2828;
              }
              .tag {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                padding: 0px;
                gap: 4px;
                .tag-1,
                .tag-2 {
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  padding: 8px 16px;
                  gap: 10px;
                  background: #f2f2f2;
                  border-radius: 100px;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 18px;
                  color: #2c2828;
                }
              }
            }
          }
        }
        .details {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          color: #333333;
        }
      }

      .conversion-body {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 40px 0px;
        gap: 60px;
        .aim,
        .conversion,
        .price {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 4px;
          .head {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0px;
            gap: 8px;
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
            color: #333333;
          }
        }
      }
      .time-stamp {
        font-weight: 400;
        font-size: 10px;
        line-height: 15px;
        color: #333333;
      }
    }
  }
`;

export const MobilePlacers = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 8rem;
  display: none;
  max-width: 425px;
  width: 100%;
  @media screen and (max-width: 425px) {
    display: block;
  }
  .welcome {
    background-color: white;
    padding: 2.4rem 1.4rem;
    border-radius: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 400px) {
      width: 100%;
    }
  }
  .userProfile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .username {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      font-weight: 600;
      font-size: 1.7rem;
      line-height: 2.2rem;
    }
  }
  .wave {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-size: 1.3rem;
      line-height: 1.8rem;
      letter-spacing: -0.078px;
    }
  }
  .promo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dashboard-container {
    display: flex;
    flex-direction: column;
    h2 {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.2rem;
      letter-spacing: -0.408px;
      color: #0d0d0d;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .dashboard {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }
    .info {
      /* padding-top: 2.4rem;
      padding-bottom: 2.4rem;
      padding-left: 1rem; */
      padding: 2.4rem 0;
      border-radius: 1.2rem;
      max-width: 11.8rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .amount {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      h3 {
        font-size: 1.4rem;
        line-height: 2rem;
        letter-spacing: 0.38px;
        color: #333333;
        text-align: center;
      }
    }
  }
  .activity {
    background: #f5f5f7;
    border-radius: 10px;
    padding: 1rem 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    h3 {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 2.2rem;
      color: #141522;
    }
  }
  .time-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    .time-week {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 4px;
      gap: 8px;
      background: #ffffff;
      border-radius: 4px;

      select {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: -0.02em;
        color: #141522;
      }
    }
    .month-filter {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px;
      /* gap: 4px; */
      h4 {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #2e3a59;
      }
    }
  }
  .chart {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 10px;
  }

  .sort {
    background-color: white;
    padding: 1rem 2rem 1rem 1.5rem;
    border-radius: 1.6px;
    display: flex;
    margin-top: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: -webkit-sticky;
    position: sticky;
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
    border: 1.5px solid #d3b8ff;
    padding: 0 2.4rem;
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
    right: 0;
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
`;
export const TabPlacers = styled.div`
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: none;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
  .welcome {
    background-color: white;
    padding: 2.4rem;
    border-radius: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userProfile {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  .username {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 150%;
      letter-spacing: -0.03em;
      color: #0d0d0d;
    }
  }
  .wave {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 150%;
      letter-spacing: -0.03em;
      color: #0d0d0d;
    }
  }
  .dashboard-summary {
    background-color: white;
    margin-top: 1rem;
    padding: 2rem;
    h3 {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 3.6rem;
    }
  }
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  .info {
    padding-top: 2.4rem;
    padding-bottom: 2.4rem;
    border-radius: 1.2rem;
  }
  .amount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    h3 {
      font-size: 1.4rem;
      line-height: 2rem;
      letter-spacing: 0.38px;
      color: #333333;
      align-items: center;
    }
  }
  .activity {
    width: 100%;
    height: 324px;
    background: #f5f5f7;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: #141522;
    }
  }
  .time-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 17px;
    .time-week {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 16px;
      gap: 8px;
      background: #ffffff;
      border-radius: 4px;

      h4 {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: -0.02em;
        color: #141522;
      }
    }
    .month-filter {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px;
      gap: 4px;
      h4 {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #2e3a59;
      }
    }
  }
  .chart {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 10px;
  }
  .sort {
    background-color: white;
    padding: 1rem 2rem 1rem 1.5rem;
    border-radius: 1.6px;
    display: flex;
    margin-top: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: -webkit-sticky;
    position: sticky;
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
    border: 1.5px solid #d3b8ff;
    padding: 0 2.4rem;
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
    right: 0;
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
`;
