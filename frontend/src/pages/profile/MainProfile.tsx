import { Button, Group, Tabs, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviewsForUser } from "../../api/reviews";
import { getUserInfo } from "../../api/userInfo";
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

  if (!userInfo || isLoading || error) {
    return null;
  }

  const isCurrentUser = user?.id === userInfo?.user?.id;

  return (
    <>
      <Group align="center" position="apart">
        <Title size={50}>{userInfo.user.username + "'s Profile"}</Title>
        {isCurrentUser && (
          <Button component={Link} to="/profile/edit">
            Profile Settings
          </Button>
        )}
      </Group>
      <Text mb="xl" mt="sm" size={22}>
        {"Email: "}
        {userInfo.user.email}
      </Text>
      <Text mb="xl">
        {"Member since "}
        {new Date(userInfo.user.createdAt).toLocaleString("en-US")}
      </Text>

      <Tabs variant="outline" defaultValue="Reviews">
        <Tabs.List>
          <Tabs.Tab value="Reviews">Reviews</Tabs.Tab>
          <Tabs.Tab value="Ratings">Ratings</Tabs.Tab>
          <Tabs.Tab value="MovieLists">Movie Lists</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Reviews">
          {reviews?.map((review, key) => (
            <div key={key}>
              <Review review={review} showUser={false} />
            </div>
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="Ratings">Ratings</Tabs.Panel>
        <Tabs.Panel value="MovieLists">Movie Lists</Tabs.Panel>
      </Tabs>
    </>
  );
}

export default MainProfilePage;
