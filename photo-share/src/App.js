import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { AuthProvider } from "contexts/AuthContext";
import PrivateRoute from "components/PrivateRoute";
import Dashboard from "pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;
