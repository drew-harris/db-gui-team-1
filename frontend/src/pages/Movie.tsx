import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Group,
  Image,
  Space,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, getMovieRanking } from "../api/movies";
import { getAllRatingsByMovieId, getAverageRating } from "../api/ratings";
import { getReviewsForMovie } from "../api/reviews";
import { DataSquare } from "../components/DataSquare";
import AuthOnly from "../components/layouts/AuthOnly";
import { ListSelect } from "../components/lists/ListSelect";
import { PageLoader } from "../components/PageLoader";
import { MovieRatingInput } from "../components/ratings/MovieRatingInput";
import { RatingsList } from "../components/ratings/RatingsList";
import { ReviewList } from "../components/reviews/ReviewList";
import { NewReviewModal } from "../modals/NewReviewModal";

export const MoviePage = () => {
  const { id } = useParams();
  // TODO: Netflix effect when in mobile view!
  const isMobile = useMediaQuery("(max-width: 900px)", false);

  const navigate = useNavigate();

  const { data: movie } = useQuery(["movie", { id }], () => getMovieById(id));

  const { data: ratings, status: ratingsStatus } = useQuery(
    ["ratings", { movieId: id }],
    () => getAllRatingsByMovieId(id)
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

  if (!movie || !ratingStats || !reviews) {
    return <PageLoader></PageLoader>;
  }

  const releaseDate = new Date(movie.releaseDate);

  return (
    <>
      <Group mb="lg" spacing={40} noWrap align="start">
        {!isMobile && (
          <Box
            sx={(theme) => ({
              boxShadow: theme.shadows.xl,
              maxWidth: 200,
            })}
          >
            <Image radius="md" src={movie.posterImageUrl}></Image>
          </Box>
        )}
        <Box style={{ flexShrink: 1 }}>
          <Title size={40}>{movie.title}</Title>
          <Text mb="md">{movie.description}</Text>
          <Space />
          <Group position={isMobile ? "center" : "left"}>
            <DataSquare label="Genre" value={movie.genre} />
            <DataSquare label="Runtime" value={movie.runTime + " mins."} />
            <DataSquare label="Released" value={releaseDate.getFullYear()} />
            <DataSquare
              label="Rating"
              onClick={() => navigate(`/movie/${id}/ratings`)}
              value={
                ratingStats?.count > 0
                  ? ratingStats?.average?.toFixed(2)
                  : "No Ratings"
              }
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
            <Group position={isMobile ? "center" : undefined}>
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
              <ListSelect movieId={id} />
            </Group>
          </AuthOnly>
        </Box>
      </Group>

      <Tabs variant="outline" defaultValue="Reviews">
        <Tabs.List>
          <Tabs.Tab value="Reviews">Reviews</Tabs.Tab>
          <Tabs.Tab value="Ratings">Ratings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Reviews">
          {reviewsStatus !== "success" && <Text>Loading...</Text>}
          {reviews && <ReviewList reviews={reviews} />}
        </Tabs.Panel>

        <Tabs.Panel value="Ratings">
          {ratingsStatus !== "success" && <Text>Loading...</Text>}
          {ratings && <RatingsList ratings={ratings} />}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
