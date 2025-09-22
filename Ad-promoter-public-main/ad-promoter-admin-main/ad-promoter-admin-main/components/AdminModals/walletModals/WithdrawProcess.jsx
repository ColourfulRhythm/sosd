import { useState, useRef } from 'react';

import ModalContainer from '../ModalContainer';
import close from '@/public/assets/close-circle.svg';
import Image from 'next/image';
import gtb from '@/public/assets/gtb.svg';
import fcmb from '@/public/assets/fcmb.svg';
import Button from '@/components/AdminReusables/AdminButton/Button';
import { WithdrawProcessStyles, WithdrawProcessStylesMobile } from './styles';
import { useWidth } from '@/hooks';

const breakpoint = 1024;
const ProcessWithdrawModal = (props) => {
  const [amount, setAmount] = useState('');
  const [firstBank, setFirstBank] = useState(false);
  const [secondBank, setSecondBank] = useState(false);
  const inputRef = useRef();

  const { onOpenWithdrawDetails, onCloseWithdrawProcess } = props;
  const { showWithdrawDetailsModal } = props.show;

  console.log(showWithdrawDetailsModal);

  const handleChange = (props) => {
    setAmount(inputRef.current.value);
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
    <ModalContainer>
      <WithdrawProcessStyles>
      <div>
        <div className="close">
          
          <button onClick={onCloseWithdrawProcess}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <form>
          <h2>Process Withdrawal</h2>
          <div className="acct">
            <div
              className={
                firstBank
                  ? 'acct__container acct__bank1 acct__clicked'
                  : 'acct__container acct__bank1'
              }
              onClick={selectFirstBank}
            >
              <div className="acctDetails">
                <Image src={gtb} alt="Guarantee trust bank logo" />
                <div>
                  <p className="acctNum">02347685075</p>
                  <p className="acctName">Skylar Diaz</p>
                </div>
              </div>
              <div div className="select">
                {firstBank ? (
                  <input type="checkbox" id="bank-1" checked />
                ) : (
                  <input type="checkbox" id="bank-1" />
                )}

                <span className="checkmark"></span>
              </div>
            </div>

            <div
              className={
                secondBank ? 'acct__container acct__clicked' : 'acct__container'
              }
              onClick={selectSecondBank}
            >
              <div className="acctDetails">
                <Image src={fcmb} alt="FCMB logo" />
                <div>
                  <p className="acctNum">42456530765</p>
                  <p className="acctName">Mitchelle Diaz</p>
                </div>
              </div>
              <div className="select">
                {secondBank ? (
                  <input type="checkbox" id="bank-2" name="" checked />
                ) : (
                  <input type="checkbox" id="bank-2" name="" />
                )}
                <span className="checkmark"></span>
              </div>
            </div>
          </div>
          <div className="amountInput">
            <div className="input-container">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                ref={inputRef}
                onChange={handleChange}
              />
              <div className="balance-container">
                <span className="balance"> BALANCE: <span className="balance-amount">₦200,000.35</span></span>
                
              </div>
            </div>
          </div>
        </form>
        <Button
          text="Withdraw"
          onOpen={onOpenWithdrawDetails}
          onClose={onCloseWithdrawProcess}
        />
        </div>
      </WithdrawProcessStyles>
    </ModalContainer>
  );
};

export default ProcessWithdrawModal;
