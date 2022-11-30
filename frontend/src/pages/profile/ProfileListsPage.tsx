import { Box, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getListsByUserId } from "../../api/lists";
import { getUserInfo } from "../../api/userInfo";
import ListLink from "../../components/lists/ListLink";
import { AuthContext } from "../../context/AuthContext";
import { useUsername } from "../../hooks/useUsername";
import { NewListModal } from "../../modals/NewListModal";

export const ProfileListsPage = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const { data: lists } = useQuery(["lists", { userId: id }], () =>
    getListsByUserId(id)
  );

  const username = useUsername(id);

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
      <Group position="apart" pb="md">
        <Title size={25}>
          {userInfo.user.id === currentUser?.id
            ? "Your Lists"
            : username + "'s Lists"}
        </Title>
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
      <Stack>
        {lists?.length === 0 && <Center>This user has no lists</Center>}
        {lists.map((list) => (
          <ListLink key={list.id} list={list} />
        ))}
      </Stack>
    </Box>
  );
};
