import { useState } from 'react';

import Image from 'next/image';
import trash from '@/public/assets/trash.svg';
import profile from '@/public/assets/Profil.svg';
import documentDownload from '@/public/assets/document-download.svg';
import Arrow from '@/public/assets/arrow-3';
import { TransactionHistoryStyles } from '../styles/transaction';
import Transaction from './transaction';
import { TransactionStyles } from '../styles/transaction';
import TransactionDropdown from './transactionDropdown';
import ScrollContainer from 'react-indiana-drag-scroll';
import RightArrowHead from '@/public/assets/right-arrowHead.svg';
import TimeAgo from '@/components/timeAgo';
import { CgProfile } from 'react-icons/cg';
import WalletEmptyScreen from '@/components/walletEmptyScreen';
import { Spinner } from '@chakra-ui/react';

const TransactionHistory = ({transactionHistory,isLoading}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    if (openDropdown) {
      setOpenDropdown(false);
    } else {
      setOpenDropdown(true);
    }
  };

  return (
    <TransactionHistoryStyles>
      <div className="intro">
        <h1>Transaction History</h1>
        <button>
          <div className="statement">
            <Image src={documentDownload} alt="Document download icon" />
            <p>Request Statement</p>
          </div>
        </button>
      </div>
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
            <ScrollContainer className="transactionContainer">
              {/* <TransactionDropdown/> */}
              {[...transactionHistory].reverse().map((i) => (
                <div key={i._id}>
                  {i.status === 'failed' ? (
                    <TransactionStyles show={openDropdown ? true : false} key={i} onClick={toggleDropdown}>
                      <div className="container">
                        <div className="container__profile">
                          {i.user.images ? (
                            <Image
                              className="profile__img"
                              src={i.user.images[0]}
                              alt="User's profile image"
                            />
                          ):(
                            <CgProfile width={20} height={20}/>
                          )}
                          <p>{i.name}</p>
                        </div>
                        <div className="container__transaction">
                          <div className="transaction-date">{<TimeAgo dateTime={i.createdAt} />}</div>
                          <div className="transaction-amount">-&#8358;{i.amount}</div>
                        </div>
                        <div>
                          <button className="failed">{i.status}</button>
                        </div>
                        <div style={{paddingTop: "1rem"}}>
                          <Image
                            src={RightArrowHead}
                            alt=""
                            width={24}
                            className={
                              openDropdown
                                ? 'container__rotate container__arrow'
                                : 'container__arrow'
                            }
                          />
                        </div>
                      </div>
                      {openDropdown ? <TransactionDropdown onCloseDropdown={() => setOpenDropdown(false)} /> : null}
                    </TransactionStyles>
                  ) : (
                    <TransactionStyles key={i}>
                      <div className="container">
                        <div className="container__profile">
                          {i.user.images ? (
                            <Image
                              className="profile__img"
                              src={i.user.images[0]}
                              alt="User's profile image"
                            />
                          ):(
                            <div>
                              <CgProfile width={52} height={52}/>
                            </div>
                          )}
                          <p>{i.name}</p>
                        </div>
                        <div className="container__transaction">
                          <div className="transaction-date">{<TimeAgo dateTime={i.createdAt} />}</div>
                          <div className="transaction-amount">-&#8358;{i.amount}</div>
                        </div>
                        <div>
                          <button className={i.status === "pending" ? "progress" || i.status === "COMPLETE" : "complete"}>{i.status}</button>
                        </div>
                      </div>
                    </TransactionStyles>
                  )}
                </div>
              ))}
            </ScrollContainer>
          )}
        </>
      )}
    </TransactionHistoryStyles>
  );
};

export default TransactionHistory;
