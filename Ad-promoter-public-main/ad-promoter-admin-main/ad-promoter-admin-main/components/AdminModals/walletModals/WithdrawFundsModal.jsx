import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ModalContainer from '../ModalContainer';
import { WithdrawalFundsStyles } from './styles';
import close from '@/public/assets/close-circle.svg';
import SuccessMark from '@/public/assets/success-mark.gif';

const WithdrawFundsModal = (props) => {
  const [withdrawConfirmed, setWithdrawConfirmed] = useState(false);

  return (
    <ModalContainer>
      {withdrawConfirmed ? (
        <WithdrawalFundsStyles>
          <div>
          <div className="close">
            <button onClick={props.onClose}>
              <Image src={close} alt="Exit icon" />
            </button>
          </div>
          <div className="funds">
            <div className="funds__header">
              <h2>Withdraw Funds</h2>
              <p>Please review your withdrawal details</p>
            </div>
            <p className="funds__message">
              Withdrawal was Sucessful. Check your mail for transaction
              verification.
            </p>
            <div className="funds__withdrawal">
              <hr />
              <div className="summary">
                <ul>
                  <li>Withdraw to</li>
                  <li>Amount</li>
                  <li>Description</li>
                </ul>
                <ul>
                  <li className="flex">
                    <Image
                      src="/assets/gtb.png"
                      alt="Guaranty Trust Bank"
                      width="16px"
                      height="16px"
                    />
                    <div className="bold">Guaranty Trust Bank</div>
                  </li>
                  <li className="bold">&#8358;2,000.35</li>
                  <li className="bold">AD-Promoter</li>
                </ul>
              </div>
              <hr />
              <div className="funds__amount">
                <ul>
                  <li>Fee</li>
                  <li>Total Amount</li>
                </ul>
                <ul>
                  <li className="bold">&#8358;100.00</li>
                  <li className="bold">&#8358;2,100.35</li>
                </ul>
              </div>
            </div>
            <div className="funds__home">
              <button onClick={props.onClose}>
                <a>Cancel</a>
              </button>
            </div>
          </div>
          </div>
        </WithdrawalFundsStyles>
      ) : (
        <WithdrawalFundsStyles>
          <div>
          <div className="close">
            <button onClick={props.onClose}>
              <Image src={close} alt="Exit icon" />
            </button>
          </div>
          <div className="loading">
            <Image src={SuccessMark} alt="success" />
          </div>
          <div className="funds">
            <div className="funds__header">
              <h2>Withdraw Funds</h2>
              <p>Please review your withdrawal details</p>
            </div>
            <p className="funds__message">
              Withdrawal was not completed. Please try again or contact{' '}
              <span style={{ color: '#7194ff' }}>Customer Support</span> for
              more details.
            </p>
            <div className="funds__withdrawal">
              <hr />
              <div className="summary">
                <ul>
                  <li>Withdraw to</li>
                  <li>Amount</li>
                  <li>Description</li>
                </ul>
                <ul>
                  <li className="flex">
                    <Image
                      src="/assets/gtb.png"
                      alt="Guaranty Trust Bank"
                      width="16px"
                      height="16px"
                    />
                    <div className="bold">Guaranty Trust Bank</div>
                  </li>
                  <li className="bold">&#8358;2,000.35</li>
                  <li className="bold">AD-Promoter</li>
                </ul>
              </div>
              <hr />
              <div className="funds__amount">
                <ul>
                  <li>Fee</li>
                  <li>Total Amount</li>
                </ul>
                <ul>
                  <li className="bold">&#8358;100.00</li>
                  <li className="bold">&#8358;2,100.35</li>
                </ul>
              </div>
            </div>
            <div className="funds__home">
              <button className="cancel" onClick={props.onClose}>
                Cancel
              </button>
              <button
                className="confirm"
                onClick={() => setWithdrawConfirmed(true)}
              >
                Confirm and Withdraw
              </button>
            </div>
          </div>
          <hr />
          <div className="funds__notice">
            Your bank or payment processor may apply extra fees.
          </div>
          </div>
        </WithdrawalFundsStyles>
      )}
    </ModalContainer>
  );
};

export default WithdrawFundsModal;
