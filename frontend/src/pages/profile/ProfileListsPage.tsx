import { Box, Title, Text, Group, Button } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getListsByUserId } from "../../api/lists";
import { getUserInfo } from "../../api/userInfo";
import { AuthContext } from "../../context/AuthContext";
import { NewListModal } from "../../modals/NewListModal";

export const ProfileListsPage = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const { data: lists } = useQuery(["lists", { userId: id }], () =>
    getListsByUserId(id)
  );
  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery(["user", { id }], () => getUserInfo(id));

  const isCurrentUser = currentUser?.id === id;

  if (!userInfo || !lists) {
    return null;
  }

  return (
    <Box>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Group position="apart">
        <Title>{userInfo.user.username}&apos;s Lists</Title>
        {isCurrentUser && (
          <Button
            onClick={() => {
              openModal({
                title: "New List",
                children: <NewListModal />,
              });
            }}
          >
            New List
          </Button>
        )}
      </Group>
      <Box>{JSON.stringify(lists)}</Box>
    </Box>
  );
};
