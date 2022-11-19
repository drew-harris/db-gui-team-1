import { Box, Group, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllRatingsByUserId } from "../../api/ratings";
import { RatingChip } from "../../components/ratings/RatingChip";
import MovieInfo from "../../components/reviews/MoiveInfo";

export const ProfileRatingsPage = () => {
  const { id } = useParams();

  const { data: ratings } = useQuery(["ratings", { userId: id }], () =>
    getAllRatingsByUserId(id)
  );

  if (!ratings) {
    return <div>not found</div>;
  }

  return (
    <div>
      {ratings.map((rating, key) => {
        return (
          <Paper key={key} p="md" m="md">
            <MovieInfo id={rating.movieId} />

            <RatingChip rating={rating} showUser={false} />
          </Paper>
        );
      })}
    </div>
  );
};

//need to figure out what we want it to look like...
//also MovieInfo needs editing but not sure what we want there either
