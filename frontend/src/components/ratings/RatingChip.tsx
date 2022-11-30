import { Avatar, Group, Paper, Rating, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const RatingChip = ({ rating, showUser = false }) => {
  return (
    <Paper p="sm" shadow="xs">
      <Group>
        {showUser && (
          <Group>
            <Avatar radius="xl" src={rating.by.profileImageUrl} />
            <Text component={Link} to={"/profile/" + rating.by.id}>
              {rating.by.username}
            </Text>
          </Group>
        )}
        <Rating value={rating.score} size="xs" readOnly></Rating>
      </Group>
    </Paper>
  );
};
