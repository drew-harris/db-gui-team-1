import { Group, Select, TextInput } from "@mantine/core";

const genres = [
  "Animation",
  "Action",
  "Science Fiction",
  "Drama",
  "Family",
  "Horror",
  "Thriller",
  "Fantasy",
  "TV Movie",
  "Comedy",
  "Romance",
  "Crime",
  "Adventure",
];

export const MovieFilterBar = ({ filters, setFilters }) => {
  return (
    <Group mb="lg" position="apart">
      <TextInput
        value={filters.title}
        placeholder="Search..."
        onChange={(event) =>
          setFilters({ ...filters, title: event.target.value })
        }
      ></TextInput>
      <Group>
        <Select
          size="sm"
          placeholder="Genre"
          clearable
          data={genres}
          value={filters.genre || null}
          searchable
          onChange={(value) => setFilters({ ...filters, genre: value })}
        />
        <Select
          size="sm"
          placeholder="Sort By"
          data={[
            {
              value: "popularity",
              label: "Popularity",
            },
            {
              value: "reviews",
              label: "Reviews",
            },
            {
              value: "ratings",
              label: "Ratings",
            },
            {
              value: "runtime",
              label: "Run Time",
            },
          ]}
          value={filters.sortBy}
          onChange={(value) => setFilters({ ...filters, sortBy: value })}
        />
      </Group>
    </Group>
  );
};
