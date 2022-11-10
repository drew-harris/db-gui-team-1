import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveReview } from "../api/reviews";

interface NewReviewModalProps {
  movieId: string;
}

export const NewReviewModal = ({ movieId }: NewReviewModalProps) => {
  const form = useForm({
    initialValues: {
      content: "",
    },
  });
  const client = useQueryClient();

  //TODO: Maybe move to separate file
  const newReviewMutation = useMutation({
    mutationFn: leaveReview,
    onSuccess: async () => {
      client.invalidateQueries(["reviews", { movieId }]);
      closeAllModals();
    },
  });

  const submit = () => {
    newReviewMutation.mutate({ content: form.values.content, movieId });
  };

  return (
    <>
      <Textarea minRows={6} {...form.getInputProps("content")}></Textarea>
      <Button onClick={submit} mt="md">
        Submit
      </Button>
    </>
  );
};
