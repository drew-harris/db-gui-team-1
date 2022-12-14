import { useAutoAnimate } from "@formkit/auto-animate/react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { getMyMovieRequests } from "../api/movieRequests";
import { NewMovieRequestModal } from "../modals/NewMovieRequestModal";

export const MovieRequestPage = () => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const { data, error } = useQuery(
    ["movie-requests"],
    () => getMyMovieRequests(),
    {
      retry: false,
    }
  );
  return (
    <div>
      <Group position="apart">
        <Title>Your Movie Requests</Title>
        <Button
          onClick={() => {
            openModal({
              title: "New Movie Request",
              children: <NewMovieRequestModal />,
            });
          }}
        >
          New Request
        </Button>
      </Group>
      <Stack ref={parent} m="sm">
        {data?.length === 0 && <Center>No Movie Requests</Center>}
        {error && (
          <Text color="red" weight="bold" size="lg" align="center">
            There was an error getting your movie requests.
          </Text>
        )}
        {data?.map((request) => {
          return (
            <MovieRequest request={request} key={request.id}></MovieRequest>
          );
        })}
      </Stack>
    </div>
  );
};

const MovieRequest = ({ request }) => {
  return (
    <Paper p="md" shadow="md">
      <Group position="apart">
        <Group spacing="xl">
          <Text>{request.title}</Text>
          <Text color="dimmed">{request.message}</Text>
        </Group>
        <Tooltip label={request.approved ? "Approved" : "Not Approved"}>
          <Box
            sx={(theme) => ({
              color: request.approved
                ? theme.colors.green[5]
                : theme.colors.red[5],
            })}
          >
            <FontAwesomeIcon
              size="lg"
              icon={request.approved ? faCheck : faXmark}
            />
          </Box>
        </Tooltip>
      </Group>
    </Paper>
  );
};
