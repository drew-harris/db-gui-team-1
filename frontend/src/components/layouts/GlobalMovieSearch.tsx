import { Autocomplete, Avatar, Group } from "@mantine/core";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { forwardRef } from "react";
import { searchMovies } from "../../api/movies";
import { Link } from "react-router-dom";

function GloablMovieSearch() {
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const {
    data: movies,
    status,
    error,
  } = useQuery(["movies", { title: form.values.search }], () =>
    searchMovies(form.values.search)
  );

  const transformedMovies = movies
    ? movies.map((movie) => {
        return {
          value: movie.title || "Title",
          ...movie,
        };
      })
    : [];

  return (
    <>
      <Autocomplete
        size="sm"
        placeholder="Search Movies"
        itemComponent={AutoCompleteItem}
        data={transformedMovies}
        {...form.getInputProps("search")}
      ></Autocomplete>
    </>
  );
}

const AutoCompleteItem = ({ ref, value, description, id }) => (
  <Link to={"/movie/" + id}>
    <Group p="xs" noWrap sx={{ overflow: "hidden" }}>
      <Text size="sm">{value}</Text>
    </Group>
  </Link>
);

export default GloablMovieSearch;
