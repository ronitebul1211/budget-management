import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

//FIXME: add prop types + refactor by conventions.txt

const Navbar = () => {
   return (
      <div className="navbar">
         <Link className="navbar__link" to="/">
            דף הבית
         </Link>
         <Link className="navbar__link" to="/current_month">
            תקציב חודשי
         </Link>
         <Link className="navbar__link" to="/statistics">
            נתונים וסטטיסטיקה
         </Link>
         <Link className="navbar__link" to="/sign-in">
            התחברות
         </Link>
      </div>
   );
};

export default Navbar;
