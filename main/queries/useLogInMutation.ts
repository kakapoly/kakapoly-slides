import { logIn } from "@/apis/auth";
import { deckKeys } from "@/queries/key-factories/deck-keys";
import { userKeys } from "@/queries/key-factories/user-keys";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogInMutation() {
  const queryClient = useQueryClient();

  const setToken = useAuthStore((state) => state.setToken);

  return useMutation(logIn, {
    onSuccess: (data) => {
      const { accessToken } = data;
      setToken(accessToken);

      queryClient.invalidateQueries(userKeys.current());
      queryClient.invalidateQueries(deckKeys.list());
    },
  });
}
