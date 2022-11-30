import { Autocomplete, MediaQuery, Spoiler } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../api/movies";

function GlobalMovieSearch() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);

  const { data: movies } = useQuery(
    ["movies", { title: debouncedSearch }],
    () => searchMovies(debouncedSearch),
    {
      refetchOnWindowFocus: false,
    }
  );

  const transformedMovies =
    movies && form.values.search
      ? movies.map((movie) => {
          return {
            value: movie.title || "Title",
            ...movie,
          };
        })
      : [];

  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Autocomplete
          size="sm"
          placeholder="Search flicks"
          data={transformedMovies}
          onItemSubmit={(item) => {
            navigate("/movie/" + item.id);
            form.setFieldValue("search", "");
          }}
          {...form.getInputProps("search")}
        ></Autocomplete>
      </MediaQuery>
    </>
  );
}

export default GlobalMovieSearch;
