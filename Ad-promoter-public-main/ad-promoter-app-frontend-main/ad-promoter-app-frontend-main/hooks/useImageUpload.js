import axios from '@/pages/api/axios';
import { useEffect, useState } from 'react';

export const useImageUpload = () => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('token'));
    if (userToken) {
      setToken(userToken.token);
    }
  }, []);

  const imageUpload = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/fileUpload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const json = response.data;

      if (response.status === 200) {
        console.log(json);
        console.log('Image uploaded');
      } else {
        console.log(json);
        console.log('Image not uploaded');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
      // Handle errors here if needed.
    }
  };

  return { imageUpload, isLoading, error, msg };
};
