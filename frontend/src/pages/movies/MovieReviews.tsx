import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Group, Image, Space, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { getReviewsForMovie } from "../../api/reviews";
import AuthOnly from "../../components/layouts/AuthOnly";
import Review from "../../components/reviews/Review";
import { NewReviewModal } from "../../modals/NewReviewModal";

export const MovieReviewPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: movie } = useQuery(
    ["movie", { id }],
    () => getMovieById(id),
    {}
  );

  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { movieId: id }],
    () => getReviewsForMovie(id)
  );

  if (!movie) {
    return null;
  }

  return (
    <div>
      <Group mb="lg" spacing={40} noWrap align="start">
        <Box
          sx={(theme) => ({
            boxShadow: theme.shadows.xl,
            maxWidth: 200,
            minWidth: 75,
          })}
          onClick={() => navigate("/movie/" + movie.id)}
        >
          <Image radius="md" src={movie.posterImageUrl}></Image>
        </Box>
        <Box style={{ flexShrink: 1 }}>
          <Title size={40}>{movie.title}</Title>
          <Space />
          <Space h="md"></Space>
          <AuthOnly>
            <Button
              variant="light"
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() =>
                openModal({
                  title: "Leave A Review",
                  children: <NewReviewModal movieId={id} />,
                  size: "xl",
                })
              }
            >
              Leave A Review
            </Button>
          </AuthOnly>
        </Box>
      </Group>

      <Title order={2} mt="md">
        Reviews
      </Title>

      {reviewsStatus !== "success" && <Text>Loading...</Text>}
      {reviews &&
        reviews.map((review) => <Review review={review} key={review.id} />)}
    </div>
  );
};
