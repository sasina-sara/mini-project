import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { AuthProvider } from "contexts/AuthContext";
import PrivateRoute from "components/PrivateRoute";
import Dashboard from "pages/Dashboard";
import AddPhoto from "pages/AddPhoto";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/add-photo" component={AddPhoto} />
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;
