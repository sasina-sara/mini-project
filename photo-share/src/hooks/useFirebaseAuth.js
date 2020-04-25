import { useContext } from "react";
import { FirebaseAuthContext } from "contexts/FirebaseContext";

const useFirebaseAuth = () => {
  return useContext(FirebaseAuthContext);
};

export default useFirebaseAuth;
