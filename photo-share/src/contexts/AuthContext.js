import React, { createContext, useState, useEffect } from "react";
import app from "../base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => app.auth().currentUser);

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(setCurrentUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
