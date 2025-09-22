import React, {useState} from 'react'
import { TransactionContainer } from './mobileWallet.style';
import profile from '@/public/assets/Profil.svg';
import Image from 'next/image';
import RightArrowHead from '@/public/assets/right-arrowHead.svg';
import inProgress from '@/public/assets/minus-cirlce.svg'
import failed from '@/public/assets/failed.svg'
import success from '@/public/assets/success.svg'
import refresh from "@/public/assets/retry.svg";
import { CgProfile } from 'react-icons/cg';
import TimeAgo from '../timeAgo';
import { Spinner } from '@chakra-ui/react';
import WalletEmptyScreen from '../walletEmptyScreen';

const transactionsData = [
    {
      name: 'Skylar Dias',
      image: profile,
      date: 'Today',
      amount: '21,000.98',
      status: failed,
    },
    {
      name: 'Skylar Dias',
      image: profile,
      date: 'Today',
      amount: '21,000.98',
      status: inProgress,
    },
    {
      name: 'Skylar Dias',
      image: profile,
      date: 'Yesterday',
      amount: '21,000.98',
      status: success,
    },
    {
      name: 'Skylar Dias',
      image: profile,
      date: '21, sept, 2019 7:30AM',
      amount: '21,000.98',
      status: success,
    },
    {
      name: 'Skylar Dias',
      image: profile,
      date: '21, sept, 2019 7:30AM',
      amount: '21,000.98',
      status: success,
    },
    {
      name: 'Skylar Dias',
      image: profile,
      date: '21, sept, 2019 7:30AM',
      amount: '21,000.98',
      status: success,
    },
];
const dropdownData = [
    {
        paymentId: "#300923201",
        invoiceDate: "21, sept, 2019",
        dueDate: "21, sept, 2019",
        datePaid: "21, sept, 2019"
    }
]
const Transaction = ({transactionHistory,isLoading}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    if (openDropdown) {
      setOpenDropdown(false);
    } else {
      setOpenDropdown(true);
    }
  };
  
  return (
    <>
      {isLoading && transactionHistory.length === 0 ?(
        <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#4F00CF'
        size='xl'/>
      ):(
        <>  
        {transactionHistory.length === 0 ? (
          <WalletEmptyScreen />
        ):(
          <TransactionContainer show={openDropdown ? false : true}>
              {[...transactionHistory].reverse().map((item) => (
                  <div key={item._id}>
                    {item.status === failed ? (
                      <div className='open-close'>
                          <div className='failed' onClick={toggleDropdown}>
                              <div className='profile'>
                                {item.user.images ? (
                                  <Image
                                    className="profile__img"
                                    src={i.user.images[0]}
                                    alt="User's profile image"
                                  />
                                ):(
                                  <CgProfile width={20} height={20}/>
                                )}
                                <p>{item.name}</p>
                              </div>
                              <div className='status'>
                                  <div className='time'>
                                      <div className='date'>
                                          <p>{<TimeAgo dateTime={item.createdAt} />}</p>
                                          <span>-&#8358;{item.amount}</span>
                                      </div>
                                      <Image src={item.status} alt='status'/>
                                  </div>
                                  <Image src={RightArrowHead} alt='arrow'/>
                              </div>
                          </div>
                          {openDropdown && (
                              <div className='dropdown'>
                                {dropdownData.map((item, index) => (
                                  <div key={index} className="drop">
                                    <div key={index}>
                                      <h3>Payment ID</h3>
                                      <p>{item.paymentId}</p>
                                    </div>
                                    <div key={index}>
                                      <h3>Invoice Date</h3>
                                      <p>{item.invoiceDate}</p>
                                    </div>
                                    <div key={index}>
                                      <h3>Due Date</h3>
                                      <p>{item.dueDate}</p>
                                    </div>
                                    <div key={index}>
                                      <h3>Date Paid</h3>
                                      <p>{item.datePaid}</p>
                                    </div>
                                    <button onClick={() => setOpenDropdown(false)}>
                                      <Image src={refresh} alt="Refresh icon"/>
                                      <p>Retry</p>
                                    </button>
                                  </div>
                                ))}
                              </div>
                          )}
                      </div>
                    ) : (
                      <div className='pass'>
                          <div className='profile'>
                              {item.user.images ? (
                                  <Image
                                    className="profile__img"
                                    src={i.user.images[0]}
                                    alt="User's profile image"
                                  />
                                ):(
                                  <CgProfile width={20} height={20}/>
                              )}
                              <p>{item.name}</p>
                          </div>
                          <div className='time'>
                              <div className='date'>
                                  <p>{<TimeAgo dateTime={item.createdAt} />}</p>
                                  <span>{item.amount}</span>
                              </div>
                              <Image src={item.status === "pending" ? inProgress || item.status === "COMPLETE" : success} alt='status'/>
                          </div>
                      </div>
                  )}
                  </div>
              ))}      
          </TransactionContainer>
        )}      
        </>
      )}    
    </>
  )
}

export default Transaction
