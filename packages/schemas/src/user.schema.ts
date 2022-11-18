import { object, string } from "zod";

export const createUserSchema = object({
  username: string({
    required_error: "Username is required",
  }),
  password: string({
    required_error: "Password is required",
  }).min(8, "Password too short - should be 8 characters minimum"),
  passwordConfirmation: string({
    required_error: "Confirm Password is required",
  }),
  email: string({
    required_error: "Email is required",
  }).email("Not a valid email"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});
export const editPfpSchema = object({
  profileImageUrl: string({
    required_error: "profileImageUrl is required",
  }),
});
export const editBioSchema = object({
  bio: string({
    required_error: "bio is required",
  }),
});
