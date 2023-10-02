// PrivateRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean; // Add a prop to check authentication
  redirectTo: string; // Add a prop to specify the redirect URL
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectTo,
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
