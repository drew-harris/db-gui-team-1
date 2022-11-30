import { Avatar, Group, Paper, Text } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { Link } from "react-router-dom";
import { time_ago } from "../../utils/time";

export const RecentReviewCard = ({ review }) => {
  return (
    <Paper p="sm">
      <Group mb="md" position="apart">
        <Text
          component={Link}
          weight="bold"
          to={"/movie/" + review.for.id}
          size="lg"
        >
          {review.for.title}
        </Text>
        <Group align="start">
          <Avatar
            radius="xl"
            size="sm"
            src={review.by.profileImageUrl}
          ></Avatar>
          <Text component={Link} to={"/profile/" + review.by.id}>
            {review.by.username}
          </Text>
          <Text size="sm" color="dimmed">
            {time_ago(new Date(review.submittedAt))}
          </Text>
        </Group>
      </Group>
      <RichTextEditor readOnly value={review.content} />
    </Paper>
  );
};
