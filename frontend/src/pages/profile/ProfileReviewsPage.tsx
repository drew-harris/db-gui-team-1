import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getReviewsForUser } from "../../api/reviews";
import { getUserInfo } from "../../api/userInfo";
import Review from "../../components/reviews/Review";
import { AuthContext } from "../../context/AuthContext";

export const ProfileReviewsPage = () => {
 const { id } = useParams();
 const { data: reviews, status: reviewsStatus } = useQuery(
  ["reviews", { userId: id }],
  () => getReviewsForUser(id)
);


  console.log(reviews);
  return (
    <div>
      {reviews?.map((review, key) => <div key={key}><Review review={review} showUser={false}/></div>)}
    </div>
  );
};

//review.content has <p></p> included in it
//i will change up review so that if showUser is false, it will disable the image url and other info about the movie
//from here it will be easy to use the same logic for the rating and lists pages