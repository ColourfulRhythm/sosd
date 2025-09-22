import Button from '@/components/AdminReusables/AdminButton/Button';
import ModalContainer from '../ModalContainer';
import {
  WithdrawalDetailsStyles,
} from './styles';
import Image from 'next/image';

const WithdrawDetailsModal = (props) => {
  // const { onOpenWithdrawProcess, onCloseWithdrawDetails } = props;

  const toggleModals = () => {
    props.onCloseModal();
    props.onOpenModal();
  };

  return (
    <ModalContainer>
        <WithdrawalDetailsStyles>
          <div>
          <div className="header">
            <h2>Withdrawal Details</h2>
            <button onClick={toggleModals}>Edit</button>
          </div>
          <div className="withdrawal">
            <hr />
            <div className="withdrawal__details">
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
                  <p className="bold">Guaranty Trust Bank</p>
                </li>
                <li className="bold">&#8358;2,000.35</li>
                <li className="bold">AD-Promoter</li>
              </ul>
            </div>
            <div className="withdrawal__total">
              <hr />
              <div className="amount">
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
            <hr />
            <p className="withdrawal__notice">
              Total amount may be subject to fees charged by banks or third-part
              providers
            </p>
          </div>
          <div className="confirm">
            <input type="checkbox" />
            <label>I confirm the withdrawal details above</label>
          </div>
          <Button
            text="Withdraw"
            onOpen={props.onOpenWithdrawModal}
            onClose={props.onCloseModal}
          />
          </div>
        </WithdrawalDetailsStyles>
    </ModalContainer>
  );
};

export default WithdrawDetailsModal;
