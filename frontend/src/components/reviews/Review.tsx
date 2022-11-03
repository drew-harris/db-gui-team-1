import { Group, Paper, Text } from "@mantine/core";
import { ReviewWithUser } from "../../types";

const Review = ({
  review,
  showUser = true,
}: {
  review: ReviewWithUser;
  showUser?: boolean;
}) => {
  return (
    <Paper p="md" m="md">
      {showUser && (
        <Group mb="sm" position="apart" align="baseline">
          <Text weight="bold">{review.by.username}</Text>
          <Text size="sm">{new Date(review.submittedAt).toLocaleString()}</Text>
        </Group>
      )}
      <Text>{review.content}</Text>
    </Paper>
  );
};

export default Review;
