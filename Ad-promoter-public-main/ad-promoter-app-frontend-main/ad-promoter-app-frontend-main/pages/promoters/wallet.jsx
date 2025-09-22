import { useState,useEffect,useRef } from 'react';
import WalletSummary from '@/components/promoterWallet/summary/walletSummary';
import TransactionHistory from '@/components/promoterWallet/transaction/transactionHistory';
import Wallet from '@/components/promoterWallet/wallet/wallet';
import PromoterWalletStyles, { MobileWallet, PromoterWalletContainer, TabWallet } from '@/styles/promoterWallet';
import ProcessWithdrawModal from '@/components/promoterModal/walletModals/WithdrawProcess';
import WithdrawDetailsModal from '@/components/promoterModal/walletModals/WithdrawDetails';
import WithdrawFundsModal from '@/components/promoterModal/walletModals/WithdrawFundsModal';
import PaymentDetailsModal from '@/components/promoterModal/walletModals/PaymentDetailsModal';
import VerificationModal from '@/components/promoterModal/walletModals/VerificationModal';
import SuccessModal from '@/components/promoterModal/walletModals/SuccessModal';
import Image from 'next/image';
import money from '@/public/assets/money.svg';
import wallet from '@/public/assets/empty-wallet-change.svg';
import plus from '@/public/assets/plus.svg';
import emptyWallet from '@/public/assets/empty-wallet-add.svg';
import documentDownload from '@/public/assets/document-download.svg';
import Transaction from '@/components/MobilePromoterWallet/Transaction';
import { BackdropContainer } from '@/components/MobilePromoterHome/style';
import PaymentDetails from '@/components/MobilePromoterWallet/PaymentDetails';
import Verification from '@/components/MobilePromoterWallet/Verification';
import Success from '@/components/MobilePromoterWallet/Success';
import WithdrawProcess from '@/components/MobilePromoterWallet/WithdrawProcess';
import WithdrawDetails from '@/components/MobilePromoterWallet/WithdrawDetails';
import WithdrawFunds from '@/components/MobilePromoterWallet/WithdrawFunds';
import arrowUp from '@/public/assets/arrow-up.svg'
import arrowDown from '@/public/assets/arrow-down.svg'
import { getThirtyDaysAgoRange, getTwoWeeksAgoRange, getWeekAgoRange } from '@/utils/formatFilterDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { Spinner } from '@chakra-ui/react';
import AccountEmptyScreen from '@/components/accountEmptyScreen';
import axios from '../api/axios';

const PromoterWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawProcessModal, setShowWithdrawProcessModal] = useState(false);
  const [showWithdrawDetailsModal, setShowWithdrawDetailsModal] = useState(false);
  const [showWithdrawFundsModal, setShowWithdrawFundsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstBank, setFirstBank] = useState(false);
  const [secondBank, setSecondBank] = useState(false);
  const [showSummary, setShowSummary] = useState(true)
  const token = useRef('')
  const [isLoading,setIsLoading] = useState(false)
  const [isTransactionHistoryLoading,setIsTransactionHistoryLoading] = useState(false)
  const [isDashboardLoading,setIsDashboardLoading] = useState(false)
  const [totalBalance,setTotalBalance] = useState('')
  const [pendingWithdrawals,setPendingWithdrawals] = useState('')
  const [amountPaid,setAmountPaid] = useState('')
  const [transactionHistory,setTransactionHistory] = useState([])
  const [banks,setBanks] = useState([])
  const [accountData,setAccountData] = useState([])
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBankName, setSelectedBankName] = useState(null);
  const [selectedBankImage, setSelectedBankImage] = useState(null);
  const [withdrawConfirmed, setWithdrawConfirmed] = useState(true);
  const [dashboardStartDate,setDashboardStartDate] = useState('')
  const [dashboardEndDate,setDashboardEndDate] = useState('')
  const [clickedFilter,setClickedFilter] = useState('Filter')
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedBankData = await fetchBanks();
        setBanks(fetchedBankData);

        const fetchedAccountData = await fetchAccountData();
        setAccountData(fetchedAccountData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  
  }, []);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user-token"));
    if (userToken) {
      token.current = userToken
    }

    if(token.current){
      fetchDashboard()
      fetchTransactionHistory()
    }
  },[dashboardEndDate, dashboardStartDate]);

  async function fetchBanks() {
    const response = await fetch('https://nigerianbanks.xyz/');
    const data = await response.json();
    return data
  }

  const fetchAccountData = async () => {
    try {
      const response = await axios.get('/api/v1/wallet/fetch-recipient', {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
  
      const data = response.data.data;
      return data;
    } catch (error) {
      console.error(error);
      toast({
        title: 'Unable to fetch account data',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
      return null;
    }
  };

  const fetchDashboard = async () => {
    let apiUrl = '/api/v1/user/dashboard';
  
    if (dashboardStartDate || dashboardEndDate) {
      apiUrl += '?';
    }
  
    if (dashboardStartDate) {
      apiUrl += `startDate=${dashboardStartDate}`;
    }
  
    if (dashboardEndDate) {
      apiUrl += `${dashboardStartDate ? '&' : ''}endDate=${dashboardEndDate}`;
    }
  
    setIsDashboardLoading(true);
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
  
      const data = response.data.data;
  
      setTotalBalance(data.totalBalance);
      setPendingWithdrawals(data.pendingWithdrawals);
      setAmountPaid(data.totalWithdrawals);
      setIsDashboardLoading(false);
    } catch (error) {
      console.error(error);
      setIsDashboardLoading(false);
      toast({
        title: 'Unable to fetch data',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
  };
 
  const fetchTransactionHistory = async () => {
    setIsTransactionHistoryLoading(true);
  
    try {
      const response = await axios.get('/api/v1/payouts/history?page=1&pageSize=10', {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
  
      setIsTransactionHistoryLoading(false);
      setTransactionHistory(response.data.data.data);
    } catch (error) {
      console.error(error);
      setIsTransactionHistoryLoading(false);
      toast({
        title: 'Unable to fetch transaction history',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
  };

  const handleFilterSelect = (e) =>{
    setClickedFilter(e.target.innerText)
    if(e.target.innerText === 'Recent'){
      setDashboardStartDate('')
      setDashboardEndDate('')
    }
    if(e.target.innerText === 'A week ago'){
      const { startOfWeek, endOfWeek } = getWeekAgoRange();
      setDashboardStartDate(startOfWeek)
      setDashboardEndDate(endOfWeek)
    }
    if(e.target.innerText === 'Less than 2 weeks'){
      const { startOfWeek, endOfWeek } = getTwoWeeksAgoRange();
      setDashboardStartDate(startOfWeek)
      setDashboardEndDate(endOfWeek)
    }
    if(e.target.innerText === 'Last 30 days'){
      const { startOfWeek, endOfWeek } = getThirtyDaysAgoRange();
      setDashboardStartDate(startOfWeek)
      setDashboardEndDate(endOfWeek)
    }
    setOpenFilter(false)
  }

  const toggleFirstBank = () => {
    if (firstBank) {
      setFirstBank(false);
    }
    return;
  };

  const toggleSecondBank = () => {
    if (secondBank) {
      setSecondBank(false);
    }
    return;
  };

  const selectFirstBank = () => {
    setFirstBank(true);
    toggleSecondBank();
  };

  const selectSecondBank = () => {
    setSecondBank(true);
    toggleFirstBank();
  };

  const renderMappedElements = () => {
    return [...accountData].slice(0,2).map((item) => {
      const matchedBank = banks.find((bank) => bank.code === item.details.bank_code);
      const logo = matchedBank ? matchedBank.logo : null;

      return (
        <div
        key={item.id}
        className="bank"
        onClick={()=>setSelectedBank(item.id)}
        style={{ backgroundColor: selectedBank === item.id && '#DCE4FF', border: selectedBank === item.id ? '0.2rem solid var(--light-blue)' : '0.145rem solid #DCE4FF' }}
        >
          <div className="holder">
            <div className="image-wrapper">
              {logo && <Image src={logo} alt="Bank Logo" width={49} height={49} />}
            </div>

            <div className='info'>
              <span style={{ color: selectedBank === item.id && 'var(--primary)' }}>{item.details.account_number}</span>
              <span style={{ color: selectedBank === item.id && 'var(--primary)' }}>{item.details.account_name}</span>
            </div>
          </div>
          <span style={{ height: '20px', width: '20px', borderRadius: '50%', border: selectedBank === item.id ? '6px solid var(--light-blue)' : '5.5px solid #E1E1E1' }}></span>            
        </div>
      );
    });
  };

  const walletData = [
    {
      icon: money,
      name: 'Total Balance',
      price: `${totalBalance}`,
      bg: '#D2EFFF',
      nameClass: 'balance'
    },
    {
      icon: wallet,
      name: 'Pending Withdrawal',
      price: `${pendingWithdrawals}`,
      bg: '#FFE2C7',
    },
    {
      icon: money,
      name: 'Amount Paid',
      price: `${amountPaid}`,
      bg: '#f1e8fe'
    },
  ]

  return (
    <>
    <PromoterWalletContainer>
      <PromoterWalletStyles>
        <div className='container'>
          <WalletSummary isDashboardLoading={isDashboardLoading} openFilter={openFilter} setOpenFilter={setOpenFilter} totalBalance={totalBalance} pendingWithdrawals={pendingWithdrawals} amountPaid={amountPaid} handleFilterSelect={handleFilterSelect} clickedFilter={clickedFilter} admin={false} />
          <TransactionHistory isLoading = {isTransactionHistoryLoading} transactionHistory={transactionHistory} />
        </div>
        <Wallet
          onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}
          show={showModal}
          banks={banks}
          accountData={accountData}
          isLoading={isLoading}
          onOpenPaymentDetailsModal={() => setShowPaymentDetailsModal(true)}

        />
      </PromoterWalletStyles>
      {showWithdrawProcessModal ? (
        <ProcessWithdrawModal
          onCloseWithdrawProcess={() => setShowWithdrawProcessModal(false)}
          onOpenWithdrawDetails={() => setShowWithdrawDetailsModal(true)}
          accountData={accountData}
          banks={banks}
          totalBalance={totalBalance}
          amount={amount}
          setAmount={setAmount}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          selectedBankName={selectedBankName}
          setSelectedBankName = {setSelectedBankName}
          selectedBankImage={selectedBankImage}
          setSelectedBankImage = {setSelectedBankImage}
          show={{ showWithdrawProcessModal, showWithdrawDetailsModal }}
        />
      ) : null}
      {showWithdrawDetailsModal ? (
        <WithdrawDetailsModal
          onCloseModal={() => setShowWithdrawDetailsModal(false)}
          onOpenModal={() => setShowVerificationModal(true)}
          onOpenWithdrawModal={() => setShowWithdrawFundsModal(true)}
          amount={amount}
          withdrawConfirmed={withdrawConfirmed}
          setWithdrawConfirmed={setWithdrawConfirmed}
          selectedBank={selectedBank}
          selectedBankName={selectedBankName}
          selectedBankImage={selectedBankImage}
          onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}
        />
      ) : null}
      {showWithdrawFundsModal ? (
        <WithdrawFundsModal 
        withdrawConfirmed={withdrawConfirmed} 
        setWithdrawConfirmed={setWithdrawConfirmed} 
        onClose={() => setShowWithdrawFundsModal(false)} 
        amount={amount}
        selectedBank={selectedBank}
        selectedBankImage={selectedBankImage}
        selectedBankName={selectedBankName}/>
      ) : null}
      {showPaymentDetailsModal ? (
        <PaymentDetailsModal
          onOpen={() => setShowSuccessModal(true)}
          onClose={() => setShowPaymentDetailsModal(false)}
          banks={banks}
        />
      ) : null}
      {showVerificationModal ? (
        <VerificationModal onOpen={() => setShowSuccessModal(true)} onClose={() => setShowVerificationModal(false)} />
      ) : null}
      {showSuccessModal ? (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      ) : null}
    </PromoterWalletContainer>
    <MobileWallet>
      <h2>Wallet Summary</h2>
      <div className='summary'>
        {walletData.map((item, index) => (
          <div key={index} className={item.nameClass ? 'balance' : 'card'} style={{backgroundColor: item.bg}}>
            <div className='amount'>
              <div className='icon'>
                <Image src={item.icon} alt='icon'/>
                <p>{item.name}</p>
              </div>
              <h3>{!isDashboardLoading ?  formatCurrency(item.price): <Spinner/>}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className='add-wallet'>
        <div className='add'>
          <p>Wallet</p>
          <Image src={plus} alt='add account info icon' onClick={() => setShowPaymentDetailsModal(true)}/>
        </div>

        <>     
          {accountData.length === 0 && isLoading ? (
            <Spinner 
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#4F00CF'
              size='xl'/>
          ):(
            <>      
              {accountData.length === 0 ?(
                <AccountEmptyScreen />
              ):(
                renderMappedElements()
              )}
            </>
          )}
        </>
        {accountData.length === 0 && !isLoading ? (
          <div className='withdrawal' onClick={() => setShowPaymentDetailsModal(true)}>
            <p>Add Account Info</p>
          </div>
        ):(
          <div className='withdrawal' onClick={() => setShowWithdrawProcessModal(true)}>
            <Image src={emptyWallet} alt='button'/>
            <p>Process Withdrawal</p>
          </div>
        )}

      </div>
      <div className='transaction'>
        <p>Transaction History</p>
        <Image src={documentDownload} alt='transaction'/>
      </div>
      <Transaction isLoading={isTransactionHistoryLoading} transactionHistory={transactionHistory}/>
      {showPaymentDetailsModal && <BackdropContainer onClick={() => setShowPaymentDetailsModal(false)}></BackdropContainer>}
      {showPaymentDetailsModal && <PaymentDetails onOpen={() => setShowSuccessModal(true)} onClose={() => setShowPaymentDetailsModal(false)} banks={banks}/>}
      {showVerificationModal && <BackdropContainer onClick={() => setShowVerificationModal(false)}></BackdropContainer>}
      {showVerificationModal && <Verification onOpen={() => setShowSuccessModal(true)} onClose={() => setShowVerificationModal(false)}/>}
      {showSuccessModal && <BackdropContainer onClick={() => setShowSuccessModal(false)}></BackdropContainer>}
      {showSuccessModal && <Success />}
      {showWithdrawProcessModal && <BackdropContainer onClick={() => setShowWithdrawProcessModal(false)}></BackdropContainer>}
      {showWithdrawProcessModal && 
        <WithdrawProcess onCloseWithdrawProcess={() => setShowWithdrawProcessModal(false)}
          onOpenWithdrawDetails={() => setShowWithdrawDetailsModal(true)}
          accountData={accountData}
          banks={banks}
          totalBalance={totalBalance}
          amount={amount}
          setAmount={setAmount}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          selectedBankName={selectedBankName}
          setSelectedBankName = {setSelectedBankName}
          selectedBankImage={selectedBankImage}
          setSelectedBankImage = {setSelectedBankImage}
          show={{ showWithdrawProcessModal, showWithdrawDetailsModal }}/>
      }
      {showWithdrawDetailsModal && <BackdropContainer></BackdropContainer>}
      {showWithdrawDetailsModal && 
        <WithdrawDetails onCloseModal={() => setShowWithdrawDetailsModal(false)}
          onOpenModal={() => setShowVerificationModal(true)}
          onOpenWithdrawModal={() => setShowWithdrawFundsModal(true)}
          amount={amount}
          withdrawConfirmed={withdrawConfirmed}
          setWithdrawConfirmed={setWithdrawConfirmed}
          selectedBank={selectedBank}
          selectedBankName={selectedBankName}
          selectedBankImage={selectedBankImage}
          onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}/>
      }
      {showWithdrawFundsModal && <BackdropContainer></BackdropContainer>}
      {showWithdrawFundsModal && 
        <WithdrawFunds 
        withdrawConfirmed={withdrawConfirmed} 
        setWithdrawConfirmed={setWithdrawConfirmed} 
        onClose={() => setShowWithdrawFundsModal(false)} 
        amount={amount}
        selectedBank={selectedBank}
        selectedBankImage={selectedBankImage}
        selectedBankName={selectedBankName}/>
      }
    </MobileWallet>
    <TabWallet>
      <div className='filter'>
        <div className='choose'>
          <div className={showSummary ? 'active' : 'non-active'} onClick={()=> setShowSummary(true)}>
            Wallet Summary
          </div>
          <div className={showSummary != true ? 'active' : 'non-active'} onClick={()=> setShowSummary(!showSummary)}>
            Wallet
          </div>
        </div>
        <div className='select' onClick={() => setShowDropdown(!showDropdown)}>
          <p>{clickedFilter}</p>
          {showDropdown ? <Image src={arrowDown} alt=""/> : <Image src={arrowUp} alt=""/>}
          {showDropdown && (
            <ul>
              <li onClick={handleFilterSelect}>Recent</li>
              <li onClick={handleFilterSelect}>A week ago</li>
              <li onClick={handleFilterSelect}>Less than 2 weeks</li>
              <li onClick={handleFilterSelect}>Last 30 days</li>
            </ul>
          )}
        </div>
      </div>
      {showSummary ? (
        <>
          <div className='summary'>
            <h3>Wallet Summary</h3>
            <div className='cards'>
              {walletData.map((item, index) => (
                <div className='each' key={index} style={{background: item.bg}}>
                  <div className='icon'>
                    <Image src={item.icon} alt="icon"/>
                    <p>{item.name}</p>
                  </div>
                  <h2>{!isDashboardLoading ?  formatCurrency(item.price): <Spinner/>}</h2>
                </div>
              ))}
            </div>
          </div>
          <TransactionHistory isLoading = {isLoading} transactionHistory={transactionHistory}/>
        </>
      ): (
      <>
        <div className='summary'>
          <div className='cards'>
            {walletData.map((item, index) => (
              <div className='each' key={index} style={{background: item.bg}}>
                <div className='icon'>
                  <Image src={item.icon} alt="icon"/>
                  <p>{item.name}</p>
                </div>
                <h2>{!isDashboardLoading ? formatCurrency(item.price): <Spinner/>}</h2>
              </div>
            ))}
          </div>
        </div>
        <Wallet
          onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}
          show={showModal}
          banks={banks}
          accountData={accountData}
          isLoading={isLoading}
          onOpenPaymentDetailsModal={() => setShowPaymentDetailsModal(true)}
        />
        {showWithdrawProcessModal ? (
          <ProcessWithdrawModal
          onCloseWithdrawProcess={() => setShowWithdrawProcessModal(false)}
          onOpenWithdrawDetails={() => setShowWithdrawDetailsModal(true)}
          accountData={accountData}
          banks={banks}
          totalBalance={totalBalance}
          amount={amount}
          setAmount={setAmount}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          selectedBankName={selectedBankName}
          setSelectedBankName = {setSelectedBankName}
          selectedBankImage={selectedBankImage}
          setSelectedBankImage = {setSelectedBankImage}
          show={{ showWithdrawProcessModal, showWithdrawDetailsModal }}
          />
        ) : null}
        {showWithdrawDetailsModal ? (
          <WithdrawDetailsModal
            onCloseModal={() => setShowWithdrawDetailsModal(false)}
            onOpenModal={() => setShowVerificationModal(true)}
            onOpenWithdrawModal={() => setShowWithdrawFundsModal(true)}
            amount={amount}
            withdrawConfirmed={withdrawConfirmed}
            setWithdrawConfirmed={setWithdrawConfirmed}
            selectedBank={selectedBank}
            selectedBankName={selectedBankName}
            selectedBankImage={selectedBankImage}
            onOpenWithdrawProcess={() => setShowWithdrawProcessModal(true)}
          />
        ) : null}
        {showWithdrawFundsModal ? (
          <WithdrawFundsModal withdrawConfirmed={withdrawConfirmed} 
          setWithdrawConfirmed={setWithdrawConfirmed} 
          onClose={() => setShowWithdrawFundsModal(false)} 
          amount={amount}
          selectedBank={selectedBank}
          selectedBankImage={selectedBankImage}
          selectedBankName={selectedBankName} />
        ) : null}
        {showPaymentDetailsModal ? (
          <PaymentDetailsModal
            onOpen={() => setShowSuccessModal(true)}
            onClose={() => setShowPaymentDetailsModal(false)}
            banks={banks}
          />
        ) : null}
        {showVerificationModal ? (
          <VerificationModal onOpen={() => setShowSuccessModal(true)} onClose={() => setShowVerificationModal(false)} />
        ) : null}
        {showSuccessModal ? (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        ) : null}
      </>)}
    </TabWallet>
    </>
  );
};

export default PromoterWallet;
