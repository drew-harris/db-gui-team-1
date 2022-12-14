import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/userInfo";

export const useUsername = (userId) => {
  const { data: userInfo } = useQuery(["user", { userId }], () =>
    getUserInfo(userId)
  );

  return userInfo?.user?.username || "";
};
