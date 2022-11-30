import {
  Card,
  Group,
  Image,
  Rating,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRatingsByUserId } from "../../api/ratings";
import { RatingCard } from "../../components/ratings/RatingCard";
import { RatingChip } from "../../components/ratings/RatingChip";
import { AuthContext } from "../../context/AuthContext";

export const ProfileRatingsPage = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const { data: ratings } = useQuery(["ratings", { userId: id }], () =>
    getAllRatingsByUserId(id)
  );

  if (!ratings) {
    return <div>not found</div>;
  }

  return (
    <>
      <Title size={25} mb="md">
        {user.username}
        {"'s Ratings"}
      </Title>
      <SimpleGrid
        breakpoints={[
          { maxWidth: 4000, cols: 6, spacing: "md" },
          { maxWidth: 2000, cols: 5, spacing: "md" },
          { maxWidth: 1500, cols: 4, spacing: "md" },
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {ratings.map((rating) => {
          return <RatingCard key={rating.id} rating={rating} />;
        })}
      </SimpleGrid>
    </>
  );
};
