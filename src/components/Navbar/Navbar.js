import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '../_Auth/AuthenticationButton';
import './Navbar.css';

export default function Navbar() {
   const { isAuthenticated } = useAuth0();

   return (
      <div className="navbar">
         <Link className="navbar__link" to="/">
            דף הבית
         </Link>
         {isAuthenticated ? (
            <React.Fragment>
               <Link className="navbar__link" to="/current-month">
                  תקציב חודשי
               </Link>
               <Link className="navbar__link" to="/statistics">
                  נתונים וסטטיסטיקה
               </Link>
            </React.Fragment>
         ) : null}
         <AuthenticationButton />
      </div>
   );
}
