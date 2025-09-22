import { useState } from 'react';

import Image from 'next/image';
import money from '@/public/assets/money-2.svg';
import emptyWallet from '@/public/assets/empty-wallet-change.svg';
import chevronDown from '@/public/assets/chevron-down.svg';
import { WalletSummaryStyles } from '../styles/summary';
import Card from './card';
import FilterDropdown from './filterDropdown';
import { formatCurrencyWithoutStyle,formatCurrency } from '@/utils/formatCurrency';
const WalletSummary = (props) => {

  const toggleDropdown = () => {
    if (props.openFilter) {
      props.setOpenFilter(false);
    } else {
      props.setOpenFilter(true);
    }
  };

  return (
    <WalletSummaryStyles admin={props.admin}>
      {props.admin ? (
        <div className="intro">
          <h1>Wallet Summary</h1>
        </div>
      ) : (
        <div className="intro">
          <h1>Wallet Summary</h1>
          <div className="intro__filter" onClick={toggleDropdown}>
            <p>{props.clickedFilter}</p>
            <Image
              src={chevronDown}
              alt=""
              className={props.openFilter ? 'arrow rotate' : 'arrow'}
            />
          </div>
        </div>
      )}
      <div className="cardContainer">
        <Card
          img={money}
          text={props.admin ? "Total Amount Received" : "Total Balance"}
          amount={formatCurrency(props.totalBalance)}
          bg="--unknown-1"
          isLoading={props.isDashboardLoading}
          shadow="--shadow-2"
        />
        <Card
          img={emptyWallet}
          text={props.admin ? "Total Amount Paid out" : "Pending Withdrawal"}
          amount={formatCurrency(props.pendingWithdrawals)}
          isLoading={props.isDashboardLoading}
          bg="--unknown-2"
          shadow="--shadow-3"
        />
        <Card
          img={money}
          text={props.admin ? "Total Amount Unpaid" : "Amount Paid"}
          amount={formatCurrency(props.amountPaid)}
          isLoading={props.isDashboardLoading}
          bgClass="amount"
          bg="--unknown-3"
          shadow="--shadow-2"
        />
      </div>
      {props.openFilter ? <FilterDropdown handleFilterSelect={props.handleFilterSelect}/> : null}
    </WalletSummaryStyles>
  );
};

export default WalletSummary;
