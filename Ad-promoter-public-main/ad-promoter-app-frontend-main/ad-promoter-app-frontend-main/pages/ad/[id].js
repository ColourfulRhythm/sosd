/* eslint-disable react-hooks/exhaustive-deps */
// pages/ad/[id].js
import {
  LandingPageContainer,
  RedirectContainer,
} from '@/styles/landingPageStyle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import Bg from '@/public/assets/landing-bg.png';
import sign from '@/public/assets/16 x 16 Favicon.svg';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import axios from 'axios';

const AdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { ref } = router.query;
  const [isAdCountLoading, setIsAdCountLoading] = useState(null);
  const [data, setData] = useState();
  const [token, setToken] = useState('');
  const toast = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleCountClick = async (promotedLink) => {
    setIsAdCountLoading(true);

    try {
      const response = await fetch(
        `https://api.ad-promoter.com/api/v1/ads/conversion/${ref}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.text();

      if (!response.ok) {
        setIsAdCountLoading(false);
        setError(true);
        toast({
          title: error.message,
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left',
        });
        throw new Error(`Failed to fetch data for ad ${id}`);
      }
      if (response.ok) {
        setIsAdCountLoading(false);
        if (
          promotedLink &&
          typeof promotedLink === 'string' &&
          promotedLink.startsWith('https://')
        ) {
          router.push(promotedLink);
        } else if (promotedLink && typeof promotedLink === 'string') {
          router.push(`https://${promotedLink}`);
        }
      }
    } catch (error) {
      setError(true);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `https://api.ad-promoter.com/api/v1/ads/${id}?ref=${ref}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const res = response.data;

        if (res.data.type === 'detail') {
          setData(res.data);
        } else {
          handleCountClick(res.data.promotedLink);
        }
      } else {
        toast({
          title: `Error fetching ad data: ${response.statusText}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        throw new Error(`Failed to fetch data for ad ${id}`);
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 404) {
        toast({
          title: `Advert doesn't exist anymore`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        router.push('/');
      } else {
        toast({
          title: `Error fetching ad data: ${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        setError(true);
      }
    }
  };

  const nextImage = (images) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = (images) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (error) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  return (
    <>
      {data ? (
        <LandingPageContainer image={Bg}>
          <div className="modal">
            <h1>{data.productName}</h1>

            <div className="product-details">
              {data.images.length > 0 && (
                <div className="carousel-container">
                  {data.images.length > 1 && (
                    <div
                      onClick={() => previousImage(data.images)}
                      className="left-arrow"
                      style={{ width: '20px' }}
                    >
                      <BsFillArrowLeftCircleFill />
                    </div>
                  )}

                  <div className="img-container">
                    <Image
                      src={data.images[currentIndex]}
                      alt="product image"
                      width={456.223}
                      height={229.013}
                      priority
                      style={{ borderRadius: '21.639px' }}
                    />
                  </div>

                  {data.images.length > 1 && (
                    <div
                      onClick={() => nextImage(data.images)}
                      className="right-arrow"
                      style={{ width: '20px' }}
                    >
                      <BsFillArrowRightCircleFill />
                    </div>
                  )}
                </div>
              )}

              <div className="product-description">
                <h3>Product description:</h3>
                <p>{data.description}</p>
              </div>
            </div>

            <button onClick={() => handleCountClick(data.promotedLink)}>
              {isAdCountLoading ? <Spinner /> : data.cta}
            </button>

            <div className="sign-container">
              <div className="sign">
                <Image src={sign} alt="ad-promototer logo" />
                <p>Powered by AD-Promoter</p>
              </div>
            </div>
          </div>
        </LandingPageContainer>
      ) : (
        <RedirectContainer>
          <p>You are being redirected please kindly wait</p>
          <Spinner />
        </RedirectContainer>
      )}
    </>
  );
};

export default AdPage;
