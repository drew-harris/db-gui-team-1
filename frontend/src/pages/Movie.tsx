import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Group,
  Image,
  MultiSelect,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, getMovieRanking } from "../api/movies";
import { getAverageRating } from "../api/ratings";
import { getReviewsForMovie } from "../api/reviews";
import { DataSquare } from "../components/DataSquare";
import AuthOnly from "../components/layouts/AuthOnly";
import { MovieRatingInput } from "../components/ratings/MovieRatingInput";
import Review from "../components/reviews/Review";
import { NewReviewModal } from "../modals/NewReviewModal";

export const MoviePage = () => {
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

  const { data: ratingStats } = useQuery(
    ["average-rating", { movieId: id }],
    () => getAverageRating(id)
  );

  const { data: ranking } = useQuery(["movie-ranking", { movieId: id }], () =>
    getMovieRanking(id)
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
              onClick={() => navigate(`/movie/${id}/ratings`)}
              value={ratingStats?.average.toFixed(2)}
            />
            <DataSquare
              onClick={() => navigate(`/movie/${id}/reviews`)}
              label="Reviews"
              value={reviews?.length}
            />
            <DataSquare label="Rank" value={"#" + ranking} />
          </Group>
          <Space h="md"></Space>
          <AuthOnly>
            <Group>
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
              <MovieRatingInput movieId={id} />
              <MultiSelect
                placeholder="Add To List..."
                icon={<FontAwesomeIcon icon={faList} />}
                data={[]}
              ></MultiSelect>
            </Group>
          </AuthOnly>
        </Box>
      </Group>

      <Title order={2} mt="md">
        Reviews
      </Title>
      {reviewsStatus !== "success" && <Text>Loading...</Text>}
      {reviews &&
        reviews.map((review) => <Review review={review} key={review.id} />)}
    </>
  );
};
