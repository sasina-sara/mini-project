import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "config/firebase";

export const FirebaseContext = createContext();
export const FirebaseAuthContext = createContext();

const FirebaseContextProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  if (initializing) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    setInitializing(false);
  }

  useEffect(() => {
    if (!initializing) {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        setUser(user);

        if (!userLoaded) {
          setUserLoaded(true);
        }
      });
      return unsubscribe;
    }
  }, [initializing]);

  return (
    <FirebaseContext.Provider value={{ initializing }}>
      <FirebaseAuthContext.Provider value={{ user, userLoaded }}>
        {children}
      </FirebaseAuthContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
