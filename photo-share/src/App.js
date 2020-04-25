import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
// import { AuthProvider } from "contexts/AuthContext";
// import PrivateRoute from "components/PrivateRoute";
import Dashboard from "pages/Dashboard";
import AddPhoto from "pages/AddPhoto";
import useFirebase from "hooks/useFirebase";
import PrivateRoute from "hoc/PrivateRoute";

const App = () => {
  const { initializing } = useFirebase();

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/add-photo">
          <AddPhoto />
        </PrivateRoute>
      </>
    </Router>
  );
};

export default App;
