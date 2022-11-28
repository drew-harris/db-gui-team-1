import { Card, Group, SimpleGrid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { getAllRatingsByUserId } from "../../api/ratings";
import { RatingChip } from "../../components/ratings/RatingChip";

export const ProfileRatingsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: ratings } = useQuery(["ratings", { userId: id }], () =>
    getAllRatingsByUserId(id)
  );

  if (!ratings) {
    return <div>not found</div>;
  }

  return (
    <SimpleGrid
      breakpoints={[
        { maxWidth: 4000, cols: 6, spacing: "md" },
        { maxWidth: 2000, cols: 5, spacing: "md" },
        { maxWidth: 1500, cols: 4, spacing: "md" },
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {ratings.map((rating, key) => {
        return (
          <Card
            key={key}
            withBorder
            radius="md"
            shadow="lg"
            onClick={() => navigate("/movie/" + rating.movieId)}
          >
            <Group>
              <Text>{rating.for.title}</Text>
              <RatingChip rating={rating} showUser={false} />
            </Group>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
