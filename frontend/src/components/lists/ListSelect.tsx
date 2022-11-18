import { MultiSelect } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import {
  getListsByUserId,
  getMyListsForMovie,
  setListsForMovie,
} from "../../api/lists";
import { AuthContext } from "../../context/AuthContext";

export const ListSelect = ({ movieId }) => {
  const { user } = useContext(AuthContext);
  const { data: myLists } = useQuery(["my-lists"], () =>
    getListsByUserId(user.id)
  );
  const client = useQueryClient();

  const { data: includedListIds, refetch } = useQuery(
    ["list-ids", { movieId }],
    () => getMyListsForMovie({ userId: user.id, movieId })
  );

  const data = myLists
    ? myLists.map((list) => ({ value: list.id, label: list.name }))
    : [];

  const setListsMutation = useMutation({
    mutationFn: setListsForMovie,
    onMutate: ({ listIds }) => {
     
      client.setQueryData(["list-ids", { movieId }], listIds);
    },
    onSettled: () => refetch(),
  });

  const onChange = (event) => {
    try {
      setListsMutation.mutate({ listIds: event, movieId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MultiSelect
      onChange={onChange}
      value={includedListIds || []}
      placeholder="Select A List"
      data={data}
    />
  );
};
