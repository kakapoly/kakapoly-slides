import { listDecks } from "@/apis/deck";
import { deckKeys } from "@/queries/key-factories/deck-keys";
import { useQuery } from "@tanstack/react-query";

export default function useListDeckQuery() {
  return useQuery(deckKeys.list(), listDecks);
}
