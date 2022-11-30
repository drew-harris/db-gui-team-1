import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Center, Stack, Text } from "@mantine/core";
import Review from "./Review";

export const ReviewList = ({ reviews }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({});
  return (
    <Stack ref={parent}>
      {reviews.length === 0 && (
        <Center mt="lg">
          <Text>No Reviews</Text>
        </Center>
      )}
      {reviews &&
        reviews?.map((review) => <Review review={review} key={review.id} />)}
    </Stack>
  );
};
