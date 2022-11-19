import { Card, Group, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MovieWithCounts } from "../types";

export default function MovieCard({ movie }: { movie: MovieWithCounts }) {
  const navigate = useNavigate();
  return (
    <Card
      withBorder
      radius="md"
      shadow="lg"
      onClick={() => navigate("/movie/" + movie.id)}
    >
      <Card.Section>
        <Image src={movie.backdropImageUrl} height={160}></Image>
      </Card.Section>
      <Text mt="md" weight="bold" lineClamp={1}>
        {movie.title}
      </Text>
      <Text size="xs" lineClamp={3} color="dimmed">
        {movie.description}
      </Text>
      <Group mt="md" position="apart" align="center">
        <Text size="sm" color="dimmed">
          {movie?._count?.reviews} Reviews
        </Text>
        <Text size="sm" color="dimmed">
          {movie?._count?.ratings} Ratings
        </Text>
      </Group>
    </Card>
  );
}
