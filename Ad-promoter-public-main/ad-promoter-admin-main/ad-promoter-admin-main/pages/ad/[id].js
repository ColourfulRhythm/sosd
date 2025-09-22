/* eslint-disable react-hooks/exhaustive-deps */
import { SingleAdContainer } from '@/styles/singleAd';
import React from 'react';
import UserTagBlue from '@/public/assets/user-tag-blue';
import Back from '@/public/assets/back.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx';
import axios from 'axios';
import toast, { useToaster } from 'react-hot-toast';

const SingleAd = () => {
  const router = useRouter();
  const { id } = router.query;
  const [adData, setAdData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchAd = async () => {
        try {
          const response = await axios.get(
            `https://api.ad-promoter.com/api/v1/ads/${id}`
          );
          const data = response.data.data;
          setAdData(data);
        } catch (error) {
          console.error(error);
          toast.error('Unable to fetch Data');
        }
      };
      fetchAd();
    }
  }, [id]);

  if (!adData) {
    return <PageLoader />;
  }

  return (
    <>
      <SingleAdContainer>
        <div className="white-container">
          <div className="back" onClick={() => router.back()}>
            <Image src={Back} alt="back arrow" />
          </div>
          <h3>{adData.productName}</h3>
          <div className="white-container-body">
            <div className="dashboard">
              <div className="ad-type">
                <div className="head">
                  <UserTagBlue />
                  <h3>Advert Type</h3>
                </div>
                <p>{adData.type}</p>
              </div>

              <div className="ad-type">
                <div className="head">
                  <UserTagBlue />
                  <h3>Aim</h3>
                </div>
                {adData.type === 'detail' ? (
                  <p>{adData.target} Conversions</p>
                ) : adData.type === 'direct-link' ? (
                  <p>{adData.target} Visitors</p>
                ) : (
                  <p>{adData.target} Videos</p>
                )}
              </div>

              <div className="ad-type">
                <div className="head">
                  <UserTagBlue />
                  <h3>Achieved</h3>
                </div>
                {adData.type === 'detail' ? (
                  <p>{adData.achieved} Conversions</p>
                ) : adData.type === 'direct-link' ? (
                  <p>{adData.achieved} Visitors</p>
                ) : (
                  <p>{adData.achieved} Videos</p>
                )}
              </div>

              <div className="ad-type">
                <div className="head">
                  <UserTagBlue />
                  <h3>Price</h3>
                </div>
                {adData.type === 'detail' ? (
                  <p>#{adData.rate}/Conversion</p>
                ) : adData.type === 'direct-link' ? (
                  <p>#{adData.rate}/Visitor</p>
                ) : (
                  <p>#{adData.rate}/Video</p>
                )}
              </div>
            </div>

            <div className="desc">
              <div className="desc-item">
                <h3>Product Description</h3>
                <p>{adData.description}</p>
              </div>

              {adData.images?.length > 0 && (
                <div className="desc-item">
                  <h3>Product Images</h3>
                  {adData.images.map((image) => (
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

              {adData.CTAButtonDesign && (
                <div className="desc-item">
                  <h3>Conversion Button</h3>
                  <div className="btn">{adData.CTAButtonDesign}</div>
                </div>
              )}

              <div className="desc-item">
                <h3>Company Web Address</h3>
                <Link href={adData.promotedLink ? adData.promotedLink : ''}>
                  <a>{adData.promotedLink}</a>
                </Link>
              </div>

              <div className="desc-item">
                <h3>Total Advert Amount</h3>
                <p>₦{adData.budget}</p>
              </div>
            </div>
          </div>
        </div>
      </SingleAdContainer>
    </>
  );
};

export default SingleAd;
