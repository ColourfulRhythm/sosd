import React, {useState, useRef} from 'react'
import Image from 'next/image';
import close from '@/public/assets/close-circle.svg';
import { PaymentModalContainer } from './mobileWallet.style';
import { useAddWallet } from '@/hooks/useAddWallet';
const PaymentDetails = (props) => {
  const [bankCode, setBankCode] = useState("");
  const [acctName, setAcctName] = useState("");
  const [acctNumber, setAcctNumber] = useState("");
  const {createBank,isLoading} = useAddWallet()

  const saveBank = () => {
    createBank(bankCode,acctName,acctNumber,props)
  }



  return (
    <PaymentModalContainer>
      <div className='details'>Payment Details</div>
        <form>
            <div className="input">
              <label htmlFor="bankName">Bank name</label>
              <div>
                <select
                  className="input__element"
                  name="bankName"
                  id="bankName"
                  value={bankCode}
                  style={{color:'black'}}
                  onChange={(e) => setBankCode(e.target.value)}
                >
                  {props.banks.map((index)=>(
                    <option style={{color:'black'}} key={index.code} value={index.code}>{index.name}</option>
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
                  style={{color:'black'}}
                  type="text"
                  placeholder="Enter your account name"
                  onChange={(e) => setAcctName(e.target.value)}                />
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
                  style={{color:'black'}}
                  placeholder="Enter your account number"
                  onChange={(e)=>setAcctNumber(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className='changes'  onClick={saveBank}>{isLoading ? 'Saving...':'Save changes'}</div>
    </PaymentModalContainer>
  )
}

export default PaymentDetails
