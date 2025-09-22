import { useWidth } from '@/hooks';
import Image from 'next/image';
import { Thunder, greenMoney } from '@/public/assets/icon';
import profileImage from '@/public/assets/image/no-profile-image.svg'

const breakpoint = 1024;
const TopAdvertPlacers = (props) => {
  const { responsive } = useWidth(breakpoint);

  return (
    <>
      {responsive ? (
        <div className="adPromoters">
          <h2>Top Advert Placers</h2>
          {props.placers.data.map((item, index) => (
            <div className="topPromoters" key={index}>
              {item.creator.map((data, index) => (
                <div className="user" key={index}>
                  <img
                    src={
                      data.profilePicture
                        ? data.profilePicture
                        : profileImage.src
                    }
                    alt="picture"
                    width={50}
                    height={50}
                    style={{ borderRadius: '100%' }}
                  />
                  <div className="name">
                    <>
                      <p className="userName">
                        {data.accountName ? data.accountName : 'null'}
                      </p>
                      <p className="email">
                        {data.email
                          ? data.email.length > 17
                            ? `${data.email.substring(0, 17)}..`
                            : data.email
                          : 'null'}
                      </p>
                    </>
                  </div>
                </div>
              ))}
              <div className="result">
                <p className="adResult">
                  Adverts: <span>{item.adverts ? item.adverts : 'null'}</span>
                </p>
                <div className="line"></div>
                <p className="earning">
                  Earning: <span>{item.amountPaid ? item.amountPaid : 'null'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="adPromoters">
          <h2>Top Advert Placers</h2>
          {props.placers.data.map((item, index) => (
            <div className="topPromoters" key={index}>
               {item.creator.map((data, index) => (
                <div className="user" key={index}>
                  {console.log(data.profilePicture)}
                  <Image
                    src={
                      data.profilePicture
                        ? data.profilePicture
                        : profileImage.src
                    }
                    alt="picture"
                    width={50}
                    height={50}
                    style={{ borderRadius: '100%' }}
                  />
                  <div className="name">
                    <>
                      <p className="userName">
                        {data.accountName ? data.accountName : 'null'}
                      </p>
                      <p className="email">
                        {data.email
                          ? data.email.length > 17
                            ? `${data.email.substring(0, 17)}..`
                            : data.email
                          : 'null'}
                      </p>
                    </>
                  </div>
                </div>
              ))}
              <hr style={{ margin: '3rem 0', border: '0.5px solid #808080' }} />

              <div className="result">
                <div className="adResult">
                  <p>
                    <span className="">
                      <Image src={Thunder} alt="adverts" />
                      <span className="ad-label">Adverts:</span>
                    </span>{' '}
                    <span>{item.adverts ? item.adverts : 'null'}</span>
                  </p>
                </div>
                <div className="adResult">
                  <p>
                    <span>
                      <Image src={greenMoney} alt="earnings" />
                      <span className="ad-label">Earning:</span>
                    </span>
                    <span>{item.amountPaid ? item.amountPaid : 'null'}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopAdvertPlacers;
