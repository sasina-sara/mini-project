import React from "react";
import { Button } from "antd";
import "./App.css";
import LoginForm from "components/LoginForm";
import MainLayout from "layouts/MainLayout";
import UserContextProvider from "contexts/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <MainLayout>
        <LoginForm />
      </MainLayout>
    </UserContextProvider>
  );
};

export default App;
