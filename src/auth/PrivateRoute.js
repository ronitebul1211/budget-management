import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loader from '../components/Loader/Loader';

const PrivateRoute = ({ component, ...args }) => (
   <Route
      component={withAuthenticationRequired(component, {
         onRedirecting: () => <Loader />,
      })}
      {...args}
   />
);

export default PrivateRoute;

/**
 * Private Route
 * Wrap the Route component with HOC -> withAuthenticationRequired - Redirecting anonymous user to login page
 */
