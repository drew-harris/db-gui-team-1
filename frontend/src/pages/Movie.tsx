import {
  Box,
  Button,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import { getAverageRating } from "../api/ratings";
import { getReviewsForMovie } from "../api/reviews";
import AuthOnly from "../components/layouts/AuthOnly";
import { MovieRatingInput } from "../components/ratings/MovieRatingInput";
import Review from "../components/reviews/Review";
import { NewReviewModal } from "../modals/NewReviewModal";

export const MoviePage = () => {
  const { id } = useParams();

  const { data: movie } = useQuery(
    ["movie", { id }],
    () => getMovieById(id),
    {}
  );

  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { movieId: id }],
    () => getReviewsForMovie(id)
  );

  const { data: ratingStats } = useQuery(
    ["average-rating", { movieId: id }],
    () => getAverageRating(id)
  );

  if (!movie) {
    return null;
  }

  const releaseDate = new Date(movie.releaseDate);

  return (
    <>
      <Group mb="lg" spacing={40} noWrap align="start">
        <Box
          sx={(theme) => ({
            boxShadow: theme.shadows.xl,
            maxWidth: 200,
          })}
        >
          <Image radius="md" src={movie.posterImageUrl}></Image>
        </Box>
        <Box style={{ flexShrink: 1 }}>
          <Title size={40}>{movie.title}</Title>
          <Text mb="md">{movie.description}</Text>
          <Space />
          <Group>
            <DataSquare label="Genre" value={movie.genre} />
            <DataSquare label="Runtime" value={movie.runTime + " mins."} />
            <DataSquare label="Released" value={releaseDate.getFullYear()} />
            <DataSquare
              label="Rating"
              value={ratingStats?.average.toFixed(2)}
            />
            <DataSquare label="Reviews" value={reviews?.length} />
          </Group>
        </Box>
      </Group>

      <AuthOnly>
        <Text mt="lg">Leave A Rating</Text>
        <MovieRatingInput movieId={id} />
      </AuthOnly>

      <Group position="apart" align={"center"}>
        <Title order={2} mt="md">
          Reviews
        </Title>

        <AuthOnly>
          <Button
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
      </Group>
      {reviewsStatus !== "success" && <Text>Loading...</Text>}
      {reviews &&
        reviews.map((review) => <Review review={review} key={review.id} />)}
    </>
  );
};

const DataSquare = ({ label, value, lowerLabel = null }) => {
  return (
    <Paper radius="md" withBorder py="sm" px="md">
      <Stack align="center" spacing={0}>
        <Text size="lg" weight="bold">
          {label}
        </Text>
        <Text>{value}</Text>
        <Text>{lowerLabel}</Text>
      </Stack>
    </Paper>
  );
};
