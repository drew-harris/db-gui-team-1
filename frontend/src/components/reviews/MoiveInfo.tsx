import { Box, Group, Image, Space, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovieById, getMovieRanking } from "../../api/movies";
import { getAverageRating } from "../../api/ratings";
import { DataSquare } from "../DataSquare";

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

  return (
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
  );
};

export default MovieInfo;

//MovieInfo needs to be edited...
//not sure what all we want to display and the sizing but thats easy to change
