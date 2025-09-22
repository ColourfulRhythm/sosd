import { useEffect, useState } from 'react';

const UseFetch = (token, tokenAvailale, api) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: 'Get',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('fetching');
        const json = await response.json();
        const data = json;
        console.log(data);
        setData(data.data);
        setPending(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setPending(false);
      }
    };
    if (tokenAvailale) {
      fetchData();
    }
  }, [api, token, tokenAvailale]);
  return { data, pending, error };
};

export default UseFetch;
