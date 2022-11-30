import { Card, Rating, Text, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const RatingCard = ({ rating }) => {
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      radius="md"
      shadow="lg"
      onClick={() => navigate("/movie/" + rating.movieId)}
    >
      <Card.Section>
        <Image src={rating.for.backdropImageUrl} height={160}></Image>
      </Card.Section>
      <Text mt="md" weight="bold" lineClamp={1}>
        {rating.for.title}
      </Text>
      <Rating value={rating.score} readOnly></Rating>
    </Card>
  );
};
