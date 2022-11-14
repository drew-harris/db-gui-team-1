import { Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const EditProfilePage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const signOut = () => {
    window.localStorage.setItem("jwt", null);
    window.localStorage.setItem("user", null);
    setUser(null);
    navigate("/");
  };
  return (
    <div>
      <div>Edit profile</div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};
