import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (!userToken) {
      router.push('/login');
    }
    if (userToken) {
      router.push('/overview');
    }
  
  }, []);



  
};

export default Home;
