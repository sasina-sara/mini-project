import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
// import { AuthProvider } from "contexts/AuthContext";
// import PrivateRoute from "components/PrivateRoute";
import Overview from "pages/Overview";
import AddPhoto from "pages/AddPhoto";
import useFirebase from "hooks/useFirebase";
import PrivateRoute from "hoc/PrivateRoute";
import Dashboard from "pages/Dashboard";

const App = () => {
  const { initializing } = useFirebase();

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/overview">
            <Overview />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/add-photo">
            <AddPhoto />
          </PrivateRoute>
        </Switch>
      </>
    </Router>
  );
};

export default App;
