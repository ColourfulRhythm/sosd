import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ModalContainer from '../ModalContainer';
import Button from '@/components/promoterButton/Button';
import { WithdrawalFundsStyles } from './styles';
import close from '@/public/assets/close-circle.svg';
import SuccessMark from '@/public/assets/success-mark.gif'
import Fail from '@/public/assets/fail.gif'
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
const WithdrawFundsModal = (props) => {
  const [token,setToken] = useState('')
  const [userId,setUserId] = useState('')
  const [isLoading,setIsLoading] = useState(null)
  const toast = useToast()
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    const userId = JSON.parse(localStorage.getItem('user-detail'))
    if (userToken) {
      setToken(userToken);
      setUserId(userId._id)
    }
  },[]);
  
  const withdraw = async (amount, userId) => {
    try {
      setIsLoading(true);
  
      const response = await axios.post(
        'https://api.ad-promoter.com/api/v1/payouts/create',
        {
          amount: amount,
          recipient: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        const json = response.data;
        setIsLoading(false);
  
        if (json.success) {
          props.setWithdrawConfirmed(true);
        } else {
          props.setWithdrawConfirmed(false);
        }
      } else {
        setIsLoading(false);
        toast({
          title: 'Something went wrong',
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
          size: 'lg',
        });       
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      setIsLoading(false);
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: '5000',
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });     
    }
  };

const handleClick = () =>{
 withdraw(props.amount,userId)
}

  return (
    <ModalContainer>
      {props.withdrawConfirmed ? (
        <WithdrawalFundsStyles>
          <div className="close">
            <button onClick={props.onClose}>
              <Image src={close} alt="Exit icon" />
            </button>
          </div>

          <div className='success'>
            <Image src={SuccessMark} alt='success'/>
          </div>
          {/* <div className="loading">Loading...</div> */}
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
                    src={props.selectedBankImage}
                    alt="Bank Logo"
                    width="16px"
                    height="16px"
                  />
                  <div className="bold">{props.selectedBankName}</div>
                  </li>
                  <li className="bold">{formatCurrency(props.amount)}</li>
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
                  <li className="bold">{formatCurrency(100)}</li>
                  <li className="bold">{formatCurrency(props.amount - 100)}</li>
                </ul>
              </div>
            </div>
            <div className="funds__home">
              <Link href="/promoters">
                <a>Home</a>
              </Link>
            </div>
          </div>
        </WithdrawalFundsStyles>
      ) : (
        <WithdrawalFundsStyles>
          <div className="close">
            <button onClick={props.onClose}>
              <Image src={close} alt="Exit icon" />
            </button>
          </div>
          <div className="success">
            <Image src={Fail} alt='fail'/>
          </div>
          <div className="funds">
            <div className="funds__header">
              <h2>Withdraw Funds</h2>
              {/* <p>Please review your withdrawal details</p> */}
            </div>
            <p className="funds__message">
            Withdrawal was not completed. Please try again or contact <span style={{color: "#7194ff"}}>Customer Support</span> for more details.
            </p>
            <p className="funds__message"><span style={{fontWeight:'bold'}}>Note:</span> review your withdrawal details and also check if you have enough withdrawable funds</p>
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
                        src={props.selectedBankImage}
                        alt="Bank Logo"
                        width="16px"
                        height="16px"
                      />
                    <div className="bold">{props.selectedBankName}</div>
                  </li>
                  <li className="bold">{formatCurrency(props.amount)}</li>
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
                  <li className="bold">{formatCurrency(100)}</li>
                  <li className="bold">{formatCurrency(props.amount - 100)}</li>
                </ul>
              </div>
            </div>
            <div className="funds__home">
              <button className="cancel" onClick={props.onClose}>
                Cancel
              </button>
              <button className="confirm" onClick={handleClick}>{isLoading ? 'Withdrawing' : 'Confirm and Withdraw'}</button>
            </div>
          </div>
          <hr />
          <div className="funds__notice">
            Your bank or payment processor may apply extra fees.
          </div>
        </WithdrawalFundsStyles>
      )}
    </ModalContainer>
  );
};

export default WithdrawFundsModal;
