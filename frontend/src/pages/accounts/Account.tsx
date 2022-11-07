import { Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../api/userInfo";
import { AuthContext } from "../../context/AuthContext";

function LoginOrSignup() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <div> or </div>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

function AccountInfo({ userId }) {
  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery(["user", { id: userId }], () => getUserInfo(userId));

  if (!userInfo || isLoading || error) {
    return null;
  }

  return (
    <>
      <Title>{userInfo.user.username}</Title>
      <Text mb={"xl"}>{userInfo.user.email}</Text>
      {JSON.stringify(userInfo, null, 4)}
    </>
  );
}

export default function Account() {
  const { user } = useContext(AuthContext);
  return (
    <div>{user?.id ? <AccountInfo userId={user.id} /> : <LoginOrSignup />}</div>
  );
}
