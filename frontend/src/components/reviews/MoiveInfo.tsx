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

  if (!movie) {
    return null;
  }

  return (
    <Group mb="lg" spacing={20} noWrap align="start">
      <Image
        radius="md"
        width={200}
        src={movie.backdropImageUrl}
        onClick={() => navigate("/movie/" + movie.id)}
      ></Image>

      <Title px="md" size={30}>
        {movie.title}
      </Title>
    </Group>
  );
};

export default MovieInfo;
