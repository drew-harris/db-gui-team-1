import { Button, Group, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserInfo } from "../../api/userInfo";
import { AuthContext } from "../../context/AuthContext";

// Main account page
function MainProfilePage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery(["user", { id }], () => getUserInfo(id));

  if (!userInfo || isLoading || error) {
    return null;
  }

  const isCurrentUser = user?.id === userInfo?.user?.id;

  return (
    <>
      <Group align="center" position="apart">
        <Title>{userInfo.user.username}</Title>
        {isCurrentUser && (
          <Button component={Link} to="/profile/edit">
            Profile Settings
          </Button>
        )}
      </Group>
      <Text mb={"xl"}>{userInfo.user.email}</Text>
      {userInfo && <Text mb="lg">{userInfo.user.bio}</Text>}
      {JSON.stringify(userInfo, null, 4)}
    </>
  );
}

export default MainProfilePage;
