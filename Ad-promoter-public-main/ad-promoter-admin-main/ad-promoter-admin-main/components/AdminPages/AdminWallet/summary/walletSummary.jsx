import { useEffect, useState } from 'react';

import Image from 'next/image';
import money from '@/public/assets/money-2.svg';
import emptyWallet from '@/public/assets/empty-wallet-change.svg';
import chevronDown from '@/public/assets/chevron-down.svg';
import {
  WalletSummaryStyles,
  MobileWalletSummaryStyles,
} from '../styles/summary';
import Card from './card';
import FilterDropdown from './filterDropdown';
import { useWidth } from '@/hooks';

const breakpoint = 1024;
const WalletSummary = ({walletSummaryData, admin}) => {
  const { responsive } = useWidth(breakpoint);

  const [openFilter, setOpenFilter] = useState(false);

  const toggleDropdown = () => {
    if (openFilter) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  };

  return (
    <>
      {responsive ? (
        <WalletSummaryStyles admin={admin}>
          {admin ? (
            <div className="intro">
              <h1>Wallet Summary</h1>

              {/* {pending && <h1>Loading...</h1>}
              {error && <h1>Something is Wrong</h1>} */}
            </div>
          ) : (
            <div className="intro">
              <h1>Wallet Summary</h1>
              <div className="intro__filter" onClick={toggleDropdown}>
                <p>Filter</p>
                <Image
                  src={chevronDown}
                  alt=""
                  className={openFilter ? 'arrow rotate' : 'arrow'}
                />
              </div>
            </div>
          )}
          <div className="cardContainer">
            <Card
              img={money}
              text={admin ? 'Total Amount Received' : 'Total Balance'}
              amount={
                walletSummaryData &&
                walletSummaryData.amountPaidIn.toLocaleString()
              }
              bg="--unknown-1"
              shadow="--shadow-2"
            />
            <Card
              img={emptyWallet}
              text={
                admin ? 'Total Amount Paid out' : 'Pending Withdrawal'
              }
              amount={
                walletSummaryData &&
                walletSummaryData.amountPaidOut.toLocaleString()
              }
              bg="--unknown-2"
              shadow="--shadow-3"
            />
            <Card
              img={money}
              text={admin ? 'Total Amount Unpaid' : 'Amount Paid'}
              amount={
                walletSummaryData &&
                walletSummaryData.amountUnpaid.toLocaleString()
              }
              bgClass="amount"
              bg="--unknown-3"
              shadow="--shadow-2"
            />
          </div>
          {openFilter ? <FilterDropdown /> : null}
        </WalletSummaryStyles>
      ) : (
        <MobileWalletSummaryStyles admin={admin}>
          {admin ? (
            <div className="intro">
              <h1>Wallet Summary</h1>

              {/* {pending && <h1>Loading...</h1>}
              {error && <h1>Something is Wrong</h1>} */}
            </div>
          ) : (
            <div className="intro">
              <h1>Wallet Summary</h1>
              <div className="intro__filter" onClick={toggleDropdown}>
                <p>Filter</p>
                <Image
                  src={chevronDown}
                  alt=""
                  className={openFilter ? 'arrow rotate' : 'arrow'}
                />
              </div>
            </div>
          )}
          <Card
            img={money}
            text={admin ? 'Total Amount Received' : 'Total Balance'}
            amount={
              walletSummaryData &&
              walletSummaryData.amountPaidIn.toLocaleString()
            }
            bg="--unknown-1"
            shadow="--shadow-2"
          />
          <div className="cardContainer">
            <Card
              img={emptyWallet}
              text={
                admin ? 'Total Amount Paid out' : 'Pending Withdrawal'
              }
              amount={
                walletSummaryData &&
                walletSummaryData.amountPaidOut.toLocaleString()
              }
              bg="--unknown-2"
              shadow="--shadow-3"
            />
            <Card
              img={money}
              text={admin ? 'Total Amount Unpaid' : 'Amount Paid'}
              amount={
                walletSummaryData &&
                walletSummaryData.amountUnpaid.toLocaleString()
              }
              bgClass="amount"
              bg="--unknown-3"
              shadow="--shadow-2"
            />
          </div>
          {openFilter ? <FilterDropdown /> : null}
        </MobileWalletSummaryStyles>
      )}{' '}
    </>
  );
};

export default WalletSummary;
