import { Group, Paper, Text } from "@mantine/core";

export const ListLink = ({ list, showUserName = false }) => {
  return (
    <Paper p="sm">
      <Group position="apart">
        {showUserName && <Text weight="bold">{list.name}</Text>}
        <Text>{list._count.movies} Movies</Text>
      </Group>
    </Paper>
  );
};

export default ListLink;
