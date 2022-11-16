import { Center, Pagination, SimpleGrid, Text, Title } from "@mantine/core";
import { useDebouncedValue, usePagination } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovies from "../api/movies";
import AuthOnly from "../components/layouts/AuthOnly";
import { MovieFilterBar } from "../components/layouts/MovieFilterBar";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
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
      <SimpleGrid cols={4}>
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
