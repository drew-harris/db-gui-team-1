import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Stack } from "@mantine/core";
import Review from "./Review";

export const ReviewList = ({ reviews }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({});
  return (
    <Stack ref={parent}>
      {reviews &&
        reviews?.map((review) => <Review review={review} key={review.id} />)}
    </Stack>
  );
};
