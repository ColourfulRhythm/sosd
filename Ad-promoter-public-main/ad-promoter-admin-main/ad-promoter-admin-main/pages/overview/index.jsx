import React, { useEffect, useState } from 'react';
import {
  ContainerStyle,
  ContainerStyleMobile,
} from '@/components/AdminPages/AdminOverview/index.style';
import UseFetch from '@/hooks/useFetch';
import { useWidth } from '@/hooks';
import {
  DashboardSummary,
  Welcome,
  TopAdvertPlacers,
  TopAdvertPromoters,
  AdvertGraph,
  Filter,
} from '@/components/AdminPages/AdminOverview';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx/index.jsx';
import edit from '@/public/assets/edit-2.svg';
import gallery from '@/public/assets/gallery-tick.svg';
import people from '@/public/assets/people.svg';
import profileCircle from '@/public/assets/profile-circle.svg';
import profileDelete from '@/public/assets/profile-delete.svg';
import userSquare from '@/public/assets/user-square.svg';
import flash from '@/public/assets/flash.svg';
import cup from '@/public/assets/cupIcon.svg';
import { useRouter } from 'next/router';

const breakpoint = 1024;
const Index = () => {
  const { responsive } = useWidth(breakpoint);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState(true);
  const [tokenAvailale, setTokenAvailable] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
    }

    if (userToken && !userToken.success) {
      router.push('/login');
    }

    console.log(userToken)

  }, []);



  // User Data
  const { data: userData } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/user'
  );
  // Dashboard Data
  const {
    data: dashboardData,
    pending,
    error,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/user/dashboard'
  );
  // top promoters Data

  const { data: topPromotersData } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/promotion/top-promoters?pageSize=5'
  );

  const { data: topPlacersData } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/ads/top-creators?pageSize=5'
  );

  const summary = dashboardData && [
    {
      icon: userSquare,
      name: 'Total No. of Users',
      num: dashboardData.userDetailedCount.totalUsers,
      bg: '#D2EFFF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: edit,
      name: 'No. of Placers',
      num: dashboardData.userDetailedCount.placers,
      bg: '#FFE2C7',
      shadow: '1px 2px 4px rgba(60, 41, 24, 0.2)',
    },
    {
      icon: cup,
      name: 'No. of Promoters',
      num: dashboardData?.userDetailedCount.promoters,
      bg: '#FFE2E4',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: flash,
      name: 'Total Adverts Placed',
      num: dashboardData?.adDetailedCount.totalAdCount,
      bg: '#D2FFE4',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: gallery,
      name: 'Approved Visual Ads',
      num: dashboardData.adDetailedCount.approvedVisualAds,
      bg: '#F4D4FF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: gallery,
      name: 'Pending Visual Ads',
      num: dashboardData.adDetailedCount.pendingVisualAds,
      bg: '#DDECF2',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: profileCircle,
      name: 'No. of Admins',
      num: dashboardData?.userDetailedCount.admins,
      bg: '#D2EFFF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: people,
      name: 'No. of Sub-Admins',
      num: dashboardData.userDetailedCount.subAdmins,
      bg: '#C8C7FF',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
    {
      icon: profileDelete,
      name: 'Blocklisted Users',
      num: 'no data',
      bg: '#FBC4BC',
      shadow: '1px 2px 4px rgba(33, 76, 95, 0.2)',
    },
  ];

  const onShowDropDownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const onCloseDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  if (error) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
          textAlign: 'center',
        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  if (
    !summary ||
    !userData ||
    !topPlacersData ||
    !topPromotersData ||
    pending
  ) {
    return <PageLoader />;
  }

  return (
    <>
      {responsive ? (
        <ContainerStyle>
          <div className="grid">
            <div className="col1">
              <Welcome userData={userData} />
              <DashboardSummary
                details={summary}
                pending={pending}
                error={error}
              />
              {/* <IncomeGraph /> */}
            </div>
            <div className="col2">
              <Filter
                onShowDropDown={onShowDropDownHandler}
                showDropdown={showDropdown}
                onCloseDropdown={onCloseDropdownHandler}
              />
              <AdvertGraph dashboardData={dashboardData} />
              <TopAdvertPromoters promoters={topPromotersData} />
              <TopAdvertPlacers placers={topPlacersData} />
            </div>
          </div>{' '}
        </ContainerStyle>
      ) : (
        <ContainerStyleMobile>
          <DashboardSummary details={summary} pending={pending} error={error} />
          {/* <IncomeGraph /> */}
          <Filter
            onShowDropDown={onShowDropDownHandler}
            showDropdown={showDropdown}
            onCloseDropdown={onCloseDropdownHandler}
          />
          <AdvertGraph dashboardData={dashboardData} />
          <TopAdvertPromoters promoters={topPromotersData} />
          <TopAdvertPlacers placers={topPlacersData} />
        </ContainerStyleMobile>
      )}
    </>
  );
};

export default Index;
