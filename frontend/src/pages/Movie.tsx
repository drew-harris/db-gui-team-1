import { Box, Group, Image, Title, Text } from "@mantine/core";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import { getAverageRating } from "../api/ratings";
import { getReviewsForMovie } from "../api/reviews";
import Review from "../components/reviews/Review";

export const MoviePage = () => {
  const initialMovies = useLoaderData() as Movie;
  const { id } = useParams();

  const { data: movie } = useQuery(
    ["movie", { id: initialMovies.id }],
    () => getMovieById(id),
    {
      initialData: initialMovies,
    }
  );

  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { movieId: id }],
    () => getReviewsForMovie(id)
  );

  const { data: average } = useQuery(["average-rating", { movieId: id }], () =>
    getAverageRating(id)
  );

  if (!movie) {
    return null;
  }

  return (
    <>
      <Group mb="lg">
        <Image src={movie.posterImageUrl} width={80}></Image>
        <Box>
          <Title>{movie.title}</Title>
        </Box>
      </Group>

      <Text mb="md">{movie.description}</Text>

      <Title>Ratings</Title>
      {average?.average ? (
        <Text>Average Rating: {average.average}</Text>
      ) : (
        <Text>No ratings yet</Text>
      )}

      <Title order={2} mt="md">
        Reviews
      </Title>
      {reviewsStatus !== "success" && <Text>Loading...</Text>}
      {reviews &&
        reviews.map((review) => <Review review={review} key={review.id} />)}
    </>
  );
};
