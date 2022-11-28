import {
  Avatar,
  Box,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchUsers } from "../../api/userInfo";

export const ProfileSearchPage = () => {
  const isMobile = useMediaQuery("(max-width: 900px)", false);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const { data: users } = useQuery(
    ["user-search", { query: debouncedQuery }],
    () => searchUsers(query)
  );
  return (
    <Box>
      <TextInput
        placeholder="Search Users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></TextInput>
      <SimpleGrid mt="md" cols={isMobile ? 1 : 4}>
        {users?.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const User = ({ user }) => {
  return (
    <Paper
      component={Link}
      to={"/profile/" + user.id}
      sx={{ overflow: "hidden" }}
      p="sm"
    >
      <Group noWrap sx={{ overflow: "hidden" }}>
        <Avatar radius="xl" size="md" src={user.profileImageUrl} />
        <Text sx={{ textOverflow: "ellipsis" }} lineClamp={1}>
          {user.username}
        </Text>
      </Group>
    </Paper>
  );
};
