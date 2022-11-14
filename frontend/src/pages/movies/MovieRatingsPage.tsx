import { Box, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { getAllRatingsByMovieId } from "../../api/ratings";
import { RatingChip } from "../../components/ratings/RatingChip";

export const MovieRatingsPage = () => {
  const { id } = useParams();

  const { data: ratings } = useQuery(["ratings", { movieId: id }], () =>
    getAllRatingsByMovieId(id)
  );

  const { data: movie } = useQuery(["movie", { id: id }], () =>
    getMovieById(id)
  );

  if (!movie || !ratings) {
    return null;
  }

  return (
    <div>
      <Title>Ratings For: {movie.title}</Title>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
        })}
      >
        {ratings.map((rating) => {
          return <RatingChip showUser key={rating.id} rating={rating} />;
        })}
      </Box>
    </div>
  );
};
