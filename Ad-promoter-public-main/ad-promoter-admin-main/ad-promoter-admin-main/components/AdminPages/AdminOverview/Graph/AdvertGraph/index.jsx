import { useWidth } from '@/hooks';
import AdminChart from '@/components/AdminPages/AdminOverview/Charts/adminChart';
const breakpoint = 1024;

const AdvertGraph = ({ dashboardData }) => {
  const { responsive } = useWidth(breakpoint);
  return (
    <>
      {responsive ? (
        <>
          <div className="ad-graph">
            <h2>Advert Graph</h2>
            <div className="pie">
              {dashboardData && (
                <AdminChart
                  directLinkData={dashboardData?.adDetailedCount?.directLinkAds}
                  detailAdsData={dashboardData?.adDetailedCount?.detailAds}
                  visualAdsData={dashboardData?.adDetailedCount?.visualAds}
                />
              )}
              <div className="adType">
                <div className="ad">
                  <div className="blue"></div>
                  <p>Directlink Ad</p>
                </div>
                <div className="ad">
                  <div className="yellow"></div>
                  <p>Details Ad</p>
                </div>
                <div className="ad">
                  <div className="green"></div>
                  <p>Visual Ad</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ad-graph">
            <h2>Advert Graph</h2>
            <div className="pie">
              {dashboardData && (
                <AdminChart
                  directLinkData={dashboardData?.adDetailedCount?.directLinkAds}
                  detailAdsData={dashboardData?.adDetailedCount?.detailAds}
                  visualAdsData={dashboardData?.adDetailedCount?.visualAds}
                />
              )}
              <div className="adType">
                <div className="ad">
                  <div className="blue"></div>
                  <p>Directlink Ad</p>
                </div>
                <div className="ad">
                  <div className="yellow"></div>
                  <p>Details Ad</p>
                </div>
                <div className="ad">
                  <div className="green"></div>
                  <p>Visual Ad</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdvertGraph;
