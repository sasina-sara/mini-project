import React from "react";
import { Button } from "antd";
import "./App.css";
import LoginForm from "components/LoginForm";
import MainLayout from "layouts/MainLayout";

const App = () => {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
};

export default App;
