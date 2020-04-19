import React from "react";
import { Button } from "antd";
import "./App.css";
import Login from "pages/Login";
import Register from "pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import useSession from "hooks/useSession";
import useAuth from "hooks/useAuth";

const App = () => {
  const user = useAuth();
  return (
    // <UserContextProvider>
    //   <MainLayout>
    //     <LoginForm />
    //   </MainLayout>
    // </UserContextProvider>

    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {user ? (
          <>
            <Route path="/dashboard" component={Dashboard} />
          </>
        ) : (
          <Redirect to="/login" />
        )}
        <Route path="/" component={Home} />
        {/* <Login />
        <Register /> */}
      </Switch>
    </Router>
  );
};

export default App;
