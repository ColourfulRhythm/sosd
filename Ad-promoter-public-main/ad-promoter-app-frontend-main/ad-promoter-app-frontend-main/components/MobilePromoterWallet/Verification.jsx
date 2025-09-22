import React, {useEffect, useState} from 'react'
import { VerificationContainer } from './mobileWallet.style'

const Verification = ({onOpen, onClose}) => {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [isInputWithValue, setIsInputWithValue] = useState(false);

  const toggleModal = () => {
    onClose();
    onOpen();
  }
  useEffect(()=>{
    const handleInputWithValue = () =>{
      if(otp1 !== '' && otp2!== '' && otp3!== '' && otp4!==''){
        setIsInputWithValue(true)
      }else{
        setIsInputWithValue(false)
      }
    }
    handleInputWithValue()
  },[otp1,otp2,otp3,otp4])

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'otp1':
        setOtp1(value);
        break;
      case 'otp2':
        setOtp2(value);
        break;
      case 'otp3':
        setOtp3(value);
        break;
      case 'otp4':
        setOtp4(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const inputFocus = (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const next = e.target.tabIndex - 2;

      console.log(e);

      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 4) {
        e.target.form.elements[next].focus();
      }
    }
  };
  return (
    <VerificationContainer>
      <div className='verification'>Phone Verification Required</div>
      <p className='instruction'>You are trying to add a withdrawal method to this account</p>
      <p className='instruction'>Please enter the verification code</p>
      <p className='code'>A verification code was sent to</p>
      <p className='number'>+234 *** ** **57</p>
      <p className='code'>Enter Verification Code</p>
      <form onSubmit={handleSubmit}>
              <div className="codebox">
                <input
                  type="text"
                  name="otp1"
                  value={otp1}
                  autoComplete="off"
                  tabIndex="1"
                  maxLength="1"
                  onChange={handleChange}
                  onKeyUp={inputFocus}
                />
                <input
                  type="text"
                  name="otp2"
                  value={otp2}
                  autoComplete="off"
                  tabIndex="2"
                  maxLength="1"
                  onChange={handleChange}
                  onKeyUp={inputFocus}
                />
                <input
                  type="text"
                  name="otp3"
                  value={otp3}
                  autoComplete="off"
                  tabIndex="3"
                  maxLength="1"
                  onChange={handleChange}
                  onKeyUp={inputFocus}
                />
                <input
                  type="text"
                  name="otp4"
                  value={otp4}
                  autoComplete="off"
                  tabIndex="4"
                  maxLength="1"
                  onChange={handleChange}
                  onKeyUp={inputFocus}
                />
              </div>
        </form>
        <button onClick={toggleModal} className={isInputWithValue ? 'active' : ''}>Submit Code</button>
        <p className='receive'>If you did not receive, Please click <span style={{ color: '#7194ff' }}>Verify By Sms</span> and try again</p>
    </VerificationContainer>
  )
}

export default Verification
