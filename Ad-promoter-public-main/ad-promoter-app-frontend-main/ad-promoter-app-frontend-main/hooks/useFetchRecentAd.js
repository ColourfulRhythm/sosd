import JobsContext from '@/context/jobsContext';
import axios from '@/pages/api/axios';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';

const useFetchRecentAd = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { setRecentJobs } = useContext(JobsContext);
  const toast = useToast();
  const fetchRecentJobs = async () => {
    try {
      setIsLoading(true);

      let apiUrl = '/api/v1/ads/recent-ads?page=1&pageSize=10';

      if (sortStartDate) {
        apiUrl += `&startDate=${sortStartDate}`;
      }

      if (sortEndDate) {
        apiUrl += `&endDate=${sortEndDate}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });

      setRecentJobs(response.data.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recent jobs:', error);
      toast({
        title: `Unable to fetch recent jobs:${error.message}`,
        status: 'error',
        duration: '5000',
        isClosable: true,
        position: 'bottom-left',
        size: 'lg',
      });
    }
  };
  return { isLoading, fetchRecentJobs };
};

export default useFetchRecentAd;
