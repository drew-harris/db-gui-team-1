import { Avatar, Group, Paper, Text } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { Link } from "react-router-dom";
import { ReviewWithUser } from "../../types";
import { RatingChip } from "../ratings/RatingChip";
import MovieInfo from "./MoiveInfo";

const Review = ({
  review,
  showUser = true,
}: {
  review: ReviewWithUser;
  showUser?: boolean;
}) => {
  return (
    <Paper radius="md" withBorder p="md" m="md">
      <Group mb="sm" position="apart" align="center">
        {showUser ? (
          <Group spacing={4}>
            <Avatar radius="xl" />
            <Text
              component={Link}
              to={"/profile/" + review.by.id}
              weight="bold"
            >
              {review.by.username}
            </Text>
          </Group>
        ) : (
          <div>
            <MovieInfo id={review.movieId} />
          </div>
        )}
        <Group px="lg">
          <p>rating chip</p>
          <Text size="sm">
            {new Date(review.submittedAt).toLocaleString("en-US")}
          </Text>
        </Group>
      </Group>

      <RichTextEditor readOnly value={review.content} />
    </Paper>
  );
};

export default Review;
