import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component, ...args }) => (
   <Route
      component={withAuthenticationRequired(component, {
         onRedirecting: () => <div>LOADER ANIMATION</div>,
      })}
      {...args}
   />
);

export default PrivateRoute;

/**
 * Private Route
 * Wrap the Route component with HOC -> withAuthenticationRequired - Redirecting anonymous user to login page
 */
