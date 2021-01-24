import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import text from '../../translations/he';

export default function LoginButton(props) {
   const { loginWithRedirect } = useAuth0();

   return (
      <button {...props} onClick={() => loginWithRedirect()}>
         {text.auth.loginButton}
      </button>
   );
}
