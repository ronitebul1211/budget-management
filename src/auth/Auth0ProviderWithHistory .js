import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const Auth0ProviderWithHistory = ({ children }) => {
   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

   const history = useHistory();

   function onRedirectCallback(appState) {
      history.push(appState?.returnTo || '/current-month'); // ||window.location.pathname
   }

   return (
      <Auth0Provider
         domain={domain}
         clientId={clientId}
         redirectUri={window.location.origin}
         onRedirectCallback={onRedirectCallback}>
         {children}
      </Auth0Provider>
   );
};

export default Auth0ProviderWithHistory;
/**
 * Auth0ProviderWithHistory
 * extend Auth0Provider (contain auth0 context interface)
 * in order to use history hook and redirect the user to the last url he visited
 * before he redirect to login page.
 *
 * This component wrap the whole app (Context API)
 * in component in all levels can consume auth state
 *
 */
