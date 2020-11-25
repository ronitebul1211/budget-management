import { withAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

//FIXME: add prop types + refactor by conventions.txt

class Navbar extends React.Component {
   handleAuthEvent = () => {
      const { isAuthenticated, logout, loginWithRedirect } = this.props.auth0;
      isAuthenticated ? logout() : loginWithRedirect({});
   };

   render() {
      const { isAuthenticated } = this.props.auth0;
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
            <button className="navbar__link" onClick={this.handleAuthEvent}>
               {isAuthenticated ? "התנתק" : "התחבר"}
            </button>
         </div>
      );
   }
}

// Wrap class component in high order component that five it access to auth0context (e.g  line 7)
export default withAuth0(Navbar);
