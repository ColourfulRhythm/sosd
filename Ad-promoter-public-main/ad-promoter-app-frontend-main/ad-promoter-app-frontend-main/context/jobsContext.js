import { createContext, useState } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <JobsContext.Provider
      value={{
        savedJobs,
        setSavedJobs,
        recentJobs,
        setRecentJobs,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};
export default JobsContext;
