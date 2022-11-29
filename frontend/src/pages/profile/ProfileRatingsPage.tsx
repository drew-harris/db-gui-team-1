import { Card, Group, Image, Rating, SimpleGrid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
      {ratings.map((rating) => {
        return (
          <Card withBorder radius="md" key={rating.id} shadow="lg">
            <Card.Section>
              <Image src={rating.for.backdropImageUrl} height={160}></Image>
            </Card.Section>
            <Text mt="md" weight="bold" lineClamp={1}>
              {rating.for.title}
            </Text>
            <Rating value={rating.score}></Rating>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
