import { Box, Group, Image, Title, Text } from "@mantine/core";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
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

  if (!movie) {
    return null;
  }

  return (
    <>
      <Group mb="lg">
        <Image src={movie.posterImageUrl} width={80}></Image>
        <Box>
          <Title>{movie.title}</Title>
          <Text>{movie.description}</Text>
        </Box>
      </Group>

      <Title order={2}>Reviews</Title>
      {reviewsStatus !== "success" && <Text>Loading...</Text>}
      {reviews &&
        reviews.map((review) => <Review review={review} key={review.id} />)}
    </>
  );
};
