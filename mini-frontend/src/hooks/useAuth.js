import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      setTimeout(() => {
        setInitializing(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (!initializing) {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        setUser(user);
      });
      return () => unsubscribe();
    }
  }, [initializing]);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return {
    initializing,
    user
  };
};

export default useAuth;
