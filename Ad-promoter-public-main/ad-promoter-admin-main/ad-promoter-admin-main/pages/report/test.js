import UseFetch from '@/hooks/useFetch';
import { useEffect, useState } from 'react';

const Test = () => {
  const [token, setToken] = useState(null);
  const [tokenAvailale, setTokenAvailable] = useState(false);
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
      console.log(userToken.token);
    }
  }, []);
  const id = '6406127291ab8707c5fe72d5';
  const {
    data: responseData,
    pending,
    error,
  } = UseFetch(
    token,
    tokenAvailale,
    `https://api.ad-promoter.com/api/v1/reports/adReports/${id}`
  );

  let reportData = responseData;
  console.log(reportData);
  return (
    <div className="report_details">
      <h1>hello</h1>
    </div>
  );
};

export default Test;
