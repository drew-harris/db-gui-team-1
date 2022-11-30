import {
  Avatar,
  Button,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getListsByUserId } from "../../api/lists";
import { getAllRatingsByUserId } from "../../api/ratings";
import { getReviewsForUser } from "../../api/reviews";
import { getUserInfo } from "../../api/userInfo";
import { ListLink } from "../../components/lists/ListLink";
import { RatingCard } from "../../components/ratings/RatingCard";
import Review from "../../components/reviews/Review";
import { AuthContext } from "../../context/AuthContext";

// Main account page
function MainProfilePage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery(["user", { id }], () => getUserInfo(id));

  const { data: reviews, status: reviewsStatus } = useQuery(
    ["reviews", { userId: id }],
    () => getReviewsForUser(id)
  );
  const { data: ratings, status: ratingsStatus } = useQuery(
    ["ratings", { userId: id }],
    () => getAllRatingsByUserId(id)
  );

  const { data: lists } = useQuery(["lists", { userId: id }], () =>
    getListsByUserId(id)
  );

  if (!userInfo || isLoading || error) {
    return null;
  }

  const isCurrentUser = user?.id === userInfo?.user?.id;

  return (
    <>
      <Group align="center" position="apart">
        <Group>
          <Avatar radius="xl" size="xl" src={userInfo.user.profileImageUrl} />
          <Stack spacing={0}>
            <Title size={50}>
              {userInfo.user.id === user?.id
                ? "Your Profile"
                : userInfo.user.username + "'s Profile"}
            </Title>
            <Text>
              {"Member Since "}
              {new Date(userInfo.user.createdAt).toDateString()}
            </Text>
          </Stack>
        </Group>
        {isCurrentUser && (
          <Button component={Link} to="/profile/edit">
            Profile Settings
          </Button>
        )}
      </Group>
      <Text m="xl">{userInfo.user.bio}</Text>

      {/* TODO: Add icons to tabs */}
      <Tabs variant="outline" defaultValue="Reviews">
        <Tabs.List>
          <Tabs.Tab value="Reviews">Reviews</Tabs.Tab>
          <Tabs.Tab value="Ratings">Ratings</Tabs.Tab>
          <Tabs.Tab value="MovieLists">Lists</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Reviews">
          {reviews?.length === 0 && (
            <Center mt="xl">This user has no reviews</Center>
          )}
          {reviews?.map((review, key) => (
            <div key={key}>
              <Review review={review} showUser={false} />
            </div>
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="Ratings">
          {ratings?.length === 0 && (
            <Center mt="xl">This user has no ratings</Center>
          )}
          <SimpleGrid
            m="md"
            breakpoints={[
              { maxWidth: 4000, cols: 6, spacing: "md" },
              { maxWidth: 2000, cols: 5, spacing: "md" },
              { maxWidth: 1500, cols: 4, spacing: "md" },
              { maxWidth: 980, cols: 3, spacing: "md" },
              { maxWidth: 755, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {ratings?.map((rating) => {
              return <RatingCard key={rating.id} rating={rating} />;
            })}
          </SimpleGrid>
        </Tabs.Panel>
        <Tabs.Panel value="MovieLists">
          {lists?.length === 0 && (
            <Center mt="xl">This user has no lists.</Center>
          )}
          <Stack mt="md">
            {lists?.map((list) => (
              <ListLink key={list.id} list={list} />
            ))}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default MainProfilePage;
