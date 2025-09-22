import React, {useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import SuccessMark from '@/public/assets/success-mark.gif';
import gtb from '@/public/assets/gtb.svg';
import { FundsContainer, FailedContainer } from './mobileWallet.style';
import { formatCurrency } from '@/utils/formatCurrency';
import axios from '@/pages/api/axios';
import { useToast } from '@chakra-ui/react';

const WithdrawFunds = (props) => {
    const toast = useToast()
    const withdraw = async (amount, userId) => {
        setIsLoading(true);
      
        try {
          const response = await axios.post(
            '/api/v1/payouts/create',
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
      
          const json = response.data;
      
          if (!response.status === 200) {
            success.current = false;
            setIsLoading(false);
            props.setWithdrawConfirmed(false);
            props.onOpenWithdrawModal();
            props.onCloseModal();
          } else {
            setIsLoading(false);
      
            if (json.success) {
              props.setWithdrawConfirmed(true);
      
              if (props.withdrawConfirmed) {
                props.onOpenWithdrawModal();
                props.onCloseModal();
              }
            }
          }
        } catch (error) {
          console.error('Error withdrawing:', error);
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
    <FundsContainer>
      {props.withdrawConfirmed ? (
        <>
            <div className='funds'>
                <div className='sucess-mark'>
                    <Image src={SuccessMark} alt="gif"/>
                </div>
                <p>Withdraw Funds</p>
                <span>Please review your withdrawal details</span>
            </div>
            <div className='check'>
                Withdrawal was successful. Check your mail for transaction verification
            </div>
            <div className='to'>
                <div className='destination'>
                    <p className='with'>Withdrawal to</p>
                    <div className='gtb'>
                        <Image
                        src={props.selectedBankImage}
                        alt="Bank Logo"
                        width="16px"
                        height="16px"
                        />
                        <span>{props.selectedBankName}</span>
                    </div>
                </div>
                <div className='price'>
                    <p>Amount</p>
                    <span>{formatCurrency(props.amount)}</span>
                </div>
                <div className='price'>
                    <p>Description</p>
                    <span>AD-Promoter</span>
                </div>
            </div>
            <div className='to'>
                <div className='fee'>
                    <p>Fee</p>
                    <span>{formatCurrency(100)}</span>
                </div>
                <div className='fee'>
                    <p>Total amount</p>
                    <span>{formatCurrency(props.amount - 100)}</span>
                </div>
            </div>
            <div className='third'>
                Total amount may be subject to feescharged by banks or third-part providers
            </div>
            <Link href="/promoters">
                <a>Home</a>
            </Link>
        </>
      ):(
        <FailedContainer>
          <div className='funds'>Withdraw Funds</div>
          <div className='review'>Please review your withdrawal details</div>
          <div className='complete'>
            Withdrawal was not completed. Please try again or contact <span style={{color: '#5c85ff'}}>Customer Support</span> for more details.
          </div>
          <div className='to'>
                <div className='destination'>
                    <p className='with'>Withdrawal to</p>
                    <div className='gtb'>
                    <Image
                        src={props.selectedBankImage}
                        alt="Bank Logo"
                        width="16px"
                        height="16px"
                        />
                        <span>{props.selectedBankName}</span>
                    </div>
                </div>
                <div className='price'>
                    <p>Amount</p>
                    <span>{formatCurrency(props.amount)}</span>
                </div>
                <div className='price'>
                    <p>Description</p>
                    <span>AD-Promoter</span>
                </div>
            </div>
            <div className='to'>
                <div className='fee'>
                    <p>Fee</p>
                    <span>{formatCurrency(100)}</span>
                </div>
                <div className='fee'>
                    <p>Total amount</p>
                    <span>{formatCurrency(props.amount - 100)}</span>
                </div>
            </div>
            <div className='third'>
                Total amount may be subject to feescharged by banks or third-part providers
            </div>
            <div className='confirm'>
                <input type="checkbox"/>
                <p>I can confirm the withdrawal details above</p>
            </div>
            <div className='cancel-confirm'>
                <div className='cancel-button' onClick={props.onClose}>Cancel</div>
                <div className='confirm-button' onClick={handleClick}>Confirm</div>
            </div>
            <div className='process'>Your bank or payment processor may apply extra fees.</div>
        </FailedContainer>
      )}
    </FundsContainer>
  )
}

export default WithdrawFunds
