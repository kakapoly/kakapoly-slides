import { Deck, updateDeck, UpdateDeckVariables } from "@/apis/deck";
import { deckKeys } from "@/queries/key-factories/deck-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { merge } from "lodash-es";

export default function useUpdateDeckMutation(id: string) {
  const queryClient = useQueryClient();

  const key = deckKeys.detail(id);

  return useMutation(
    (variables: UpdateDeckVariables) => updateDeck(id, variables),
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries(key);

        const previousDeck = queryClient.getQueryData<Deck>(key);

        if (!previousDeck) {
          return;
        }

        queryClient.setQueryData<Deck>(key, merge(previousDeck, variables));

        return {
          previousDeck,
        };
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (
        error: AxiosError<{ message: string; statusCode: number }>,
        variables,
        context
      ) => {
        if (context?.previousDeck) {
          queryClient.setQueryData<Deck>(key, context.previousDeck);
        }
      },
    }
  );
}
