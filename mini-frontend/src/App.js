import React from "react";
import { Button } from "antd";
import "./App.css";
import LoginForm from "components/LoginForm";
import MainLayout from "layouts/MainLayout";
import UserContextProvider from "contexts/UserContext";
import Login from "pages/Login";
import { Register } from "pages/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home";

const App = () => {
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
        <Route path="/" component={Home} />
        {/* <Login />
        <Register /> */}
      </Switch>
    </Router>
  );
};

export default App;
