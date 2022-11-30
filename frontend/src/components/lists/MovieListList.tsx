import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Stack } from "@mantine/core";
import ListLink from "./ListLink";

export const MovieListList = ({ lists }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <Stack ref={parent}>
      {lists.map((list) => (
        <ListLink key={list.id} list={list} />
      ))}
    </Stack>
  );
};
