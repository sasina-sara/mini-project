import React from "react";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, userLoaded } = useFirebaseAuth();

  if (!userLoaded) {
    return <div>User Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
