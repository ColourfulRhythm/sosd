import { useState } from 'react';
import Image from 'next/image';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';
import { UndoContainer } from '../../AdminActivities/adminActivities.style';
import close from '@/public/assets/close-circle-small.svg';
import { send, cup, refresh, moneySend, status } from '@/public/assets/icon';
import Link from 'next/link';
import { useWidth } from '@/hooks';
import trash from '@/public/assets/trash.svg';
import { AdDisplay } from '../request.style';
import { toast } from 'react-hot-toast';
import ModalContainer from '@/components/AdminModals/ModalContainer';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx';
import { Oval } from 'react-loader-spinner';

const breakpoint = 1024;
const ReportedAds = ({ reportData, pending, error, token }) => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const { responsive } = useWidth(breakpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [reportedAd, setReportedAd] = useState();

  const openReportModal = async (userId) => {
    setReportModalIsOpen(true);
    setIsLoading(true);
    console.log(userId);
    try {
      const response = await fetch(
        `https://api.ad-promoter.com/api/v1/reports/adReports/${userId}`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();
      const data = json;

      setReportedAd(data.data);
      console.log(data);
    } catch (error) {
      toast.error('Error fetching Reported ad');
    }
    setIsLoading(false);
  };

  return (
    <>
      {reportModalIsOpen && (
        <ModalContainer>
          <div>
            <div className="close">
              {isLoading && (
                <div
                  style={{
                    width: '40rem',
                    height: '40rem',
                    maxWidth: ' 100%',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Oval
                    height={80}
                    width={80}
                    color="#4F00CF"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4F00CF"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              )}
              {!isLoading && (
                <div
                  style={{
                    width: '40rem',
                    height: 'auto',
                    maxWidth: ' 100%',
                  }}
                >
                  <button
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      setReportModalIsOpen(false);
                      setReportedAd();
                    }}
                  >
                    <Image src={close} alt="Exit icon" />
                  </button>
                  <div style={{ marginTop: '1rem', padding: '0.5rem' }}>
                    <div className="">
                      <p style={{ marginTop: '1rem' }}>
                        Product Name: {reportedAd.adReports[0].productName}
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        type: {reportedAd.adReports[0].type}
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        adStatus: {reportedAd.adReports[0].adStatus}
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        conversions: {reportedAd.adReports[0].conversions}
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        target: {reportedAd.adReports[0].target}
                      </p>
                      <p style={{ marginTop: '1rem' }}>
                        reports:{' '}
                        {reportedAd.adReports[0].reports.length > 0 &&
                          reportedAd.adReports[0].reports.map((report) => (
                            <span key={report}>{report},</span>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalContainer>
      )}

      <>
        {responsive ? (
          <div>
            {' '}
            {showBackdrop && (
              <Backdrop onCancel={() => setShowBackdrop(false)} />
            )}
            <UndoContainer
              style={{
                transform: showBackdrop
                  ? 'translateX(0)'
                  : 'translateX(-100vw)',
              }}
            >
              <div className="activity">Activity deleted</div>
              <div className="undo" onClick={() => setShowBackdrop(false)}>
                <p>Undo</p>
                <Image src={close} alt="close" />
              </div>
            </UndoContainer>
            {pending && <h4>Loading Report Ads...</h4>}
            {error && <h4>Something is wrong!!</h4>}
            <table>
              <tbody>
                {reportData &&
                  reportData.data.map((data, index) => (
                    <tr className="row" key={index}>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                          }}
                        >
                          <p>
                            <span className="group">
                              {' '}
                              {/* <Image src={profile1} width={15} /> */}
                              <div
                                className="noImage"
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  textAlign: 'center',
                                  background: '#a09ef9',
                                  fontSize: '10px',
                                  textTransform: 'uppercase',
                                  color: '#ffffff',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '50%',
                                }}
                              >
                                {data.productName.slice(0, 2)}
                              </div>
                              <span className="title">Product Name</span>
                            </span>
                            <span className="data-name">
                              {data.productName}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <span className="group">
                          <Image src={send} width={15} />
                          <span className="title">Advert Type</span>
                        </span>
                        <span className="data-name">{data.type}</span>
                      </td>
                      <td>
                        {' '}
                        <span className="group">
                          {' '}
                          <Image src={cup} width={15} />
                          <span className="title">Aim</span>
                        </span>
                        <span className="data-name">{data.target} Videos</span>
                      </td>
                      <td>
                        {' '}
                        <span className="group">
                          {' '}
                          <Image src={refresh} width={15} />
                          <span className="title">Archived</span>
                        </span>
                        <span className="data-name">no data</span>
                      </td>
                      <td>
                        {' '}
                        <span className="group">
                          {' '}
                          <Image src={moneySend} width={15} />
                          <span className="title">Price</span>
                        </span>
                        <span className="data-name">no data</span>
                      </td>
                      <td>
                        {' '}
                        <span className="group">
                          {' '}
                          <Image src={status} width={15} />
                          <span className="title">Status</span>
                        </span>
                        <span className="data-name">
                          <button
                            className={
                              data.approvalStatus == false
                                ? 'progress' || data.approvalStatus == true
                                : 'complete'
                            }
                          >
                            {data.approvalStatus == true
                              ? 'Completed'
                              : 'In Progress'}
                          </button>
                        </span>
                      </td>
                      <td>
                        {/* <Link href={`/reportedAds/${data._id}`}> */}
                        <button
                          className="view-button"
                          onClick={() => openReportModal(data._id)}
                        >
                          View
                        </button>
                        {/* </Link> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <AdDisplay className="ad-display">
            {' '}
            {showBackdrop && (
              <Backdrop onCancel={() => setShowBackdrop(false)} />
            )}
            <UndoContainer
              style={{
                transform: showBackdrop
                  ? 'translateX(0)'
                  : 'translateX(-100vw)',
              }}
            >
              <div className="activity">Activity deleted</div>
              <div className="undo" onClick={() => setShowBackdrop(false)}>
                <p>Undo</p>
                <Image src={close} alt="close" />
              </div>
            </UndoContainer>
            <div className="ad-group">
              <div className="ad-header">
                <h3>Reported adverts</h3>
                <Image src={trash} alt="trash" />
              </div>
              {reportData &&
                reportData.data.map((data) => (
                  <div className="ad-column" key={data.id}>
                    <div className="ad-content">
                      <div className="ad-inner">
                        {/* <Image src={profile1} alt="profile" /> */}
                        <div
                          className="noImage"
                          style={{
                            width: '25px',
                            height: '25px',
                            textAlign: 'center',
                            background: '#a09ef9',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                          }}
                        >
                          {data.productName.slice(0, 2)}
                        </div>
                        <span>{data.productName}</span>
                      </div>
                      <div>
                        <div className="status-text">
                          <Image src={status} width={10} />
                          <p>Status</p>
                        </div>
                        <span>
                          <button
                            className={
                              data.approvalStatus == false
                                ? 'progress' || data.approvalStatus == true
                                : 'complete'
                            }
                          >
                            {data.approvalStatus == true
                              ? 'Completed'
                              : 'In Progress'}
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="ad-text-content">
                      <div className="ad-text-smaller">
                        <span>Product Name</span>
                      </div>
                      <div className="ad-text-small-right">
                        <span>{data.productName}</span>
                      </div>
                    </div>
                    <div className="ad-text-content">
                      <div className="ad-text-smaller">
                        <span>Advert Type</span>
                      </div>
                      <div className="ad-text-small-right">
                        <span>{data.type}</span>
                      </div>
                    </div>
                    <div className="view-button-report-div">
                      {/* <Link href={`/reportedAds/${data._id}`}> */}
                      <button
                        className="view-button"
                        onClick={() => openReportModal(data._id)}
                      >
                        View
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                ))}
            </div>
          </AdDisplay>
        )}
      </>
    </>
  );
};

export default ReportedAds;
