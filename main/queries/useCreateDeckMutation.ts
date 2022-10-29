import { createDeck } from "@/apis/deck";
import { deckKeys } from "@/queries/key-factories/deck-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreateDeckMutation() {
  const queryClient = useQueryClient();

  return useMutation(createDeck, {
    onSuccess: (data) => {
      queryClient.setQueryData(deckKeys.detail(data.id), data);
      queryClient.invalidateQueries(deckKeys.list());
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      window.alert(error?.response?.data.message);
    },
  });
}
