import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import text from '../../translations/he';

export default function LoginButton({ className }) {
   const { loginWithRedirect } = useAuth0();

   return (
      <button className={className} onClick={() => loginWithRedirect({ ui_locales: 'he' })}>
         {text.auth.loginButton}
      </button>
   );
}
