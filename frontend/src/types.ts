import type { Review } from "@prisma/client";
export type ReviewWithUser = Review & {
  by: {
    id: string;
    username: string;
    profileImageUrl: string;
  };
};
