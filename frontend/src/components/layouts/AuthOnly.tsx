import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AuthOnly = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user?.id) {
    return null;
  }
  return <>{children}</>;
};

export default AuthOnly;
