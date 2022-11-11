import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import RichTextEditor from "@mantine/rte";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { leaveReview } from "../api/reviews";

interface NewReviewModalProps {
  movieId: string;
}

export const NewReviewModal = ({ movieId }: NewReviewModalProps) => {
  const [content, setContent] = useState("");
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
    newReviewMutation.mutate({ content: content, movieId });
  };

  return (
    <>
      <RichTextEditor
        value={content}
        controls={[
          ["bold", "italic", "underline", "link", "image"],
          ["unorderedList", "h1", "h2", "h3"],
          ["alignLeft", "alignCenter", "alignRight"],
        ]}
        onChange={setContent}
        styles={{ root: { fontSize: "52" } }}
      ></RichTextEditor>
      <Button onClick={submit} mt="md">
        Submit
      </Button>
    </>
  );
};
