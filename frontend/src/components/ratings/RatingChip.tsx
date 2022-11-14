import { Box, Group, Paper, Rating, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const RatingChip = ({ rating, showUser = false }) => {
  return (
    <Paper p="sm">
      <Group>
        {showUser && (
          <Text component={Link} to={"/profile/" + rating.by.id}>
            {rating.by.username}
          </Text>
        )}
        <Rating value={rating.score} size="xs" readOnly></Rating>
      </Group>
    </Paper>
  );
};
