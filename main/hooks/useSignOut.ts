import { userKeys } from "@/queries/key-factories/user-keys";
import { useAuthStore } from "@/stores/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function useSignOut() {
  const queryClient = useQueryClient();

  const setToken = useAuthStore((state) => state.setToken);

  const signOut = () => {
    setToken(null);

    queryClient.invalidateQueries(userKeys.current());
  };

  return signOut;
}
