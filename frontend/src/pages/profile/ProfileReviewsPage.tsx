import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReviewsForUser } from "../../api/reviews";
import Review from "../../components/reviews/Review";

export const ProfileReviewsPage = () => {
  const { id } = useParams();
  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { userId: id }],
    () => getReviewsForUser(id)
  );

  return (
    <div>
      {reviews?.map((review, key) => (
        <div key={key}>
          {JSON.stringify(review, null, 4)}
          <Review review={review} showUser={false} />
        </div>
      ))}
    </div>
  );
};
