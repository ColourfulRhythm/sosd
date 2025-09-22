import { useEffect, useRef, useState } from 'react';
import styled, { keyframes }  from 'styled-components';
import { FiTwitter, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import axios from '@/pages/api/axios';

const ShareButton = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ShareDialogueContainer = styled.div`
  position: absolute;
  bottom: 10%;
  right: 2%;
  width: 50%;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-in-out;

 @media (max-width: 768px) {
    bottom: 25%;
 }  
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Icon = styled.div`
  margin-right: 1rem;
`;

const ShareDialogueContent = styled.div``;

const ShareDialogue = ({id}) => {
  // const shareLink = window.location.href;
  const router = useRouter();
  const token = useRef()
  const toast = useToast()

  useEffect(() => {
  const userToken = JSON.parse(localStorage.getItem("user-token"));
  if (userToken) {
    token.current = userToken
  }
}, []);

const shareLink = async (socialMedia) => {
  try {
    const response = await axios.get(`/api/v1/promotion/promote/${id}`, {
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
    });

    const data = response.data;

    if (!response.status === 200 || !data.success) {
      throw new Error(data.msg);
    }

    const shareLink = `https://app.ad-promoter.com/ad/${id}?ref=${data.promotionRef}`;

    let shareUrl;

    switch (socialMedia) {
      case 'twitter':
        shareUrl = `https://twitter.com/share?url=${encodeURIComponent(shareLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `whatsapp://send?text=${encodeURIComponent(shareLink)}`;
        break;
      default:
        throw new Error('Invalid social media platform');
    }

    window.open(shareUrl, '_blank');
    toast({
      title: 'Sharing Link!',
      status: "success",
      duration: "5000",
      isClosable: true,
      position: "bottom-left",
      size: "lg",
    });
  } catch (error) {
    toast({
      title: `Failed to share link: ${error.message}`,
      status: "error",
      duration: "5000",
      isClosable: true,
      position: "bottom-left",
      size: "lg",
    });
  }
};

const shareToTwitter = () => shareLink('twitter');
const shareToFacebook = () => shareLink('facebook');
const shareToWhatsApp = () => shareLink('whatsapp');

  return (
    <>
      {/* <ShareButton>Share</ShareButton> */}
      <ShareDialogueContainer>
        <ShareDialogueContent>
          <SocialIcon>
            <Icon>
              <FiTwitter size={20} />
            </Icon>
            <button onClick={shareToTwitter}>Share on Twitter</button>
          </SocialIcon>
          <SocialIcon>
            <Icon>
              <FiFacebook size={20} />
            </Icon>
            <button onClick={shareToFacebook}>Share on Facebook</button>
          </SocialIcon>
          <SocialIcon>
            <Icon>
              <FaWhatsapp size={20} />
            </Icon>
            <button onClick={shareToWhatsApp}>Share on Whatsapp</button>
          </SocialIcon>
        </ShareDialogueContent>
      </ShareDialogueContainer>
    </>
  );
};

export default ShareDialogue;
