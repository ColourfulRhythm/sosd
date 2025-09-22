import { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer';
import Image from 'next/image';
import close from '@/public/assets/close-circle.svg';
import { VerificationStyles} from './styles';

const VerificationModal = (props) => {
  const toggleModal = () => {
    props.onClose();
    props.onOpen();
  };

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [isInputWithValue, setIsInputWithValue] = useState(false);

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
        e.target.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 4) {
        e.target.form.elements[next].focus();
      }
    }
  };

  return (
    <ModalContainer>
     <VerificationStyles>
      <div>
        <div className="close">
          <button onClick={props.onClose}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <div className="container">
          <h2>Phone Verification Required</h2>
          <p className="container__info">
            You are trying to add a withdrawal method to this account. Please
            enter the verification code.
          </p>
          <div className="container__number">
            <p>A verification code was sent to</p>
            <p className="hashed">+234 *** *** **350</p>
          </div>
          <div className="container__code">
            <p>Enter Verification Code</p>
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
          </div>
          <div className="container__submit">
            <button onClick={toggleModal} className={isInputWithValue ? 'active':''}>Submit Code</button>
            <p>
              If you did not recieve, Please click{' '}
              <span style={{ color: '#7194ff' }}>Verify By Sms</span> and try
              again
            </p>
          </div>
        </div>
        </div>
      </VerificationStyles> 
    </ModalContainer>
  );
};

export default VerificationModal;
