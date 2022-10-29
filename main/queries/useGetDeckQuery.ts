import { getDeck } from "@/apis/deck";
import { deckKeys } from "@/queries/key-factories/deck-keys";
import { useQuery } from "@tanstack/react-query";

export default function useGetDeckQuery(deckId: string) {
  return useQuery(deckKeys.detail(deckId), () => getDeck(deckId));
}
