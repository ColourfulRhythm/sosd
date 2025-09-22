import { useState } from 'react';
import Image from 'next/image';
import profile from '@/public/assets/Profil.svg';
import documentDownload from '@/public/assets/document-download.svg';
import {
  TransactionStyles,
  TransactionStylesMobile,
  TransactionHistoryStyles,
} from '../styles/transaction';
import TransactionDropdown from './transactionDropdown';
import ScrollContainer from 'react-indiana-drag-scroll';
import RightArrowHead from '@/public/assets/right-arrowHead.svg';
import { useWidth } from '@/hooks';
import { BsCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

const breakpoint = 1024;
const TransactionHistory = ({ transactionData }) => {
  const { responsive } = useWidth(breakpoint);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (i) => {
    if (openDropdownIndex === i) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(i);
    }
  };
  return (
    <>
      {responsive ? (
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
          <div className="transactionContainer">
            {/* <TransactionDropdown/> */}
            {transactionData &&
              transactionData.map((transactionData, i) => (
                <>
                  <TransactionStyles
                    show={openDropdown === i}
                    key={i}
                    onClick={() => toggleDropdown(i)}
                  >
                    <div className="container">
                      <div className="container__profile">
                        <Image
                          className="profile__img"
                          src={profile}
                          alt="User's profile image"
                        />
                        <p>{transactionData.recipient}</p>
                      </div>
                      <div className="container__transaction">
                        <div className="transaction-date">Today</div>
                        <div className="transaction-amount">
                          -&#8358;{transactionData.amount}
                        </div>
                      </div>
                      <div>
                        <button className="complete">
                          {transactionData.type}
                        </button>
                      </div>
                      <div style={{ paddingTop: '1rem' }}>
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
                    {openDropdownIndex === i && (
                      <TransactionDropdown
                        onCloseDropdown={() => setOpenDropdownIndex(null)}
                        data={transactionData}
                      />
                    )}
                  </TransactionStyles>
                </>
              ))}
          </div>
        </TransactionHistoryStyles>
      ) : (
        <TransactionHistoryStyles>
          <div className="intro">
            <h1>Transaction History</h1>
            <div className="statement">
              <Image src={documentDownload} alt="Document download icon" />
            </div>
          </div>
          <ScrollContainer className="transactionContainer">
            {transactionData &&
              transactionData.map((transactionData, i) => (
                <>
                  <TransactionStylesMobile
                    show={openDropdown === i}
                    key={i}
                    onClick={() => toggleDropdown(i)}
                  >
                    <div className="container">
                      <div className="container__profile">
                        <Image
                          className="profile__img"
                          src={profile}
                          alt="User's profile image"
                        />
                        <p>{transactionData.recipient}</p>
                      </div>
                      <div className="container__transaction-div">
                        <div className="container__transaction">
                          <div className="transaction-date">Today</div>
                          <div className="transaction-price">
                            &#8358;{transactionData.amount}
                          </div>
                        </div>
                        <div>
                          {transactionData.type === 'credit' ? (
                            <BsCheckCircleFill className="complete" />
                          ) : (
                            <BsFillXCircleFill className="failed" />
                          )}
                        </div>
                      </div>
                      <div style={{ paddingTop: '1rem' }}></div>
                    </div>
                    {openDropdownIndex === i && (
                      <TransactionDropdown
                        onCloseDropdown={() => setOpenDropdownIndex(null)}
                        data={transactionData}
                      />
                    )}
                  </TransactionStylesMobile>
                </>
              ))}
          </ScrollContainer>
        </TransactionHistoryStyles>
      )}{' '}
    </>
  );
};

export default TransactionHistory;
