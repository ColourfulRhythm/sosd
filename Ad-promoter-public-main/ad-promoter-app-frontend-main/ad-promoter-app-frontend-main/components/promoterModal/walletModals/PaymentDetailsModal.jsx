import { useState, useRef, useEffect } from 'react';

import ModalContainer from '../ModalContainer';
import { PaymentDetailsStyles } from './styles';
import Image from 'next/image';
import close from '@/public/assets/close-circle.svg';
import { useAddWallet } from '@/hooks/useAddWallet';

const PaymentDetailsModal = (props) => {
  const [bankCode, setBankCode] = useState("");
  const [acctName, setAcctName] = useState("");
  const [acctNumber, setAcctNumber] = useState("");
  const {createBank,isLoading} = useAddWallet()
  const saveBank = () => {
    createBank(bankCode,acctName,acctNumber,props)
  }

  return (
    <ModalContainer>
      <PaymentDetailsStyles>
        <div className="close">
          <button onClick={props.onClose}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <div className="container">
          <h2>Payment Details</h2>
          <form>
            <div className="input">
              <label htmlFor="bankName">Bank name</label>
              <div>
                <select
                  className="input__element"
                  name="bankName"
                  id="bankName"
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                >
                  {props.banks.map((index)=>(
                    <option key={index.code} value={index.code}>{index.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input">
              <label htmlFor="acctName">Account name</label>
              <div>
                <input
                  className="input__element"
                  id="acctName"
                  name="acctName"
                  value={acctName}
                  type="text"
                  placeholder="Enter your account name"
                  onChange={(e) => setAcctName(e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="acctNumber">Account number</label>
              <div>
                <input
                  className="input__element"
                  id="acctNumber"
                  name="acctNumber"
                  value={acctNumber}
                  type="number"
                  placeholder="Enter your account number"
                  onChange={(e)=>setAcctNumber(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="submit">
            <button onClick={saveBank}>{isLoading ? 'Saving...':'Save changes'}</button>
          </div>
        </div>
      </PaymentDetailsStyles>
    </ModalContainer>
  );
};

export default PaymentDetailsModal;
