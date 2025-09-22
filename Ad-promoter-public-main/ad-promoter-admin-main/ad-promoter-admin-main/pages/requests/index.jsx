import { useState, useEffect } from 'react';
import {
  RequestSettings,
  RequestSettingsMobile,
  Container,
} from '@/components/AdminPages/AdminRequest/request.style';
import { requestCategories } from '@/data/RequestCategories/requestCategories';
import {
  VisualAdRequest,
  ReportedAds,
  SocialAdRequest,
  WithdrawalRequest,
} from '@/components/AdminPages/AdminRequest/categories';
import { useWidth } from '@/hooks';
import UseFetch from '@/hooks/useFetch';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx/index.jsx';
import Filter from '@/components/AdminReusables/Filter';
import Head from 'next/head';

const breakpoint = 1024;
const Settings = () => {
  const { responsive } = useWidth(breakpoint);

  const [selected, setSelected] = useState('Visual Ad Request');
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenAvailale, setTokenAvailable] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
    }
  }, []);

  const {
    data: responseData,
    pending,
    error,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/reports/reportedAds'
  );

  const {
    data: responseSocial,
    pendingSocial,
    errorSocial,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/user/social-requests'
  );

  const {
    data: responseVisual,
    pendingVisual,
    errorVisual,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/promotion/unapproved-visual-promotions'
  );

  const {
    data: responseWithdrawal,
    pendingWithdrawal,
    errorWithdrawal,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/payouts/pending'
  );

  const onShowDropDownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const onCloseDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  if (error || errorSocial || errorVisual || errorWithdrawal) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '75vh',
        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  if (pending || pendingSocial || pendingVisual || pendingWithdrawal) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {responsive ? (
        <RequestSettings>
          <main>
            <div className="log">
              <span>
                <ul className="categories">
                  {requestCategories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => setSelected(category.category)}
                      style={{
                        color:
                          selected == category.category
                            ? 'var(--black)'
                            : '#9e82bd',
                        fontSize: selected == category.category ? '1.5rem' : '',
                        fontWeight:
                          selected == category.category ? '500' : '400',
                        borderBottom:
                          category.category == selected
                            ? '2.5px solid var(--primary)'
                            : '',
                      }}
                    >
                      {category.category}
                    </li>
                  ))}
                </ul>
              </span>
              <Filter
                onShowDropDown={onShowDropDownHandler}
                onCloseDropdown={onCloseDropdownHandler}
                showDropdown={showDropdown}
              />
            </div>

            <div className="contents">
              {selected == 'Visual Ad Request' ? (
                <VisualAdRequest visualData={responseVisual} token={token}/>
              ) : selected == 'Social Ad Request' ? (
                <SocialAdRequest socialData={responseSocial} token={token}/>
              ) : selected == 'Withdrawal Request' ? (
                <WithdrawalRequest withdrawalData={responseWithdrawal} token={token}/>
              ) : selected == 'Reported Ads' ? (
                <ReportedAds
                  reportData={responseData}
                  pending={pending}
                  error={error}
                  token={token}
                />
              ) : (
                ''
              )}
            </div>
          </main>
        </RequestSettings>
      ) : (
        <RequestSettingsMobile>
          <main className="">
            <div className="log">
              <div className="categories-group">
                <ul className="categories">
                  {requestCategories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => setSelected(category.category)}
                      style={{
                        color:
                          selected == category.category ? '#4F00CF' : '#808080',
                        backgroundColor:
                          selected == category.category ? '#F4F4F4' : '#FFFFFF',
                        fontSize:
                          selected == category.category ? '14px' : '13px',
                        fontWeight:
                          selected == category.category ? '500' : '400',
                        border:
                          category.category == selected
                            ? '2px solid #D3B8FF'
                            : '1px solid #D3B8FF',
                        borderRadius: '1000px',
                        width: '20rem',
                        display: 'inline-block',
                        textAlign: 'center',
                        padding: '1rem 0 ',
                      }}
                    >
                      {category.category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Filter
              onShowDropDown={onShowDropDownHandler}
              onCloseDropdown={onCloseDropdownHandler}
              showDropdown={showDropdown}
            />

            <div className="contents">
              {selected == 'Visual Ad Request' ? (
                <VisualAdRequest visualData={responseVisual} token={token}/>
              ) : selected == 'Social Ad Request' ? (
                <SocialAdRequest socialData={responseSocial} token={token}/>
              ) : selected == 'Withdrawal Request' ? (
                <WithdrawalRequest withdrawalData={responseWithdrawal} token={token}/>
              ) : selected == 'Reported Ads' ? (
                <ReportedAds
                  reportData={responseData}
                  pending={pending}
                  error={error}
                  token={token}
                />
              ) : (
                ''
              )}
            </div>
          </main>
        </RequestSettingsMobile>
      )}{' '}
    </Container>
  );
};

export default Settings;
