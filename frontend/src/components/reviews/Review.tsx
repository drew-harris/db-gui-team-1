import {
  Avatar,
  Box,
  Button,
  Group,
  Image,
  MultiSelect,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getMovieById, getMovieRanking } from "../../api/movies";
import { getAverageRating } from "../../api/ratings";
import { getReviewsForMovie } from "../../api/reviews";
import { ReviewWithUser } from "../../types";
import { DataSquare } from "../DataSquare";

const Review = ({
  review,
  showUser = true,
}: {
  review: ReviewWithUser;
  showUser?: boolean;
}) => {
  return (
    <Paper radius="md" withBorder p="md" m="md">
      {showUser ? (
        <Group mb="sm" position="apart" align="center">
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
          <Text size="sm">
            {new Date(review.submittedAt).toLocaleString("en-US")}
          </Text>
        </Group>
      ) : (
        <div><MovieInfo id={review.movieId}/></div>
      )}
      <RichTextEditor readOnly value={review.content} />
    </Paper>
  );
};

const MovieInfo = ({ id }) => {
  const navigate = useNavigate();

  const { data: movie } = useQuery(
    ["movie", { id }],
    () => getMovieById(id),
    {}
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

  return <Group mb="lg" spacing={40} noWrap align="start">
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
      <DataSquare label="Rank" value={"#" + ranking} />
    </Group>
    <Space h="md"></Space>
  </Box>
</Group>
}

export default Review;
