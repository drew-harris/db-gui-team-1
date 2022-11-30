import { Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getReviewsForUser } from "../../api/reviews";
import Review from "../../components/reviews/Review";
import { AuthContext } from "../../context/AuthContext";

export const ProfileReviewsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { userId: id }],
    () => getReviewsForUser(id)
  );

  return (
    <div>
      <Title size={25} mb="md">
        {user.username}
        {"'s Reviews"}
      </Title>
      {reviews?.map((review) => (
        <Review review={review} key={review.id} showUser={false} />
      ))}
    </div>
  );
};
