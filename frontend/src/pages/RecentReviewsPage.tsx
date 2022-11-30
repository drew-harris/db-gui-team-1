import { Center, Pagination, Stack, Title } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRecentReviews } from "../api/reviews";
import { RecentReviewCard } from "../components/reviews/RecentReviewCard";

export const RecentReviewsPage = () => {
  const [page, onPageChange] = useState(1);
  const client = useQueryClient();
  const { data: reviews } = useQuery(["recent-reviews", { page: page }], () => {
    return getRecentReviews({ page, limit: 10 });
  });
  const pagination = usePagination({ total: 10, page, onChange: onPageChange });

  useEffect(() => {
    client.prefetchQuery(["recent-reviews", { page: page + 1 }], () =>
      getRecentReviews({ page: page + 1, limit: 10 })
    );
  }, [page]);

  return (
    <>
      <Title>Latest Reviews</Title>

      <Stack py="md">
        {reviews?.map((review) => (
          <RecentReviewCard review={review} key={review.id} />
        ))}
      </Stack>

      <Center>
        <Pagination
          mt="md"
          page={pagination.active}
          onChange={pagination.setPage}
          total={10}
        />
      </Center>
    </>
  );
};
