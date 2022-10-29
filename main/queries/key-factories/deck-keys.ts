export const deckKeys = {
  all: ["decks"] as const,
  _lists: () => [...deckKeys.all, "list"] as const,
  list: (filters?: string) =>
    [...deckKeys._lists(), ...(filters ? [{ filters }] : [])] as const,
  _details: () => [...deckKeys.all, "detail"] as const,
  detail: (id: string) => [...deckKeys._details(), id] as const,
};
