import { createContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isNotifClicked, setIsNotifClicked] = useState(false);
  return (
    <NotificationContext.Provider value={{ isNotifClicked, setIsNotifClicked }}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
