import type { Movie, Review } from "@prisma/client";
export type ReviewWithUser = Review & {
  by: {
    id: string;
    username: string;
    profileImageUrl: string;
  };
};

export type MovieWithCounts = Movie & {
  _count: {
    reviews: number;
    ratings: number;
    inLists: number;
  };
};
