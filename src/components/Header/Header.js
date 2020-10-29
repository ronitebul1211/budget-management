import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
   return (
      <div className="header">
         <Link className="header__link" to="/">
            דף הבית
         </Link>
         <Link className="header__link" to="/current_month">
            תקציב חודשי
         </Link>
         <Link className="header__link" to="/statistics">
            נתונים וסטטיסטיקה
         </Link>
      </div>
   );
};

export default Header;
