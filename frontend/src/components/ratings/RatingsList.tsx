import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Stack } from "@mantine/core";
import { RatingChip } from "./RatingChip";

export const RatingsList = ({ ratings }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({});
  return (
    <Stack mt="md" ref={parent}>
      {ratings &&
        ratings?.map((rating) => {
          return <RatingChip showUser key={rating.id} rating={rating} />;
        })}
    </Stack>
  );
};
