import { Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../api/userInfo";

// Main account page
function MainProfilePage() {
  const { id } = useParams();
  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery(["user", { id }], () => getUserInfo(id));

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

export default MainProfilePage;
