import { createContext, useState } from 'react';

const AdPlacerContext = createContext();

export function AdPlacerProvider({ children }) {
  const [advertType, setAdvertType] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [webAddress, setWebAddress] = useState('');
  const [containAdultContent, setContainAdultContent] = useState(false);
  const [amount, setAmount] = useState('');
  const [visitors, setVisitors] = useState('');
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [cta, setCta] = useState('Buy now');
  const [redirectUrl, setRedirectUrl] = useState(
    'https://api.ad-promoter.com/api/v1/ads/verify-payment-hook'
  );
  return (
    <AdPlacerContext.Provider
      value={{
        advertType,
        setAdvertType,
        productName,
        setProductName,
        productDescription,
        setProductDescription,
        tags,
        setTags,
        webAddress,
        setWebAddress,
        containAdultContent,
        setContainAdultContent,
        amount,
        setAmount,
        visitors,
        setVisitors,
        images,
        setImages,
        redirectUrl,
        setRedirectUrl,
        cta,
        setCta,
        imageURLs,
        setImageURLs,
        imageURLs,
        setImageURLs,
      }}
    >
      {children}
    </AdPlacerContext.Provider>
  );
}
export default AdPlacerContext;
