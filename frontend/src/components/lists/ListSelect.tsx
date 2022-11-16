import { MultiSelect } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getListsByUserId, getMyListsForMovie } from "../../api/lists";
import { AuthContext } from "../../context/AuthContext";

export const ListSelect = ({ movieId }) => {
  const { user } = useContext(AuthContext);
  const { data: myLists } = useQuery(["my-lists"], () =>
    getListsByUserId(user.id)
  );

  const { data: includedListIds } = useQuery(["list-ids", { movieId }], () =>
    getMyListsForMovie({ userId: user.id, movieId })
  );

  const data = myLists
    ? myLists.map((list) => ({ value: list.id, label: list.name }))
    : [];

  console.log(includedListIds);

  const onChange = (event) => {
    console.log(event);
  };

  return (
    <MultiSelect onChange={onChange} placeholder="Select A List" data={data} />
  );
};
