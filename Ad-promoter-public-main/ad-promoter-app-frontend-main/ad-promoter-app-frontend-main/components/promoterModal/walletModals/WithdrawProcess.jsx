import { useState, useRef } from 'react';

import ModalContainer from '../ModalContainer';
import close from '@/public/assets/close-circle.svg';
import Image from 'next/image';
import gtb from '@/public/assets/gtb.svg';
import fcmb from '@/public/assets/fcmb.svg';
import Button from '@/components/promoterButton/Button';
import { WithdrawProcessStyles } from './styles';
import { formatCurrency } from '@/utils/formatCurrency';
import ButtonStyles from '@/components/promoterButton/styles';

const ProcessWithdrawModal = (props) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [firstBank, setFirstBank] = useState(false);
  const [secondBank, setSecondBank] = useState(false);
  const inputRef = useRef();
  const {onOpenWithdrawDetails, onCloseWithdrawProcess} = props;
  const {showWithdrawDetailsModal} = props.show;

  const renderMappedElements = () => {
    return [...props.accountData].slice(0,2).map((item) => {
      const matchedBank = props.banks.find((bank) => bank.code === item.details.bank_code);
      const logo = matchedBank ? matchedBank.logo : null;

      return (
        <div 
          key={item.id} 
          className={selectedBank === item.id ? "acct__container acct__bank1 acct__clicked" :"acct__container acct__bank1"} 
          onClick={() => handleBankChange(item.id,item.details.bank_name,logo)}>
          <div className="acctDetails">
            {logo && <Image src={logo} alt="Bank Logo" width={49} height={49} />}
            <div>
              <p className="acctNum">{item.details.account_number}</p>
              <p className="acctName">{item.details.account_name}</p>
            </div>
          </div>
          <div div className="select">
            <input type="radio" name="banks" value={item.id} checked={selectedBank === item.id} onChange={() => handleBankChange(item.id,item.details.bank_name)}/> 
            <span className="checkmark"></span>
          </div>
        </div>
      );
    });
  };

  const handleChange = () => {
    props.setAmount(inputRef.current.value);
  };

  const handleBankChange = (id,name,logo) =>{
    setSelectedBank(id)
    props.setSelectedBankName(name)
    props.setSelectedBankImage(logo)
  }

  const toggleFirstBank = () => {
    if(firstBank) {
      setFirstBank(false);
    }
    return;
  }
  
  const handleClick = () =>{
    if(selectedBank && props.amount){
      onOpenWithdrawDetails()
      onCloseWithdrawProcess()
    }
    return;
  }

  const selectFirstBank = () => {
    setFirstBank(true);
    toggleSecondBank();
  }

  const selectSecondBank = () => {
    setSecondBank(true);
    toggleFirstBank();
  }

  return (
    <ModalContainer>
      <WithdrawProcessStyles>
        <div className="close">
          <button onClick={onCloseWithdrawProcess}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <form>
          <h2>Process Withdrawal</h2>
          <div className="acct">
            {renderMappedElements()}
          </div>
          <div className="amountInput">
            <div className='input-container'>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={props.amount}
                ref={inputRef}
                onChange={handleChange}
              />
            </div>
            <div className="balance-container">
              <p className='balance'> BALANCE:</p>
              <p className='balance-amount'>{formatCurrency(props.totalBalance)}</p>
            </div>
          </div>
          {/* <Button text="Withdraw" onOpen={onOpenWithdrawDetails} onClose={onCloseWithdrawProcess}/> */}
        </form>
        <ButtonStyles onClick={handleClick}>
          <button>Withdraw</button>
        </ButtonStyles>
        {/* <Button text="Withdraw" onOpen={onOpenWithdrawDetails} onClose={onCloseWithdrawProcess}/> */}
      </WithdrawProcessStyles>
    </ModalContainer>
  );
};

export default ProcessWithdrawModal;
