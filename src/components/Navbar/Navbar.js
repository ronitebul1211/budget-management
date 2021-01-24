import React, { Fragment } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import text from '../../translations/he';
import AuthenticationButton from '../_Auth/AuthenticationButton';
import './Navbar.css';

export default function Navbar() {
   const { isAuthenticated } = useAuth0();

   return (
      <div className="navbar">
         <div className="navbar__options">
            <Link className="navbar__link" to="/">
               {text.navbar.homepageLink}
            </Link>
            {isAuthenticated && <PrivateLink />}
         </div>
         <AuthenticationButton className="navbar__link" />
      </div>
   );
}

function PrivateLink() {
   return (
      <Fragment>
         <Link className="navbar__link" to="/current-month">
            {text.navbar.currentMonthLink}
         </Link>
         <Link className="navbar__link" to="/statistics">
            {text.navbar.statisticsLink}
         </Link>
      </Fragment>
   );
}
