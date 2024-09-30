import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const lastPath = localStorage.getItem('currentPath');
    if (lastPath !== currentPath) {
      localStorage.setItem('lastPath', lastPath);
      localStorage.setItem('currentPath', currentPath);
    }
  }, [location]);

  return <>{children}</>;
};

export default RouteTracker;
