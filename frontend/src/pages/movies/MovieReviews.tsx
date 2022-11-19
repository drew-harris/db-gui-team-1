import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Group,
  Space,
  Title,
  Image,
  Button,
  MultiSelect,
  Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { getReviewsForMovie } from "../../api/reviews";
import { DataSquare } from "../../components/DataSquare";
import AuthOnly from "../../components/layouts/AuthOnly";
import { MovieRatingInput } from "../../components/ratings/MovieRatingInput";
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
          })}
          onClick={() => navigate("/movie/" + movie.id)}
        >
          <Image radius="md" src={movie.posterImageUrl}></Image>
        </Box>
        <Box style={{ flexShrink: 1 }}>
          <Title size={75}>{movie.title}</Title>
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
