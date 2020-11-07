import React from "react";
import "./AuthPage.css";
//Components
import AuthForm from "../../components/_Auth/AuthForm";
//FIXME: add prop types + refactor by conventions.txt

class AuthPage extends React.Component {
   render() {
      return (
         <div>
            <AuthForm mode={"sign-in"} />
         </div>
      );
   }
}

export default AuthPage;
