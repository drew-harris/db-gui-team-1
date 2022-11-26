import { Center, Pagination, SimpleGrid, Text, Title } from "@mantine/core";
import { useDebouncedValue, usePagination } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getMovies from "../api/movies";
import AuthOnly from "../components/layouts/AuthOnly";
import { MovieFilterBar } from "../components/layouts/MovieFilterBar";
import MovieCard from "../components/MovieCard";
import "../index.css";

function Home() {
  const [page, onPageChange] = useState(1);
  const [filters, setFilters] = useState({
    sortBy: "popularity",
    title: "",
    genre: null,
  });

  const [debouncedFilters] = useDebouncedValue(filters, 200);
  const pagination = usePagination({ total: 10, page, onChange: onPageChange });
  const client = useQueryClient();
  const { data: movies, error } = useQuery(
    ["movies", { page: page, ...debouncedFilters }],
    () => getMovies({ filters: { page: page, ...debouncedFilters } }),
    {
      retry: false,
    }
  );

  useEffect(() => {
    client.prefetchQuery(
      ["movies", { page: page + 1, ...debouncedFilters }],
      () => getMovies({ filters: { page: page + 1, ...debouncedFilters } })
    );
  }, [page]);

  useEffect(() => {
    pagination.setPage(1);
  }, [filters]);

  return (
    <>
      <Title mb="md">All Movies</Title>
      {error && error instanceof Error && (
        <Center>
          <Text color="red">{error.message || "Error getting movies"}</Text>
        </Center>
      )}
      <AuthOnly>
        <MovieFilterBar filters={filters} setFilters={setFilters} />
      </AuthOnly>
      <SimpleGrid breakpoints={[
        { maxWidth: 4000, cols: 6, spacing: 'md' },
        { maxWidth: 2000, cols: 5, spacing: 'md' },
        { maxWidth: 1500, cols: 4, spacing: 'md' },
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>
        {movies &&
          movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
      </SimpleGrid>
      <Center>
        <Pagination
          mt="md"
          page={pagination.active}
          onChange={pagination.setPage}
          total={10}
        />
      </Center>
    </>
  );
}

export default Home;
