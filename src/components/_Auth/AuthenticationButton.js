import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function AuthenticationButton({ className }) {
   const { isAuthenticated } = useAuth0();
   return isAuthenticated ? <LogoutButton className={className} /> : <LoginButton className={className} />;
}
