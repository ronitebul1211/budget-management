import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

class PrivateRoute extends React.Component {
   render() {
      return (
         <Route
            component={withAuthenticationRequired(this.props.component, {
               onRedirecting: () => <div>מעבר להתחברות</div>,
               returnTo: () => this.props.location.pathname,
            })}
            {...this.props.args}
         />
      );
   }
}

export default PrivateRoute;
