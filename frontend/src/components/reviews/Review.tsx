import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Avatar, Group, Paper, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import RichTextEditor from "@mantine/rte";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { deleteReview } from "../../api/reviews";
import { AuthContext } from "../../context/AuthContext";
import { ReviewWithUser } from "../../types";
import { time_ago } from "../../utils/time";
import MovieInfo from "./MovieInfo";

const Review = ({
  review,
  showUser = true,
}: {
  review: ReviewWithUser;
  showUser?: boolean;
}) => {
  const client = useQueryClient();
  const { user } = useContext(AuthContext);

  const deleteReviewMutation = useMutation({
    mutationFn: async () => {
      await deleteReview(review.id);
    },
    onSuccess: () => {
      console.log("onsuccess");
      client.invalidateQueries(["reviews", { movieId: review.movieId }]);
    },
  });

  const promptDeleteReview = () => {
    openConfirmModal({
      title: "Are you sure you want to delete your review?",
      labels: {
        confirm: "Delete Review",
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },

      onConfirm: () => {
        deleteReviewMutation.mutate();
      },
    });
  };

  return (
    <Paper radius="md" withBorder p="md" m="md">
      <Group mb="sm" position="apart" align="start">
        {showUser ? (
          <Group spacing={4}>
            <Avatar src={review.by.profileImageUrl} radius="xl" />
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
        <Group>
          <Text size="sm">{time_ago(new Date(review.submittedAt))}</Text>
          {review.by.id === user?.id && (
            <ActionIcon
              loading={deleteReviewMutation.isLoading}
              onClick={promptDeleteReview}
              color="red"
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </ActionIcon>
          )}
        </Group>
      </Group>
      <RichTextEditor readOnly value={review.content} />
    </Paper>
  );
};

export default Review;
