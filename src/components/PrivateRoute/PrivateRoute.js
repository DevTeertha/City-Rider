import React, { useContext } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import { contextAPI } from "../../App";

function PrivateRoute({ children, ...rest }) {
    const [user] = useContext(contextAPI);
    const { email } = user;
    return (
      <Route
        {...rest}
        render={({ location }) =>
        email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;