import { Center, Pagination, SimpleGrid, Text, Title } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getMovies from "../api/movies";
import MovieCard from "../components/MovieCard";
import "../index.css";

function Home() {
  const [page, onPageChange] = useState(1);
  const pagination = usePagination({ total: 10, page, onChange: onPageChange });
  const client = useQueryClient();
  const {
    data: movies,
    status,
    error,
  } = useQuery(["movies", { page: page }], () => getMovies({ page: page }), {
    retry: false,
  });

  useEffect(() => {
    client.prefetchQuery(["movies", { page: page + 1 }], () =>
      getMovies({ page: page + 1 })
    );
  }, [page]);

  return (
    <>
      <Title mb="md">All Movies</Title>
      {error && error instanceof Error && (
        <Center>
          <Text color="red">{error.message || "Error getting movies"}</Text>
        </Center>
      )}
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
