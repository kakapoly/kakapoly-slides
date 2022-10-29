import { getCurrentUser } from "@/apis/user";
import { userKeys } from "@/queries/key-factories/user-keys";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUserQuery() {
  return useQuery(userKeys.current(), getCurrentUser);
}
