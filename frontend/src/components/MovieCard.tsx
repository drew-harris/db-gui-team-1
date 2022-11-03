import { Card, Group, Image, Rating, Text } from "@mantine/core";
import { Movie } from "@prisma/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function randomRatingNumber() {
  return Math.round(Math.random() * 5);
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [randomRating] = useState(randomRatingNumber());
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate("/movie/" + movie.id)}>
      <Card.Section>
        <Image src={movie.backdropImageUrl} height={160}></Image>
      </Card.Section>
      <Group mt="md" position="apart">
        <Text weight="bold" lineClamp={1}>
          {movie.title}
        </Text>
      </Group>
      <Text size="xs" lineClamp={3} color="dimmed">
        {movie.description}
      </Text>
      <Group mt="md" position="apart" align="center">
        <Rating value={randomRating} color="yellow" />
        <Text size="sm" color="dimmed">
          {randomRating * 3} Reviews
        </Text>
      </Group>
    </Card>
  );
}
