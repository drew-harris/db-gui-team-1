import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { createNewList } from "../api/lists";
import { AuthContext } from "../context/AuthContext";

export const NewListModal = () => {
  const { user } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const client = useQueryClient();
  const submitListMutation = useMutation({
    mutationFn: createNewList,
    onError: (error) => {
      showNotification({
        message: error["message"] || "There was an error creating the list",
        title: "Error creating list",
        color: "red",
      });
    },
    onSettled: async () => {
      client.invalidateQueries(["user", { id: user.id }]);
      client.invalidateQueries(["lists", { userId: user.id }]);
      closeAllModals();
    },
  });

  const submit = async (values) => {
    submitListMutation.mutate(values.title);
  };

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Stack>
        <TextInput
          label="Title"
          placeholder="Enter list title..."
          {...form.getInputProps("title")}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
