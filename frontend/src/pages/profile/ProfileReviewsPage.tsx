import { Center, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getReviewsForUser } from "../../api/reviews";
import Review from "../../components/reviews/Review";
import { AuthContext } from "../../context/AuthContext";
import { useUsername } from "../../hooks/useUsername";

export const ProfileReviewsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const username = useUsername(id);

  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { userId: id }],
    () => getReviewsForUser(id)
  );

  return (
    <div>
      {id === user?.id ? "Your Reviews" : username + "'s Reviews"}
      {reviews?.length === 0 && <Center>This user has no reviews.</Center>}
      {reviews?.map((review) => (
        <Review review={review} key={review.id} showUser={false} />
      ))}
    </div>
  );
};
