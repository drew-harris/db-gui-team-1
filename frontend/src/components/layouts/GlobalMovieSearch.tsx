import { Autocomplete } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../api/movies";

// TODO: Debounce this
function GlobalMovieSearch() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const { data: movies } = useQuery(
    ["movies", { title: form.values.search }],
    () => searchMovies(form.values.search)
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
      <Autocomplete
        size="sm"
        placeholder="Search Movies"
        data={transformedMovies}
        onItemSubmit={(item) => {
          navigate("/movie/" + item.id);
          form.setFieldValue("search", "");
        }}
        {...form.getInputProps("search")}
      ></Autocomplete>
    </>
  );
}

export default GlobalMovieSearch;
