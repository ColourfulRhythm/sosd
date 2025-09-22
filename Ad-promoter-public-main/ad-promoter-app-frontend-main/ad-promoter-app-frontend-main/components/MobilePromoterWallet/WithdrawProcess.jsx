import React, {useState, useRef} from 'react'
import { WithdrawContainer } from './mobileWallet.style'
import Image from 'next/image';
import gtb from '@/public/assets/gtb.svg';
import fcmb from '@/public/assets/fcmb.svg';
import emptyWallet from '@/public/assets/empty-wallet-add.svg';
import { formatCurrency } from '@/utils/formatCurrency';
const WithdrawProcess = (props) => {
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


  const toggleSecondBank = () => {
    if(secondBank) {
      setSecondBank(false);
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
    <WithdrawContainer>
        <div className='withdraw'>Process Withdrawal</div>
        <form>
          <div className="acct">
            {renderMappedElements()}
          </div>
          <div className="amountInput">
            <div className='input-container'>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                placeholder='Enter amount'
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
        <div onClick={handleClick} className='withdraw-button'>
            <Image src={emptyWallet} alt='wallet'/>
            <p>Process Withdrawal</p>
        </div>
    </WithdrawContainer>
  )
}

export default WithdrawProcess
