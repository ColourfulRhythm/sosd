import { useState } from 'react';
import Image from 'next/image';
import plus from '@/public/assets/plus.svg';
import gtb from '@/public/assets/gtb.svg';
import fcmb from '@/public/assets/fcmb.svg';
import emptyWallet from '@/public/assets/empty-wallet-add.svg';
import { WalletStyles, WalletStylesMobile } from '../styles/wallet';
import Card from '../summary/card';
import money from '@/public/assets/money-2.svg';
import { AdminWalletStyles } from '@/components/AdminPages/AdminWallet/styles/wallet';
import { useWidth } from '@/hooks';

const breakpoint = 1024;

const Wallet = ({
  admin,
  walletSummaryData,
  onOpenPaymentDetailsModal,
  onOpenWithdrawProcess,
}) => {
  const { responsive } = useWidth(breakpoint);

  const [showDropdown, setShowDropdown] = useState(false);
  const [firstBank, setFirstBank] = useState(false);
  const [secondBank, setSecondBank] = useState(false);

  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const toggleFirstBank = () => {
    if (firstBank) {
      setFirstBank(false);
    }
    return;
  };

  const toggleSecondBank = () => {
    if (secondBank) {
      setSecondBank(false);
    }
    return;
  };

  const selectFirstBank = () => {
    setFirstBank(true);
    toggleSecondBank();
  };

  const selectSecondBank = () => {
    setSecondBank(true);
    toggleFirstBank();
  };

  return (
    <>
      {responsive ? (
        <WalletStyles>
          <div className="intro">
            <h1>Wallet</h1>
            <button className="intro__add" onClick={onOpenPaymentDetailsModal}>
              <Image src={plus} alt="Add banck account icon" />
            </button>
          </div>

          {admin ? (
            <AdminWalletStyles>
              <Card
                img={money}
                text="Total Amount Made (20%)"
                amount={
                  walletSummaryData &&
                  ((walletSummaryData.amountPaidIn * 20) / 100).toLocaleString()
                }
                bg="--unknown-2"
                shadow="--shadow-3"
              />
            </AdminWalletStyles>
          ) : null}

          <div>
            <div
              className={
                firstBank ? 'container bank1 clicked' : 'container bank1'
              }
              onClick={selectFirstBank}
            >
              <div className="container__acctdetails">
                <Image src={gtb} alt="Guarantee trust bank logo" />
                <div>
                  <p className="acctNum">02347685075</p>
                  <p className="acctName">Skylar Diaz</p>
                </div>
              </div>
              <div className="container__select">
                {firstBank ? (
                  <input type="checkbox" id="bank-2" name="" checked />
                ) : (
                  <input type="checkbox" id="bank-2" name="" />
                )}
                <span className="checkmark"></span>
              </div>
            </div>

            <div
              className={
                secondBank ? 'container bank1 clicked' : 'container bank1'
              }
              onClick={selectSecondBank}
            >
              <div className="container__acctdetails">
                <Image src={fcmb} alt="FCMB logo" />
                <div>
                  <p className="acctNum">42456530765</p>
                  <p className="acctName">Mitchelle Diaz</p>
                </div>
              </div>
              <div className="container__select">
                {secondBank ? (
                  <input type="checkbox" id="bank-2" name="" checked />
                ) : (
                  <input type="checkbox" id="bank-2" name="" />
                )}
                <span className="checkmark"></span>
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <button onClick={onOpenWithdrawProcess}>
              <Image src={emptyWallet} alt="Wallet Icon" className="img" />
              <span className="process-withdraw">Process Withdrawal</span>
            </button>
          </div>
        </WalletStyles>
      ) : (
        <WalletStylesMobile>
          <div className="intro">
            <h1>Wallet</h1>
            <button className="intro__add" onClick={onOpenPaymentDetailsModal}>
              <Image src={plus} alt="Add banck account icon" />
            </button>
          </div>

          {admin ? (
            <div>
              <Card
                img={money}
                text="Total Amount Made (20%)"
                amount=
                {
                  walletSummaryData &&
                  ((walletSummaryData.amountPaidIn * 20) / 100).toLocaleString()
                }
                bg="--unknown-2"
                shadow="--shadow-3"
              />
            </div>
          ) : null}

          <div className="bank-types">
            <div
              className={
                firstBank ? 'container bank1 clicked' : 'container bank1'
              }
              onClick={selectFirstBank}
            >
              <div className="container__acctdetails">
                <Image src={gtb} alt="Guarantee trust bank logo" />
                <div>
                  <p className="acctNum">02347685075</p>
                  <p className="acctName">Skylar Diaz</p>
                </div>
              </div>
              <div className="container__select">
                {firstBank ? (
                  <input type="checkbox" id="bank-2" name="" checked />
                ) : (
                  <input type="checkbox" id="bank-2" name="" />
                )}
                <span className="checkmark"></span>
              </div>
            </div>

            <div
              className={
                secondBank ? 'container bank1 clicked' : 'container bank1'
              }
              onClick={selectSecondBank}
            >
              <div className="container__acctdetails">
                <Image src={fcmb} alt="FCMB logo" />
                <div>
                  <p className="acctNum">42456530765</p>
                  <p className="acctName">Mitchelle Diaz</p>
                </div>
              </div>
              <div className="container__select">
                {secondBank ? (
                  <input type="checkbox" id="bank-2" name="" checked />
                ) : (
                  <input type="checkbox" id="bank-2" name="" />
                )}
                <span className="checkmark"></span>
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <button onClick={onOpenWithdrawProcess}>
              <Image src={emptyWallet} alt="Wallet Icon" className="img" />
              <p>Process Withdrawal </p>
            </button>
          </div>
        </WalletStylesMobile>
      )}{' '}
    </>
  );
};

export default Wallet;
