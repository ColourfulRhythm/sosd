import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { useEffect } from 'react';


const ReportDetails = () => {

  useEffect(() => {

  },[])

  return (
    <>
      {' '}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="report_details">
        <h1>Product Name: {reportAdsDetails.productName}</h1>
        <h1>type: {reportAdsDetails.type}</h1>
        <h1>adStatus: {reportAdsDetails.adStatus}</h1>
        <h1>conversions: {reportAdsDetails.conversions}</h1>
        <h1>target: {reportAdsDetails.target}</h1>
      </div>
    </>
  );
};

export default ReportDetails;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const { req, res } = context;

  const token = getCookie('token', { req, res });
  console.log(token);

  const response = await fetch(
    `https://ad-5ez7.onrender.com/v1/reports/adReports/${id}`,
    {
      method: 'Get',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const reportAdsDetails = await response.json();
  const adReports = reportAdsDetails.data.adReports[0];
  return {
    props: {
      reportAdsDetails: adReports,
    },
  };
};
