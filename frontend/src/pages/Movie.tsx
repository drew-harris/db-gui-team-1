import { Box, Button, Group, Image, Rating, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import { getAverageRating } from "../api/ratings";
import { getReviewsForMovie } from "../api/reviews";
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
        <Group>
          <Rating value={average.average}></Rating>
          <Text color="dimmed">{average.count} ratings</Text>
        </Group>
      ) : (
        <Text>No ratings yet</Text>
      )}

      <Group position="apart" align={"center"}>
        <Title order={2} mt="md">
          Reviews
        </Title>
        <Button
          onClick={() =>
            openModal({
              title: "Leave A Review",
              // children: <NewReviewModal id={id} />,
            })
          }
        >
          Leave A Review
        </Button>
      </Group>
      {reviewsStatus !== "success" && <Text>Loading...</Text>}
      {reviews &&
        reviews.map((review) => <Review review={review} key={review.id} />)}
    </>
  );
};
