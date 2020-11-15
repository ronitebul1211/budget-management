import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";

class ProtectedRoute extends React.Component {
   render() {
      return (
         <Route
            component={withAuthenticationRequired(this.props.component, {
               onRedirecting: () => {
                  const { isAuthenticated, logout, loginWithRedirect } = this.props.auth0;
                  isAuthenticated ? logout() : loginWithRedirect({});
               },
            })}
            {...this.props.args}
         />
      );
   }
}

export default withAuth0(ProtectedRoute);
