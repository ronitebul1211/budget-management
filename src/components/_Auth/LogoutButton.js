import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import text from '../../translations/he';

export default function LogoutButton(props) {
   const { logout } = useAuth0();

   return (
      <button
         {...props}
         onClick={() =>
            logout({
               returnTo: window.location.origin,
            })
         }>
         {text.auth.logoutButton}
      </button>
   );
}
