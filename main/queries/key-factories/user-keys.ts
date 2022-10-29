export const userKeys = {
  all: ["users"] as const,
  // lists: () => [...userKeys.all, "list"] as const,
  // list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  _details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys._details(), id] as const,
  current: () => [...userKeys.detail("current")] as const,
};
