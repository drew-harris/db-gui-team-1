import { Paper, Rating } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { getMyRatingForMovieId, rateMovie } from "../../api/ratings";
import { AuthContext } from "../../context/AuthContext";

export const MovieRatingInput = ({ movieId }: { movieId: string }) => {
  const { user } = useContext(AuthContext);
  const { data: myRating } = useQuery(["my-rating", { movieId }], async () => {
    return getMyRatingForMovieId(movieId, user.id);
  });

  const client = useQueryClient();

  const changeRatingMutation = useMutation({
    mutationFn: rateMovie,
    onMutate: ({ score }) => {
      client.setQueryData(["my-rating", { movieId }], score);
    },
    onSettled: () => {
      client.invalidateQueries(["average-rating", { movieId }]);
      client.invalidateQueries(["movie-ranking", { movieId }]);
    },
  });

  const changeRating = (value) => {
    changeRatingMutation.mutate({ movieId: movieId, score: value });
  };

  return (
    <Paper radius="md" withBorder py="sm" px="md">
      <Rating
        onChange={(value) => changeRating(value)}
        value={myRating || 0}
      ></Rating>
    </Paper>
  );
};
