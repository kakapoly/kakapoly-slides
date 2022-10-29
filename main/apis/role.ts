export interface Role {
  id: string;
  deckId: string;
  userId: string;
  type: "owner" | "editor" | "viewer";
}
