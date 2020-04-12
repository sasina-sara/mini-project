import React, { createContext } from "react";
import useAuth from "hooks/useAuth";
import Loading from "components/Loading";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { initializing, user } = useAuth();

  if (initializing) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
