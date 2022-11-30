import { Group, Paper, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MovieCard from "../MovieCard";

export const ListLink = ({ list, showUserName = false }) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);

  const [showMovies, setShowMovies] = useState(false);
  const themeHover =
    theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.dark[0];

  return (
    <>
      <Paper
        sx={(theme) => ({
          backgroundColor: hovered ? themeHover : undefined,
          cursor: "pointer",
        })}
        p="sm"
        ref={ref}
        onClick={() => setShowMovies(!showMovies)}
      >
        <Group position="apart">
          <Text weight="bold">{list.name}</Text>

          <Text>{list._count.movies} Movies</Text>
        </Group>
      </Paper>
      {showMovies && (
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
          {list.movies?.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default ListLink;
