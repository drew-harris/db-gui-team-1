import { Card, Group, Image, Rating, Text } from "@mantine/core";
import { Movie } from "@prisma/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MovieWithCounts } from "../types";

function randomRatingNumber() {
  return Math.round(Math.random() * 5);
}

export default function MovieCard({ movie }: { movie: MovieWithCounts }) {
  const [randomRating] = useState(randomRatingNumber());
  const navigate = useNavigate();
  console.log(movie);
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
        <Text size="sm" color="dimmed">
          {movie._count.reviews} Reviews
        </Text>
      </Group>
    </Card>
  );
}
