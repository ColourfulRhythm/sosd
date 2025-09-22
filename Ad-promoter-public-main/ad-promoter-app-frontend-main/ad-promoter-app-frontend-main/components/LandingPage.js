import { LandingPageContainer } from '@/styles/landingPageStyle';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Del from '@/public/assets/del.svg';
import Image from 'next/image';
import UserTagBlue from '@/public/assets/user-tag-blue';
import Img1 from '@/public/assets/Component 20.jpg';
import Img2 from '@/public/assets/Component 21.jpg';
import Link from 'next/link';
import { useContext } from 'react';
import AdPlacerContext from '@/context/adPlacerContext';
import { useCreateAds } from '@/hooks/useCreateAds';
import { useState } from 'react';
import { useRef } from 'react';

const LandingPage = () => {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    const landingData = JSON.parse(localStorage.getItem('landingData'));
    setData(landingData);
  }, [data]);

  return (
    <>
      {data && (
        <LandingPageContainer>
          <div className="container">
            <div className="header">
              <h1>{data.productName}</h1>
              <Image src={Del} alt="del" />
            </div>

            <div className="body">
              <div className="ad-banner">
                <div className="ad-type">
                  <div className="head">
                    <UserTagBlue />
                    <h3>Advert Type</h3>
                  </div>
                  <p>{data.type}</p>
                </div>

                <div className="ad-type">
                  <div className="head">
                    <UserTagBlue />
                    <h3>Aim</h3>
                  </div>
                  <p>{data.target} Conversions</p>
                </div>

                <div className="ad-type">
                  <div className="head">
                    <UserTagBlue />
                    <h3>Achieved</h3>
                  </div>
                  <p>{data.conversions} Conversions</p>
                </div>

                <div className="ad-type">
                  <div className="head">
                    <UserTagBlue />
                    <h3>Price</h3>
                  </div>
                  <p>{data.rate}/Conversion</p>
                </div>
              </div>

              <div className="desc">
                <div className="desc-item">
                  <h3>Product Description</h3>
                  <p>{data.description}</p>
                </div>

                {data.images.length > 0 && (
                  <div className="desc-item">
                    <h3>Product Images</h3>
                    {data.images.map((image) => (
                      <Image
                        key={image}
                        src={image}
                        alt=""
                        width={310.77}
                        height={156}
                      />
                    ))}
                  </div>
                )}

                <div className="desc-item">
                  <h3>Conversion Button</h3>
                  <div
                    className="btn"
                    onClick={() => router.push(data.promotedLink)}
                  >
                    {data.CTAButtonDesign}
                  </div>
                </div>

                <div className="desc-item">
                  <h3>Company Web Address</h3>
                  <Link href={data.promotedLink}>
                    <a>{data.promotedLink}</a>
                  </Link>
                </div>

                {/* <div className="desc-item">
                  <h3>Nudity Awareness</h3>
                  <div className="checkbox">
                    <input type="checkbox" />
                    <p>This advert contains adult content</p>
                  </div>
                </div> */}

                <div className="desc-item">
                  <h3>Total Advert Amount</h3>
                  <p>₦{data.budget}</p>
                </div>
              </div>
            </div>
          </div>
        </LandingPageContainer>
      )}
    </>
  );
};

export default LandingPage;
