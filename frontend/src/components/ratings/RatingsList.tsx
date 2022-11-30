import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Stack, Center, Text } from "@mantine/core";
import { RatingChip } from "./RatingChip";

export const RatingsList = ({ ratings }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({});
  return (
    <Stack mt="md" ref={parent}>
      {ratings.length === 0 && (
        <Center mt="sm">
          <Text>No Ratings</Text>
        </Center>
      )}
      {ratings &&
        ratings?.map((rating) => {
          return <RatingChip showUser key={rating.id} rating={rating} />;
        })}
    </Stack>
  );
};
