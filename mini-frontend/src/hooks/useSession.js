import React, { useContext } from "react";
import { UserContext } from "contexts/UserContext";

const useSession = () => {
  const { user } = useContext(UserContext);
  return user;
};

export default useSession;
