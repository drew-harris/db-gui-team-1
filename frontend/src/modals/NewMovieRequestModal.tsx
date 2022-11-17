import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewMovieRequest } from "../api/movieRequests";

export const NewMovieRequestModal = () => {
  const form = useForm({
    initialValues: {
      title: "",
      message: "",
    },
  });

  const client = useQueryClient();

  const submitListMutation = useMutation({
    mutationFn: createNewMovieRequest,
    onError: (error) => {
      showNotification({
        message: error["message"] || "There was an error creating the list",
        title: "Error creating list",
        color: "red",
      });
    },
    onSettled: async () => {
      client.invalidateQueries(["movie-requests"]);
      closeAllModals();
    },
  });

  const submit = async (values) => {
    submitListMutation.mutate({ message: values.message, title: values.title });
  };

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Stack>
        <TextInput
          label="Title"
          placeholder="Enter movie title..."
          {...form.getInputProps("title")}
        />
        <Textarea
          {...form.getInputProps("message")}
          placeholder="Additional message..."
        ></Textarea>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
