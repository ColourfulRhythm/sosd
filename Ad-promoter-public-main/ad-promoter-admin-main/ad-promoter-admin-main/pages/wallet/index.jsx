import React, { useEffect, useState } from 'react';

import {
  AdminWalletStyles,
  AdminWalletContainer,
  MobileWallet,
  MobileWalletStyles,
} from '@/components/AdminPages/AdminWallet/styles/wallet';
import WalletSummary from '@/components/AdminPages/AdminWallet/summary/walletSummary';
import TransactionHistory from '@/components/AdminPages/AdminWallet/transaction/transactionHistory';
import Wallet from '@/components/AdminPages/AdminWallet/wallet/wallet';
import ProcessWithdrawModal from '@/components/AdminModals/walletModals/WithdrawProcess';
import WithdrawDetailsModal from '@/components/AdminModals/walletModals/WithdrawDetails';
import WithdrawFundsModal from '@/components/AdminModals/walletModals/WithdrawFundsModal';
import PaymentDetailsModal from '@/components/AdminModals/walletModals/PaymentDetailsModal';
import VerificationModal from '@/components/AdminModals/walletModals/VerificationModal';
import SuccessModal from '@/components/AdminModals/walletModals/SuccessModal';
import UseFetch from '@/hooks/useFetch';
import { useWidth } from '@/hooks';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx/index.jsx';
import Head from 'next/head';

const breakpoint = 1024;
const AdminWallet = () => {
  const { responsive } = useWidth(breakpoint);
  const [showWithdrawProcessModal, setShowWithdrawProcessModal] =
    useState(false);
  const [showWithdrawDetailsModal, setShowWithdrawDetailsModal] =
    useState(false);
  const [showWithdrawFundsModal, setShowWithdrawFundsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [token, setToken] = useState(true);
  const [tokenAvailale, setTokenAvailable] = useState(false);
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
      console.log(userToken.token);
    }
  }, []);

  const {
    data: transactionData,
    pending,
    error,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/wallet/all/transactions/'
  );

  const {
    data: walletSummaryData,
    pending2,
    error2,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/wallet/wallet-summary'
  );

  if (pending || pending2) {
    return <PageLoader />;
  }

  if (error || error2) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
          textAlign: 'center',

        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  if (!transactionData && !walletSummaryData) {
    return <PageLoader />;
  }

  return (
    <>
      {responsive ? (
        <AdminWalletContainer admin={true}>
          <AdminWalletStyles>
            <div className="container">
              <WalletSummary
                admin={true}
                walletSummaryData={walletSummaryData}
              />
              <TransactionHistory
                transactionData={transactionData ? transactionData.data : ''}
                pending={pending}
                error={error}
              />
            </div>
            <Wallet
              walletSummaryData={walletSummaryData}
              admin={true}
              onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}
              onOpenPaymentDetailsModal={() => setShowPaymentDetailsModal(true)}
            />
          </AdminWalletStyles>
        </AdminWalletContainer>
      ) : (
        <MobileWallet admin={true}>
          <div className="container">
            <WalletSummary admin={true} walletSummaryData={walletSummaryData} />
            <Wallet
              walletSummaryData={walletSummaryData}
              admin={true}
              onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}
              onOpenPaymentDetailsModal={() => setShowPaymentDetailsModal(true)}
            />
            <TransactionHistory
              transactionData={transactionData ? transactionData.data : ''}
              pending={pending}
              error={error}
            />
          </div>
        </MobileWallet>
      )}
      {showWithdrawProcessModal ? (
        <ProcessWithdrawModal
          onCloseWithdrawProcess={() => setShowWithdrawProcessModal(false)}
          onOpenWithdrawDetails={() => setShowWithdrawDetailsModal(true)}
          show={{ showWithdrawProcessModal, showWithdrawDetailsModal }}
        />
      ) : null}
      {showWithdrawDetailsModal ? (
        <WithdrawDetailsModal
          onCloseModal={() => setShowWithdrawDetailsModal(false)}
          onOpenModal={() => setShowWithdrawProcessModal(true)}
          onOpenWithdrawModal={() => setShowWithdrawFundsModal(true)}
        />
      ) : null}
      {showWithdrawFundsModal ? (
        <WithdrawFundsModal onClose={() => setShowWithdrawFundsModal(false)} />
      ) : null}
      {showPaymentDetailsModal ? (
        <PaymentDetailsModal
          onOpen={() => setShowVerificationModal(true)}
          onClose={() => setShowPaymentDetailsModal(false)}
        />
      ) : null}
      {showVerificationModal ? (
        <VerificationModal
          onOpen={() => setShowSuccessModal(true)}
          onClose={() => setShowVerificationModal(false)}
        />
      ) : null}
      {showSuccessModal ? (
        <SuccessModal onClose={() => setShowSuccessModal(false)} admin={true} />
      ) : null}
    </>
  );
};

export default AdminWallet;
